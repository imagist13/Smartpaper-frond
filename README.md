# SmartPaper - 智能论文分析系统

<div align="center">
  <img src="SmartPaper/assets/logo.png" alt="SmartPaper Logo" width="200" />
  <p><strong>AI驱动的学术论文快速解析与理解工具</strong></p>
</div>

## 📑 项目简介

SmartPaper是一个基于人工智能的学术论文分析工具，旨在帮助研究人员、学生和学者快速理解复杂的学术内容。通过结合大型语言模型（LLMs）和视觉语言模型（VLMs）的能力，SmartPaper能够自动提取论文的关键信息，生成结构化摘要，并提供深入的分析见解，大幅减少学术阅读所需的时间和精力。

### 🌟 核心价值

- **节省时间**：将数小时的论文阅读时间缩短至几分钟
- **提高效率**：快速获取论文的核心思想和关键贡献
- **深入理解**：提供结构化分析和上下文关联
- **知识整合**：帮助研究者更高效地整合多篇论文的见解

## ✨ 功能特点

### 多样化的输入方式
- **PDF上传**：直接解析本地PDF文件
- **arXiv链接**：通过arXiv链接自动下载并分析论文
- **批量处理**：支持多篇论文的批量分析

### 强大的AI分析能力
- **多模型支持**：集成多种先进AI模型（OpenAI、Deepseek、智谱AI、阿里通义、百度文心等）
- **视觉理解**：使用视觉语言模型（VLM）解析图表和复杂公式
- **自定义提示词**：可选择不同风格和深度的分析模板

### 丰富的分析结果
- **结构化摘要**：自动生成包含背景、方法、结果和贡献的结构化摘要
- **关键见解**：突出论文中的创新点和重要发现
- **研究定位**：分析论文在学术领域中的位置和影响
- **技术评估**：对论文提出的方法进行技术层面的评价

### 友好的用户体验
- **流式输出**：实时显示分析进度和结果
- **多种导出格式**：支持Markdown、CSV格式导出
- **历史记录**：保存并管理过去的分析结果
- **响应式设计**：适应不同设备的屏幕尺寸

## 🔍 项目截图

<div align="center">
  <img src="docs/screenshots/homepage.png" alt="SmartPaper Homepage" width="45%" />
  <img src="docs/screenshots/analysis_result.png" alt="Analysis Result" width="45%" />
</div>

## 🔧 项目结构

```
Smartpaper-frond/
├── frond/                 # 前端代码 (React)
│   ├── src/               # 源代码
│   │   ├── components/    # UI组件
│   │   │   ├── Analyze/   # 分析相关组件
│   │   │   ├── Layout/    # 布局组件
│   │   │   └── ui/        # 通用UI组件
│   │   ├── pages/         # 页面组件
│   │   ├── services/      # API服务
│   │   └── lib/           # 工具函数
│   ├── public/            # 静态资源
│   └── package.json       # 依赖配置
└── SmartPaper/            # 后端代码 (Python)
    ├── api.py             # FastAPI服务入口
    ├── src/               # 核心功能
    │   ├── core/          # 核心算法和处理逻辑
    │   │   ├── document_converter.py    # 文档转换器
    │   │   ├── llm_wrapper.py           # LLM封装
    │   │   └── prompt_manager.py        # 提示词管理
    │   ├── tools/         # 工具函数集
    │   │   ├── everything_to_text/      # 文本提取工具
    │   │   └── paddlepaddle/            # 图像处理工具
    │   └── utils/         # 辅助功能
    ├── config/            # 配置文件目录
    │   ├── config.yaml            # 主配置文件
    │   ├── prompts_llm.yaml       # LLM提示词配置
    │   └── prompts_vlm.yaml       # VLM提示词配置
    ├── examples/          # 示例模板
    └── requirements.txt   # Python依赖
```

## 🚀 安装指南

### 系统要求
- **操作系统**：Windows 10/11, macOS, Linux
- **Python**: 3.9+
- **Node.js**: 16.0+
- **内存**: 至少4GB RAM (推荐8GB+)
- **存储**: 至少1GB可用空间

### 后端设置

1. **克隆项目并进入目录**:
   ```bash
   git clone https://github.com/yourusername/SmartPaper.git
   cd SmartPaper/SmartPaper
   ```

