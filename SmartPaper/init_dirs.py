#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
初始化目录结构
确保必要的目录存在，用于SmartPaper API服务
"""

import os
import sys

def init_directories():
    """创建必要的目录"""
    # 获取当前文件所在的目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 需要创建的目录列表
    directories = [
        os.path.join(current_dir, "temp"),
        os.path.join(current_dir, "outputs")
    ]
    
    # 创建目录
    for directory in directories:
        try:
            if not os.path.exists(directory):
                os.makedirs(directory)
                print(f"创建目录: {directory}")
            else:
                print(f"目录已存在: {directory}")
        except Exception as e:
            print(f"创建目录失败 {directory}: {str(e)}")
            
    print("目录初始化完成！")

if __name__ == "__main__":
    init_directories() 