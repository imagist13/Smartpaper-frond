# SmartPaper 智能论文分析系统

一个基于AI的论文分析工具，帮助研究人员快速理解和总结学术论文。

## 功能特点

- 支持多种AI模型（OpenAI、Deepseek、智谱AI等）
- 支持PDF和arXiv链接直接分析
- 自定义分析模板和提示词
- 多种输出格式（Markdown、CSV）
- 交互式Web界面
- 流式输出分析结果
- 支持视觉语言模型（VLM）辅助分析

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
    │   ├── core/        # 核心算法
    │   ├── tools/       # 工具函数
    │   └── utils/       # 辅助函数
    ├── config/          # 配置文件
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
3. 输入论文URL (支持arXiv等学术网站) 或上传PDF文件
4. 选择分析模板
5. 点击"开始分析"
6. 查看分析结果，支持导出为Markdown或CSV

## 配置指南

### LLM配置

在 `SmartPaper/config/config.yaml` 中配置:

```yaml
llm:
  provider: "openai_deepseek"  # 选择AI提供商
  max_requests: 10  # 最大请求次数
  default_model_index: 0  # 默认模型索引
  
  # 各提供商配置
  openai_deepseek:
    api_key: "your-api-key"
    base_url: "https://api.deepseek.com/v1"
    models:
      - "deepseek-chat"
      - "deepseek-coder"
    temperature: 0.7
    max_tokens: 8192
```

### 提示词配置

在 `SmartPaper/config/prompts_llm.yaml` 中配置分析模板。

## 开发指南

### 前端开发

- 前端使用 React + Vite + Tailwind CSS 
- UI组件基于自定义组件库
- 组件位于 `frond/src/components/` 目录

### 后端开发

- 后端使用 Python + FastAPI
- 核心功能基于SmartPaper库
- 新增转换器可参考 `docs/register_document_converter.md`

## 部署指南

### Docker部署

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d
```

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

## 贡献指南

1. Fork本项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 常见问题

- **Q: 如何添加新的LLM提供商?**
  A: 在 `config.yaml` 中添加配置，并在 `src/utils/llm_adapter.py` 中实现适配器。

- **Q: 如何自定义分析模板?**
  A: 修改 `config/prompts_llm.yaml` 添加新模板，前端将自动加载。

## 许可证

MIT License
