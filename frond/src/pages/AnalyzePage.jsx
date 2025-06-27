import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { 
  FaSpinner, 
  FaDownload, 
  FaArrowLeft, 
  FaChevronRight, 
  FaChevronLeft, 
  FaEllipsisV,
  FaFileUpload,
  FaLink,
  FaFileAlt,
  FaCode,
  FaCheckCircle,
  FaTimesCircle,
  FaListUl
} from 'react-icons/fa';

// 组件导入
import AnalyzeHeader from '../components/Analyze/AnalyzeHeader';
import InputForm from '../components/Analyze/InputForm';
import ResultViewer from '../components/Analyze/ResultViewer';
import ErrorMessage from '../components/Analyze/ErrorMessage';
import AnalysisToolbar from '../components/Analyze/AnalysisToolbar';
import DocumentOutline from '../components/Analyze/DocumentOutline';
import PaperMetadata, { extractPaperMetadata, extractSummary } from '../components/Analyze/PaperMetadata';
import ContentCategorizer, { categorizeContent } from '../components/Analyze/ContentCategorizer';
import MarkdownRenderer from '../components/Analyze/MarkdownRenderer';

// API 基础URL
const API_BASE_URL = 'http://localhost:8000';

const AnalyzePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const historyItem = location.state?.historyItem;
  
  // 状态
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [prompts, setPrompts] = useState({});
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState('');
  const [clientId] = useState(uuidv4());
  const [socket, setSocket] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultTab, setResultTab] = useState('preview');
  const [isFromHistory, setIsFromHistory] = useState(false);
  const [error, setError] = useState(null);
  
  // refs
  const resultRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // 获取可用的提示词模板
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/prompts`);
        setPrompts(response.data.prompts);
        if (Object.keys(response.data.prompts).length > 0) {
          setSelectedPrompt(Object.keys(response.data.prompts)[0]);
        }
      } catch (error) {
        console.error('获取提示词模板失败', error);
        setError('获取提示词模板失败，请检查服务器连接');
      }
    };

    fetchPrompts();
  }, []);
  
  // 如果从历史记录页面跳转过来，加载历史记录内容
  useEffect(() => {
    if (historyItem) {
      const loadHistoryItem = async () => {
        setIsAnalyzing(true);
        try {
          // 设置URL和提示词模板
          setUrl(historyItem.url);
          setSelectedPrompt(historyItem.promptName);
          setIsFromHistory(true);
          
          // 获取历史记录内容
          const response = await axios.get(`${API_BASE_URL}/history/${historyItem.id}`);
          setResult(response.data);
          setShowResult(true);
          
          console.log('已加载历史记录', historyItem.title);
        } catch (error) {
          console.error('加载历史记录失败', error);
          setError('加载历史记录失败');
        } finally {
          setIsAnalyzing(false);
        }
      };
      
      loadHistoryItem();
    }
  }, [historyItem]);
  
  // 滚动到结果底部
  const scrollToBottom = () => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  };
  
  // 取消分析
  const handleCancel = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
    setIsAnalyzing(false);
  };
  
  // 返回输入界面
  const handleBackToInput = () => {
    setShowResult(false);
    setResult('');
    setIsFromHistory(false);
  };
  
  // 下载结果
  const handleDownloadResult = () => {
    if (!result) return;
    
    const blob = new Blob([result], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `论文分析_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // 处理表单提交
  const handleSubmit = async (submittedTab) => {
    setError(null);
    
    if (submittedTab === 'upload' && !file) {
      setError('请选择PDF文件');
      return;
    }
    
    if (submittedTab === 'url' && !url) {
      setError('请输入论文URL');
      return;
    }
    
    if (!selectedPrompt) {
      setError('请选择分析模板');
      return;
    }
    
    // 清除之前的状态
    setResult('');
    setIsAnalyzing(true);
    setShowResult(true);
    
    try {
      if (submittedTab === 'upload') {
        // 处理文件上传
        const formData = new FormData();
        formData.append('file', file);
        formData.append('prompt_name', selectedPrompt);
        formData.append('client_id', clientId);
        
        // 创建WebSocket连接
        const ws = new WebSocket(`ws://${API_BASE_URL.replace(/^https?:\/\//, '')}/ws/analyze_file/${clientId}`);
        setSocket(ws);
        
        ws.onopen = async () => {
          // 上传文件
          try {
            const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'X-Client-ID': clientId
              }
            });
            
            if (!response.data.success) {
              throw new Error('上传失败');
            }
            
            console.log('文件上传成功', response.data);
          } catch (error) {
            console.error('上传失败', error);
            setIsAnalyzing(false);
            setError('文件上传失败，请重试');
            ws.close();
          }
        };
        
        setupWebSocketHandlers(ws);
      } else {
        // 处理URL分析
        const ws = new WebSocket(`ws://${API_BASE_URL.replace(/^https?:\/\//, '')}/ws/analyze/${clientId}`);
        setSocket(ws);
        
        ws.onopen = () => {
          // 发送分析请求
          ws.send(JSON.stringify({
            url: url,
            prompt_name: selectedPrompt,
          }));
        };
        
        setupWebSocketHandlers(ws);
      }
    } catch (error) {
      console.error('分析失败', error);
      setIsAnalyzing(false);
      setError('连接服务器失败，请检查网络连接');
    }
  };
  
  const setupWebSocketHandlers = (ws) => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'chunk') {
        setResult(prev => prev + data.content);
        scrollToBottom();
      } else if (data.type === 'final') {
        if (data.success) {
          console.log('分析完成');
        }
        setIsAnalyzing(false);
        ws.close();
      } else if (data.type === 'error') {
        setError(data.message || '分析过程中出错');
        setIsAnalyzing(false);
        ws.close();
      }
    };
    
    ws.onclose = () => {
      console.log('WebSocket连接已关闭');
      setSocket(null);
      if (isAnalyzing) {
        setIsAnalyzing(false);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket错误', error);
      setError('连接错误，请重试');
      setIsAnalyzing(false);
    };
  };
  
  // 文件上传处理
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('请上传PDF文件');
        setFile(null);
        e.target.value = null;
        return;
      }
      
      if (selectedFile.size > 20 * 1024 * 1024) { // 20MB
        setError('文件大小不能超过20MB');
        setFile(null);
        e.target.value = null;
        return;
      }
      
      setFile(selectedFile);
      setError(null);
    }
  };
  
  // URL输入处理
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setError(null);
  };
  
  // 切换分析模板
  const handlePromptChange = (e) => {
    setSelectedPrompt(e.target.value);
  };
  
  // 清除文件
  const handleClearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-4">
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
      
      {!showResult ? (
        <InputForm
          activeTab={activeTab}
          file={file}
          setFile={setFile}
          url={url}
          setUrl={setUrl}
          prompts={prompts}
          selectedPrompt={selectedPrompt}
          setSelectedPrompt={setSelectedPrompt}
          handleSubmit={handleSubmit}
          fileInputRef={fileInputRef}
        />
      ) : (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          {/* 分析结果头部 */}
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 text-white p-3 rounded-l-md">
              <FaFileAlt className="text-xl" />
            </div>
            <div className="bg-gray-100 flex-grow py-2 px-4 rounded-r-md border border-gray-200">
              <div className="font-medium">分析结果</div>
              <div className="text-xs text-gray-500">{new Date().toLocaleDateString()}</div>
            </div>
            
            <div className="ml-auto flex items-center space-x-2">
              <button className="p-2 rounded-md hover:bg-gray-100" title="全屏查看">
                <FaExpand />
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100" title="刷新">
                <FaSync />
              </button>
              <button 
                className="p-2 rounded-md hover:bg-gray-100" 
                title="复制链接"
              >
                <FaShare />
              </button>
              <button 
                className="p-2 rounded-md hover:bg-gray-100" 
                title="打印"
              >
                <FaPrint />
              </button>
              <button 
                className="bg-blue-500 text-white px-3 py-1.5 rounded-md flex items-center"
                onClick={handleDownloadResult}
              >
                <FaDownload className="mr-1.5" /> 下载结果
              </button>
            </div>
          </div>
          
          {/* 三栏布局主内容区 */}
          <div className="flex flex-1 gap-4 overflow-hidden">
            {/* 左侧边栏 - 文档大纲 */}
            <div className="w-56 flex-shrink-0 border border-gray-200 rounded-md overflow-hidden bg-white">
              {/* 左侧边栏头部 */}
              <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-medium text-gray-700">文档大纲</h3>
              </div>
              
              {/* 左侧边栏内容 */}
              <div className="h-full overflow-y-auto p-2">
                <ul>
                  {documentOutline.map((heading, index) => (
                    <li 
                      key={index}
                      className={`
                        py-1.5 px-2 cursor-pointer hover:bg-gray-100 rounded 
                        text-sm truncate border-l-2 
                        ${index === 0 ? 'border-blue-500 bg-blue-50' : 'border-transparent'}
                      `}
                      style={{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }}
                      onClick={() => scrollToHeading(heading.id)}
                    >
                      {heading.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* 中间内容区 */}
            <div className="flex-grow flex flex-col border border-gray-200 rounded-md overflow-hidden bg-white">
              {/* 内容区标签页 */}
              <div className="bg-gray-100 border-b border-gray-200">
                <div className="flex">
                  <button 
                    className={`
                      px-4 py-2 text-sm font-medium
                      ${analysisTab === 'preview' ? 'bg-white border-t-2 border-blue-500' : 'hover:bg-gray-200'}
                    `}
                    onClick={() => handleViewModeChange('preview')}
                  >
                    <FaEye className="inline mr-1" /> 预览
                  </button>
                  <button 
                    className={`
                      px-4 py-2 text-sm font-medium
                      ${analysisTab === 'markdown' ? 'bg-white border-t-2 border-blue-500' : 'hover:bg-gray-200'}
                    `}
                    onClick={() => handleViewModeChange('markdown')}
                  >
                    <FaMarkdown className="inline mr-1" /> Markdown
                  </button>
                </div>
              </div>
              
              {/* 内容区 */}
              <div className="flex-grow overflow-y-auto p-4" ref={resultRef}>
                {isAnalyzing && !result && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <FaSpinner className="animate-spin text-3xl text-blue-500 mb-4" />
                    <p className="text-lg">正在分析论文，请稍候...</p>
                    <p className="text-sm text-gray-500 mt-2">分析时间取决于论文长度和复杂度</p>
                  </div>
                )}
                
                {!isAnalyzing && !result && (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p>分析结果将显示在这里</p>
                  </div>
                )}
                
                {result && analysisTab === 'preview' && (
                  <MarkdownRenderer content={result} />
                )}
                
                {result && analysisTab === 'markdown' && (
                  <pre className="text-sm font-mono whitespace-pre-wrap p-4 bg-gray-50 rounded-md border border-gray-200">
                    {result}
                  </pre>
                )}
              </div>
              
              {/* 底部状态栏 */}
              {isAnalyzing && (
                <div className="bg-blue-50 border-t border-blue-100 p-2 flex items-center">
                  <FaSpinner className="animate-spin text-blue-500 mr-2" />
                  <span className="text-blue-700 text-sm">正在生成分析结果，实时更新中...</span>
                </div>
              )}
            </div>
            
            {/* 右侧边栏 - 工具和元数据 */}
            <div className="w-64 flex-shrink-0 flex flex-col gap-4">
              {/* 快捷操作 */}
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">快捷操作</h3>
                </div>
                <div className="p-3 space-y-2">
                  <button className="w-full flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
                    <FaBookmark className="mr-1.5" /> 收藏
                  </button>
                  <button className="w-full flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
                    <FaShare className="mr-1.5" /> 分享
                  </button>
                  <button 
                    onClick={handleDownloadResult}
                    className="w-full flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                    disabled={!result || isAnalyzing}
                  >
                    <FaDownload className="mr-1.5" /> 下载MD文件
                  </button>
                  <button 
                    className="w-full flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                    disabled={!result || isAnalyzing}
                  >
                    <FaFilePdf className="mr-1.5" /> 导出PDF
                  </button>
                </div>
              </div>
              
              {/* 内容统计 */}
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">内容统计</h3>
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">
                      <div className="text-xs text-gray-500">字数</div>
                      <div className="font-medium">{result ? result.length : 0}</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">
                      <div className="text-xs text-gray-500">段落</div>
                      <div className="font-medium">{result ? result.split('\n\n').length : 0}</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">
                      <div className="text-xs text-gray-500">引用</div>
                      <div className="font-medium">7</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">
                      <div className="text-xs text-gray-500">代码块</div>
                      <div className="font-medium">0</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 标签 */}
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">标签</h3>
                </div>
                <div className="p-3">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">NLP</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">深度学习</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">大规模模型</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded cursor-pointer">+ 添加标签</span>
                  </div>
                </div>
              </div>
              
              {/* 分享 */}
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-100 p-3 border-b border-gray-200">
                  <h3 className="font-medium text-gray-700">分享</h3>
                </div>
                <div className="p-3">
                  <div className="flex items-center p-2 bg-gray-50 rounded-md border border-gray-200 text-sm">
                    <input 
                      type="text" 
                      value="https://smartpaper.com/share/a" 
                      readOnly
                      className="flex-grow bg-transparent border-none focus:outline-none text-sm"
                    />
                    <button className="ml-2 text-blue-500 px-2 py-1 hover:bg-blue-50 rounded">复制</button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">链接有效期30天，到期后自动失效</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzePage; 