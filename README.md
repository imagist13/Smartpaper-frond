# SmartPaper Analysis System

SmartPaper Analysis System is an advanced AI-powered tool for analyzing academic papers and research documents. It provides comprehensive analysis, summarization, and insights from research papers, helping researchers and students quickly understand complex academic content.

## Features

- **Paper Analysis**: Analyze papers by URL (arxiv, PDF links) or direct PDF upload
- **Streaming Analysis**: Real-time streaming response as the AI processes the paper
- **Structured Output**: Presents analysis in well-organized sections including:
  - Summary and key points
  - Research background and motivation
  - Methodology and techniques
  - Results and findings
  - Conclusion and future directions
- **Modern UI**: Clean, responsive interface with collapsible sections
- **Performance Optimized**: Virtual scrolling, caching, and efficient rendering
- **History Management**: Save and revisit previous paper analyses

## System Architecture

The system consists of two main components:

1. **Frontend (React)**: User interface, data presentation, and interaction
2. **Backend (Python FastAPI)**: Paper processing, AI analysis, and API endpoints

## Setup Requirements

- Python 3.8 or higher
- Node.js 14 or higher
- npm

## Installation Instructions

1. Clone the repository
2. Install backend dependencies:
   ```
   cd SmartPaper
   pip install -r requirements.txt
   ```
3. Install frontend dependencies:
   ```
   cd frond
   npm install
   ```

## Configuration

1. Copy the example config file:
   ```
   cd SmartPaper/config
   cp config.yaml.example config.yaml
   ```
2. Edit `config.yaml` to configure your API keys and other settings

## Starting the System

### Windows
Run the startup script:
```
.\start-system-en.ps1
```

### Manual Start
1. Start the backend:
   ```
   python SmartPaper/api_service.py --port 8501
   ```
2. Start the frontend:
   ```
   cd frond
   npm run dev -- --port 3000 --host
   ```

## Usage Guide

1. **Analyze a Paper by URL**:
   - Paste the paper URL (arxiv, direct PDF, etc.) in the URL input field
   - Click "Analyze Paper"
   - View the real-time streaming analysis

2. **Analyze a Paper by PDF Upload**:
   - Click the upload icon
   - Select your PDF file
   - Click "Analyze PDF"
   - View the real-time streaming analysis

3. **View Analysis Results**:
   - Navigate through the structured sections
   - Expand/collapse sections as needed
   - Copy the full analysis with the copy button

4. **History**:
   - View previously analyzed papers in the History section
   - Re-analyze past papers with a single click

## Contributing

Contributions to improve SmartPaper Analysis System are welcome! Please feel free to submit pull requests or open issues to discuss new features or report bugs.

## License

This project is licensed under the terms of the MIT license. # Smartpaper-frond