2. **创建虚拟环境** (可选但推荐):
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python -m venv venv
   source venv/bin/activate
   ```

3. **安装Python依赖**:
   ```bash
   pip install -r requirements.txt
   pip install fastapi uvicorn
   ```

4. **配置API密钥**:
   ```bash
   cp config/config.yaml.example config/config.yaml
   # 使用文本编辑器打开config.yaml并填入相应的API密钥
   ```

5. **初始化目录结构**:
   ```bash
   python init_dirs.py
   ```

6. **启动后端服务**:
   ```bash
   python api.py
   ```

   后端API将在 http://localhost:8000 上运行，API文档可访问 http://localhost:8000/docs

### 前端设置

1. **进入前端目录**:
   ```bash
   cd ../frond
   ```

2. **安装Node.js依赖**:
   ```bash
   npm install
   ```

3. **启动开发服务器**:
   ```bash
   npm run dev
   ```

   前端应用将在 http://localhost:5173 上运行

### 一键启动脚本

对于Windows用户，我们提供了一键启动脚本:

```bash
# 在项目根目录执行
./start.bat
```

## 📖 使用指南

### 基本使用流程

1. **访问应用**
   - 打开浏览器，访问 http://localhost:5173

2. **分析论文**
   - 点击导航栏上的"论文分析"
   - 选择输入方式:
     - **PDF上传**: 拖拽PDF文件或点击上传区域选择文件
     - **arXiv链接**: 输入有效的arXiv论文链接 (如: https://arxiv.org/abs/2303.08774)
   - 选择分析模板 (标准分析/简明总结/详细解读)
   - 点击"开始分析"按钮

3. **查看分析结果**
   - 观察实时生成的分析内容
   - 使用左侧大纲导航到感兴趣的部分
   - 利用右侧工具栏调整显示设置

4. **导出与分享**
   - 点击"下载"按钮将分析结果保存为Markdown文件
   - 使用"打印"功能获取PDF版本
   - 查看历史记录页面访问之前的分析

### 高级功能

- **自定义分析模板**：通过修改 `config/prompts_llm.yaml` 创建个性化分析模板
- **批量分析**：通过API同时提交多个论文进行分析
- **查询参数**：通过URL参数直接指定论文和模板 (e.g., `/analyze?url=xxx&template=yyy`)

## ⚙️ 配置指南

### LLM提供商配置

SmartPaper支持多种LLM提供商，可在 `SmartPaper/config/config.yaml` 中配置:

```yaml
llm:
  provider: "openai_deepseek"  # 选择默认提供商
  max_requests: 10             # 最大请求次数
  default_model_index: 0       # 默认模型索引
  
  # OpenAI配置
  openai:
    api_key: "${OPENAI_API_KEY}"  # 也可以使用环境变量
    base_url: "https://api.openai.com/v1"
    models:
      - "gpt-4-turbo"
      - "gpt-4"
      - "gpt-3.5-turbo"
    temperature: 0.7
    max_tokens: 8192
    
  # DeepSeek配置
  openai_deepseek:
    api_key: "your-deepseek-api-key"
    base_url: "https://api.deepseek.com/v1"
    models:
      - "deepseek-chat"
      - "deepseek-coder"
    temperature: 0.7
    max_tokens: 8192
    
  # 智谱AI配置
  zhipu:
    api_key: "your-zhipu-api-key"
    models:
      - "glm-4"
      - "glm-3-turbo"
    temperature: 0.7
    max_tokens: 8192
```

### 提示词模板配置

分析模板可以在 `SmartPaper/config/prompts_llm.yaml` 中自定义:

```yaml
# 示例提示词模板
coolpapaers:
  name: "标准分析"
  prompt: |
    # 任务：论文分析与总结
    你是一位AI学术助手，请分析以下论文并生成详细的解析报告。
    
    ## 输出格式
    请按照以下结构输出你的分析：
    
    1. **论文信息**：标题、作者、发表时间、关键词等
    2. **研究背景**：研究领域、研究动机、研究问题
    3. **主要方法**：技术路线、算法设计、实验设置
    4. **核心结果**：主要发现、实验结果、表现优势
    5. **创新亮点**：技术创新、理论贡献、应用价值
    6. **局限与未来方向**：研究局限性、未来可能的发展方向
    
    请使用Markdown格式输出，使用标题、列表和表格增强可读性。
    
summary:
  name: "简明总结"
  prompt: |
    # 任务：生成论文简洁总结
    作为一个AI助手，请为以下学术论文生成一个简洁明了的摘要。
    
    ## 输出要求
    1. 总结论文的核心研究问题
    2. 用1-2段话描述论文的主要方法
    3. 用1段话总结关键结果
    4. 最后以一句话点明论文主要贡献
    
    保持简洁，整个总结不超过250-300词。
    
    使用清晰的Markdown格式。
```

### 环境变量配置

您也可以使用环境变量来覆盖配置文件中的设置:

```bash
# API密钥
export OPENAI_API_KEY="sk-xxxxx"
export DEEPSEEK_API_KEY="sk-xxxxx"

# 服务设置
export SMARTPAPER_PORT=8080
export SMARTPAPER_HOST="0.0.0.0"
export SMARTPAPER_DEBUG=true

