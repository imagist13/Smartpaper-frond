#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
SmartPaper API 服务

提供REST API和WebSocket接口，用于前端与SmartPaper核心功能的交互
"""

import os
import uuid
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import asyncio
import json
from loguru import logger
import uvicorn

# 导入SmartPaper核心功能
from src.core.smart_paper_core import SmartPaper
from src.core.prompt_manager import list_prompts

# 创建FastAPI应用
app = FastAPI(
    title="SmartPaper API",
    description="智能论文分析系统API",
    version="0.1.0",
)

# 添加CORS中间件，允许前端跨域访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中应该限制为特定域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 数据模型
class AnalysisRequest(BaseModel):
    """论文分析请求"""
    url: str
    prompt_name: str = "yuanbao"  # 默认使用yuanbao提示词模板

class ListPromptResponse(BaseModel):
    """提示词模板列表响应"""
    prompts: Dict[str, str]

class AnalysisResponse(BaseModel):
    """论文分析响应"""
    result: str
    file_path: str
    prompt_name: str

# 连接管理器
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket

    def disconnect(self, client_id: str):
        if client_id in self.active_connections:
            del self.active_connections[client_id]

    async def send_message(self, message: str, client_id: str):
        if client_id in self.active_connections:
            await self.active_connections[client_id].send_text(message)

manager = ConnectionManager()

# API路由
@app.get("/")
def read_root():
    """API根路径"""
    return {"message": "欢迎使用SmartPaper API"}

@app.get("/prompts", response_model=ListPromptResponse)
def get_prompts():
    """获取所有提示词模板"""
    prompts = list_prompts()
    return {"prompts": prompts}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_paper(request: AnalysisRequest, background_tasks: BackgroundTasks):
    """分析论文 - 同步接口"""
    try:
        # 初始化SmartPaper
        reader = SmartPaper(output_format="markdown")
        
        # 处理论文
        result = reader.process_paper_url(
            url=request.url, 
            prompt_name=request.prompt_name
        )
        
        # 返回结果
        return {
            "result": result["content"],
            "file_path": result.get("file_path", ""),
            "prompt_name": request.prompt_name
        }
    except Exception as e:
        logger.error(f"论文分析失败: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# WebSocket路由 - 用于流式响应
@app.websocket("/ws/analyze/{client_id}")
async def websocket_analyze(websocket: WebSocket, client_id: str):
    """WebSocket接口 - 用于流式分析论文"""
    await manager.connect(websocket, client_id)
    try:
        # 等待客户端发送请求数据
        data = await websocket.receive_text()
        request = json.loads(data)
        
        # 验证请求数据
        if not request.get("url"):
            await websocket.send_json({"error": "缺少URL参数"})
            await websocket.close()
            return
            
        # 初始化SmartPaper
        reader = SmartPaper(output_format="markdown")
        
        # 流式处理论文
        prompt_name = request.get("prompt_name", "yuanbao")
        url = request.get("url")
        
        # 创建输出目录
        output_dir = "outputs"
        os.makedirs(output_dir, exist_ok=True)
        
        # 生成输出文件路径
        output_file = os.path.join(
            output_dir, 
            f'analysis_{client_id}_{url.split("/")[-1]}_prompt_{prompt_name}.md'
        )
        
        # 以写入模式打开文件，并发送流式结果
        with open(output_file, "w", encoding="utf-8") as f:
            full_content = ""
            async for chunk in reader.process_paper_url_stream_async(url, prompt_name=prompt_name):
                full_content += chunk
                f.write(chunk)
                # 发送到WebSocket
                await websocket.send_json({
                    "type": "chunk", 
                    "content": chunk
                })
                
            # 发送完成信号
            await websocket.send_json({
                "type": "final",
                "success": True,
                "file_path": output_file,
                "full_content": full_content
            })
            
    except WebSocketDisconnect:
        manager.disconnect(client_id)
    except Exception as e:
        logger.error(f"WebSocket处理失败: {str(e)}")
        try:
            await websocket.send_json({
                "type": "error",
                "message": str(e)
            })
        except:
            pass
        finally:
            manager.disconnect(client_id)

# 异步版本的处理函数 - 添加到SmartPaper类
async def process_paper_url_stream_async(self, url, prompt_name=None, description=None):
    """异步版本的流式处理函数 - 用于WebSocket"""
    for chunk in self.process_paper_url_stream(url, prompt_name, description):
        yield chunk
        await asyncio.sleep(0)  # 让出控制权

# 动态添加异步方法到SmartPaper类
SmartPaper.process_paper_url_stream_async = process_paper_url_stream_async

def start_api():
    """启动API服务"""
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    start_api() 