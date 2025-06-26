#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
SmartPaper API 服务

提供REST API和WebSocket接口，用于前端与SmartPaper核心功能的交互
"""

import os
import uuid
import glob
import re
from datetime import datetime
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse
from pydantic import BaseModel
import asyncio
import json
from loguru import logger
import uvicorn
# 添加文件上传所需的导入
from fastapi import UploadFile, File, Form, Depends
import shutil

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
    
class HistoryItem(BaseModel):
    """历史记录项"""
    id: str
    title: str
    url: str
    date: str
    promptName: str
    file_path: str
    snippet: str
    
class HistoryResponse(BaseModel):
    """历史记录响应"""
    history: List[HistoryItem]

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

@app.get("/history", response_model=HistoryResponse)
def get_history():
    """获取历史分析记录"""
    try:
        # 输出目录
        output_dir = "outputs"
        history = []
        
        # 获取所有分析文件
        files = glob.glob(os.path.join(output_dir, "analysis_*.md"))
        
        for file_path in files:
            file_name = os.path.basename(file_path)
            # 解析文件名中的信息
            match = re.search(r'analysis_([^_]+)_(.+?)_prompt_(.+?)\.md$', file_name)
            
            if match:
                id = match.group(1)
                url_or_filename = match.group(2)
                prompt_name = match.group(3)
                
                # 获取文件修改时间作为日期
                mod_time = os.path.getmtime(file_path)
                date = datetime.fromtimestamp(mod_time).strftime("%Y-%m-%d")
                
                # 提取标题和摘要
                title = url_or_filename
                snippet = ""
                
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    # 尝试从内容中提取标题
                    title_match = re.search(r'^# (.+)$', content, re.MULTILINE)
                    if title_match:
                        title = title_match.group(1)
                    
                    # 获取内容前100个字符作为摘要
                    snippet = content[:200].replace("\n", " ")
                
                history.append(
                    HistoryItem(
                        id=id,
                        title=title,
                        url=url_or_filename,
                        date=date,
                        promptName=prompt_name,
                        file_path=file_path,
                        snippet=snippet
                    )
                )
        
        # 按日期降序排序
        history.sort(key=lambda x: x.date, reverse=True)
        
        return {"history": history}
    except Exception as e:
        logger.error(f"获取历史记录失败: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/history/{file_id}")
def delete_history(file_id: str):
    """删除历史记录"""
    try:
        output_dir = "outputs"
        files = glob.glob(os.path.join(output_dir, f"analysis_{file_id}_*.md"))
        
        if not files:
            raise HTTPException(status_code=404, detail="未找到指定的历史记录")
            
        for file_path in files:
            os.remove(file_path)
            
        return {"success": True, "message": "删除成功"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"删除历史记录失败: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history/{file_id}")
def download_history(file_id: str):
    """下载历史记录"""
    try:
        output_dir = "outputs"
        files = glob.glob(os.path.join(output_dir, f"analysis_{file_id}_*.md"))
        
        if not files:
            raise HTTPException(status_code=404, detail="未找到指定的历史记录")
            
        return FileResponse(
            files[0],
            media_type="text/markdown",
            filename=os.path.basename(files[0])
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"下载历史记录失败: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

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

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), prompt_name: str = Form(...), client_id: str = Form(None)):
    """上传PDF文件并保存到临时目录"""
    try:
        # 创建临时目录
        temp_dir = "temp"
        os.makedirs(temp_dir, exist_ok=True)
        
        # 生成文件名
        file_name = file.filename
        file_path = os.path.join(temp_dir, file_name)
        
        # 保存文件
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # 保存提示词模板信息到临时文件，以便WebSocket处理时使用
        prompt_info_file = os.path.join(temp_dir, f"{client_id}_prompt_info.json")
        with open(prompt_info_file, "w", encoding="utf-8") as f:
            json.dump({"prompt_name": prompt_name}, f)
        
        return {
            "success": True,
            "file_path": file_path,
            "file_name": file_name,
            "prompt_name": prompt_name,
            "client_id": client_id
        }
    except Exception as e:
        logger.error(f"文件上传失败: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws/analyze_file/{client_id}")
async def websocket_analyze_file(websocket: WebSocket, client_id: str):
    """WebSocket接口 - 用于流式分析上传的文件"""
    await manager.connect(websocket, client_id)
    try:
        # 查找临时目录中的文件
        temp_dir = "temp"
        files = glob.glob(os.path.join(temp_dir, "*.pdf"))
        
        if not files:
            await websocket.send_json({
                "type": "error",
                "message": "未找到上传的文件"
            })
            return
        
        # 使用最新上传的文件
        file_path = max(files, key=os.path.getmtime)
        file_name = os.path.basename(file_path)
        
        # 获取提示词模板信息
        prompt_name = "yuanbao"  # 默认值
        prompt_info_file = os.path.join(temp_dir, f"{client_id}_prompt_info.json")
        if os.path.exists(prompt_info_file):
            try:
                with open(prompt_info_file, "r", encoding="utf-8") as f:
                    prompt_info = json.load(f)
                    prompt_name = prompt_info.get("prompt_name", prompt_name)
                    logger.info(f"使用提示词模板: {prompt_name}")
            except Exception as e:
                logger.error(f"读取提示词信息失败: {str(e)}")
        
        # 初始化SmartPaper
        reader = SmartPaper(output_format="markdown")
        
        # 创建输出目录
        output_dir = "outputs"
        os.makedirs(output_dir, exist_ok=True)
        
        # 生成输出文件路径
        output_file = os.path.join(
            output_dir, 
            f'analysis_{client_id}_{file_name}_prompt_{prompt_name}.md'
        )
        
        # 以写入模式打开文件，并发送流式结果
        with open(output_file, "w", encoding="utf-8") as f:
            full_content = ""
            # 使用本地文件路径处理
            for chunk in reader.process_paper_local(file_path, prompt_name=prompt_name):
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

def start_api():
    """启动API服务"""
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    start_api() 