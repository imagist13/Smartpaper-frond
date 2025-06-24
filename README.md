# SmartPaper 智能论文分析系统

一个基于AI的论文分析工具，帮助研究人员快速理解和总结学术论文。

## 项目结构

```
Smartpaper-frond/
├── frond/               # 前端代码 (React)
│   ├── src/             
│   ├── public/          
│   └── package.json
└── SmartPaper/          # 后端代码 (Python)
    ├── api.py           # FastAPI 服务
    ├── src/             # 核心功能
    └── requirements.txt
```

## 安装指南

### 后端设置

1. 安装Python依赖:

```bash
cd SmartPaper
pip install -r requirements.txt
pip install fastapi uvicorn
```

2. 创建配置文件:

```bash
cp config/config.yaml.example config/config.yaml
# 编辑 config.yaml 填入API密钥等配置
```

3. 启动后端API:

```bash
python api.py
```

后端服务将在 http://localhost:8000 上运行，可以访问 http://localhost:8000/docs 查看 API 文档。

### 前端设置

1. 安装Node.js依赖:

```bash
cd frond
npm install
```

2. 启动开发服务器:

```bash
npm run dev
```

前端开发服务器将在 http://localhost:5173 上运行。

## 使用指南

1. 在浏览器中打开 http://localhost:5173
2. 导航到"论文分析"页面
3. 输入论文URL (支持arXiv等学术网站)
4. 选择分析模板
5. 点击"开始分析"

## 开发指南

### 前端开发

- 前端使用 React + Vite + Tailwind CSS 
- UI组件基于自定义组件库

### 后端开发

- 后端使用 Python + FastAPI
- 核心功能基于SmartPaper库

## 部署指南

### Docker部署

待添加

### 常规部署

1. 构建前端:

```bash
cd frond
npm run build
```

2. 使用Nginx等Web服务器部署前端构建文件

3. 使用Gunicorn和Uvicorn部署后端API:

```bash
gunicorn -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000 api:app
```

## 许可证

MIT License
