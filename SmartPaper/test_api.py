#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
SmartPaper API 测试脚本

用于测试后端 API 是否正常工作
"""

import requests
import json
import websocket
import time
import sys

API_BASE_URL = "http://localhost:8000"
WS_BASE_URL = "ws://localhost:8000"

def test_root():
    """测试根路径"""
    print("测试根路径...")
    response = requests.get(f"{API_BASE_URL}/")
    print(f"状态码: {response.status_code}")
    print(f"响应内容: {response.json()}")
    assert response.status_code == 200
    print("测试通过!\n")

def test_prompts():
    """测试获取提示词模板"""
    print("测试获取提示词模板...")
    response = requests.get(f"{API_BASE_URL}/prompts")
    print(f"状态码: {response.status_code}")
    print(f"响应内容: {response.json()}")
    assert response.status_code == 200
    assert "prompts" in response.json()
    print("测试通过!\n")

def test_analyze(url="https://arxiv.org/pdf/2305.12002"):
    """测试同步分析接口"""
    print("测试同步分析接口...")
    data = {
        "url": url,
        "prompt_name": "yuanbao"  # 使用默认提示词模板
    }
    response = requests.post(f"{API_BASE_URL}/analyze", json=data)
    print(f"状态码: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"分析结果长度: {len(result.get('result', ''))}")
        print(f"文件路径: {result.get('file_path', '')}")
        print("测试通过!\n")
    else:
        print(f"错误信息: {response.text}")
        print("测试失败!\n")

def test_websocket(url="https://arxiv.org/pdf/2305.12002"):
    """测试WebSocket流式接口"""
    print("测试WebSocket流式接口...")
    
    client_id = "test_client"
    ws_url = f"{WS_BASE_URL}/ws/analyze/{client_id}"
    
    result_chunks = []
    
    def on_message(ws, message):
        data = json.loads(message)
        if data.get("type") == "chunk":
            chunk = data.get("content", "")
            result_chunks.append(chunk)
            print(f"接收到块: {chunk[:20]}...")
        elif data.get("type") == "final":
            print("分析完成！")
            ws.close()
        elif data.get("type") == "error":
            print(f"错误: {data.get('message', '未知错误')}")
            ws.close()
    
    def on_error(ws, error):
        print(f"WebSocket错误: {error}")
    
    def on_close(ws, close_status_code, close_msg):
        print("WebSocket连接已关闭")
    
    def on_open(ws):
        print("WebSocket连接已打开，发送请求...")
        data = {
            "url": url,
            "prompt_name": "yuanbao"  # 使用默认提示词模板
        }
        ws.send(json.dumps(data))
    
    ws = websocket.WebSocketApp(
        ws_url,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
        on_open=on_open
    )
    
    ws.run_forever()
    
    print(f"接收到的总块数: {len(result_chunks)}")
    if result_chunks:
        print("测试通过!\n")
    else:
        print("测试失败!\n")

def main():
    """运行所有测试"""
    print("=== 开始API测试 ===")
    
    try:
        test_root()
        test_prompts()
        
        # 如果提供了URL参数，使用它进行测试
        if len(sys.argv) > 1:
            url = sys.argv[1]
            print(f"使用提供的URL进行测试: {url}")
            test_analyze(url)
            test_websocket(url)
        else:
            test_analyze()
            test_websocket()
            
    except Exception as e:
        print(f"测试过程中出错: {str(e)}")
    
    print("=== API测试完成 ===")

if __name__ == "__main__":
    main() 