# 存储设置
export SMARTPAPER_OUTPUT_DIR="/path/to/outputs"
export SMARTPAPER_TEMP_DIR="/path/to/temp"
```

## 🔧 开发指南

### 前端开发

SmartPaper前端基于React、Vite和TailwindCSS构建:

#### 项目结构
- `src/components/`: 可复用UI组件
- `src/pages/`: 页面级组件
- `src/services/`: API服务和数据处理
- `src/lib/`: 工具函数和辅助功能

#### 添加新功能
1. 创建必要的组件在 `src/components/`
2. 在页面中引入并使用这些组件
3. 如需新页面，在 `src/pages/` 创建并在 `App.jsx` 中添加路由

#### 样式开发
SmartPaper使用TailwindCSS进行样式定制:
```bash
# 启动开发服务器并观察样式变化
npm run dev
```

### 后端开发

SmartPaper后端基于Python、FastAPI和多种AI模型:

#### 扩展功能
1. **添加新的文档转换器**
   - 在 `src/core/document_converter.py` 中实现新的转换类
   - 在 `src/core/register_converters.py` 中注册新转换器

2. **集成新的LLM提供商**
   - 在 `src/utils/llm_adapter.py` 中添加新适配器类
   - 在 `config/config.yaml` 中添加相应配置

3. **创建自定义分析流程**
   - 在 `src/core/smart_paper_core.py` 中扩展处理逻辑
   - 如需添加新API端点，在 `api.py` 中注册

#### 运行测试
```bash
# 运行所有测试
cd SmartPaper
python -m pytest tests/

# 运行特定测试组
python -m pytest tests/core/
```

## 📦 部署指南

### Docker部署

使用Docker容器化部署SmartPaper:

1. **构建Docker镜像**
```bash
# 在项目根目录运行
docker build -t smartpaper:latest .
```

2. **启动容器**
```bash
docker run -d --name smartpaper \
  -p 8000:8000 \
  -p 5173:5173 \
  -v ./config:/app/SmartPaper/config \
  -v ./outputs:/app/SmartPaper/outputs \
  smartpaper:latest
```

### 生产环境部署

对于生产环境，建议前后端分离部署:

1. **后端部署**
```bash
# 安装生产环境依赖
pip install gunicorn

# 启动后端服务
gunicorn -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000 -w 4 api:app
```

2. **前端部署**
```bash
# 构建生产版本
cd frond
npm run build

# 使用Nginx部署前端构建文件
# 配置示例:
# server {
#     listen 80;
#     server_name smartpaper.example.com;
#     root /path/to/dist;
#     try_files $uri $uri/ /index.html;
# }
```

3. **HTTPS配置**
推荐使用Certbot配置免费的Let's Encrypt SSL证书。

## 🤝 贡献指南

欢迎对SmartPaper项目做出贡献！

### 贡献流程

1. **Fork项目**
   - 在GitHub上fork本仓库到您的账号

2. **克隆仓库**
   ```bash
   git clone https://github.com/YOUR-USERNAME/SmartPaper.git
   cd SmartPaper
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **开发**
   - 进行代码修改和功能开发
   - 遵循项目的代码风格和规范
   - 添加适当的测试和文档

5. **提交更改**
   ```bash
   git commit -m "Add feature: your feature description"
   ```

6. **推送到GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建Pull Request**
   - 在GitHub上创建PR并描述您的更改

### 代码风格
- Python代码遵循PEP 8规范
- JavaScript代码遵循ESLint配置
- 使用统一的格式化工具（如Prettier）

## ❓ 常见问题

### 一般问题
- **Q: 支持哪些论文格式?**
  A: 目前支持PDF格式和arXiv链接。将来会支持更多格式如DOI链接和IEEE Xplore链接。

- **Q: 能分析非英文论文吗?**
  A: 主要支持英文论文，但也支持中文论文。其他语言的支持有限。

### 技术问题
- **Q: 如何添加新的LLM提供商?**
  A: 在 `config.yaml` 中添加配置，并在 `src/utils/llm_adapter.py` 中实现适配器类。详见开发指南。

- **Q: 如何自定义分析模板?**
  A: 修改 `config/prompts_llm.yaml` 添加新模板。格式参考已有模板，前端将自动加载新模板。

- **Q: 后端API返回504超时错误怎么办?**
  A: 这通常是因为论文分析时间过长。可以调整服务器超时设置，或优化分析流程减少处理时间。

- **Q: 如何解决"No module named xxx"错误?**
  A: 确保已安装所有依赖：`pip install -r requirements.txt`。某些系统可能需要额外安装特定依赖。

## 📜 许可证

SmartPaper遵循MIT许可证发布。

```
MIT License

Copyright (c) 2024 SmartPaper Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```
