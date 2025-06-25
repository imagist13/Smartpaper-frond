import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { FaSpinner, FaDownload, FaArrowLeft, FaChevronRight, FaChevronLeft, FaEllipsisV } from 'react-icons/fa';

// 组件导入
import AnalyzeHeader from '../components/Analyze/AnalyzeHeader';
import InputForm from '../components/Analyze/InputForm';
import ResultViewer from '../components/Analyze/ResultViewer';
import ErrorMessage from '../components/Analyze/ErrorMessage';

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
  
  // 新增的状态
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [documentOutline, setDocumentOutline] = useState([]);
  
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
  
  // 提取文档大纲
  useEffect(() => {
    if (result) {
      // 从Markdown提取标题创建大纲
      const headings = [];
      const lines = result.split('\n');
      
      lines.forEach((line, index) => {
        if (line.startsWith('#')) {
          const level = line.indexOf(' ');
          if (level > 0 && level <= 6) {
            const title = line.substring(level + 1).trim();
            headings.push({
              id: `heading-${index}`,
              title,
              level,
            });
          }
        }
      });
      
      setDocumentOutline(headings);
    }
  }, [result]);
  
  // 滚动到结果底部
  const scrollToBottom = () => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  };
  
  // 滚动到指定标题
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (activeTab === 'upload' && !file) {
      setError('请选择PDF文件');
      return;
    }
    
    if (activeTab === 'url' && !url) {
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
      if (activeTab === 'upload') {
        // 处理文件上传
        const formData = new FormData();
        formData.append('file', file);
        formData.append('prompt_name', selectedPrompt);
        
        // 创建WebSocket连接
        const ws = new WebSocket(`ws://${API_BASE_URL.replace(/^https?:\/\//, '')}/ws/analyze_file/${clientId}`);
        setSocket(ws);
        
        ws.onopen = () => {
          // 上传文件
          axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'X-Client-ID': clientId
            }
          }).catch(error => {
            console.error('上传失败', error);
            setIsAnalyzing(false);
            setError('文件上传失败，请重试');
            ws.close();
          });
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
        console.error('分析错误', data.message);
        setIsAnalyzing(false);
        setError(data.message || '分析过程中出现错误');
        ws.close();
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket错误', error);
      setIsAnalyzing(false);
      setError('连接中断，请重试');
    };
    
    ws.onclose = () => {
      setSocket(null);
    };
  };
  
  // 侧边栏切换
  const toggleLeftSidebar = () => setLeftSidebarOpen(!leftSidebarOpen);
  const toggleRightSidebar = () => setRightSidebarOpen(!rightSidebarOpen);
  
  // 添加响应式控制
  useEffect(() => {
    const handleResize = () => {
      // 在小屏幕上自动折叠侧边栏
      if (window.innerWidth < 768) {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
      } else if (window.innerWidth < 1280) {
        // 在中等屏幕上只显示左侧边栏
        setLeftSidebarOpen(true);
        setRightSidebarOpen(false);
      } else {
        // 在大屏幕上显示两侧边栏
        setLeftSidebarOpen(true);
        setRightSidebarOpen(true);
      }
    };

    // 初始化时执行一次
    handleResize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* 固定顶部导航栏 */}
      <header className="bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-4 z-20">
        <div className="flex items-center">
          {showResult && (
            <button 
              onClick={handleBackToInput}
              className="mr-2 sm:mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="返回"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
          )}
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
            {showResult ? '论文分析结果' : '智能论文分析'}
          </h1>
          
          {isAnalyzing && (
            <div className="ml-2 sm:ml-4 flex items-center text-indigo-600">
              <FaSpinner className="animate-spin mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm font-medium hidden xs:inline">实时生成中...</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          {showResult && result && !isAnalyzing && (
            <button 
              onClick={handleDownloadResult}
              className="px-2 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center text-xs sm:text-sm"
            >
              <FaDownload className="mr-1 sm:mr-2" /> <span className="hidden xs:inline">下载结果</span>
            </button>
          )}
          {isAnalyzing && (
            <button 
              onClick={handleCancel}
              className="px-2 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-xs sm:text-sm"
            >
              <span className="hidden xs:inline">取消</span><span className="xs:hidden">取消分析</span>
            </button>
          )}
        </div>
      </header>
      
      {/* 主要内容区域 - 响应式三栏布局 */}
      <div className="flex flex-grow overflow-hidden relative">
        {/* 左侧边栏 - 文档概览和导航 */}
        {showResult && (
          <aside 
            className={`
              ${leftSidebarOpen ? 'md:w-56 lg:w-60 xl:w-64' : 'w-0 md:w-0'} 
              h-full md:static fixed left-0 top-16 bottom-0 z-30
              bg-gray-50 border-r border-gray-200 transition-all duration-300
              ${leftSidebarOpen && !rightSidebarOpen ? 'md:block' : ''}
              ${leftSidebarOpen && window.innerWidth < 768 ? 'w-full' : ''}
              flex-shrink-0
            `}
            style={{ 
              maxWidth: leftSidebarOpen && window.innerWidth < 768 ? '100%' : '16rem',
              display: leftSidebarOpen && window.innerWidth >= 768 ? 'block' : 'none'
            }}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="font-medium text-gray-700">文档大纲</h3>
              <button 
                onClick={toggleLeftSidebar} 
                className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-200"
                aria-label="关闭左侧栏"
              >
                <FaChevronLeft size={16} />
              </button>
            </div>
            <div className="overflow-y-auto p-4" style={{ height: 'calc(100% - 3rem)' }}>
              {documentOutline.length > 0 ? (
                <ul className="space-y-1">
                  {documentOutline.map((item) => (
                    <li 
                      key={item.id}
                      className={`py-1 px-2 cursor-pointer hover:bg-gray-200 rounded text-sm truncate ${item.level === 1 ? 'font-semibold' : ''}`}
                      style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
                      onClick={() => {
                        scrollToHeading(item.id);
                        if (window.innerWidth < 768) {
                          setLeftSidebarOpen(false);
                        }
                      }}
                      title={item.title}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">无可用大纲</p>
              )}
            </div>
          </aside>
        )}
        
        {/* 收起/展开左侧边栏的按钮 */}
        {showResult && !leftSidebarOpen && (
          <button 
            onClick={toggleLeftSidebar}
            className="fixed left-0 top-20 z-30 bg-white shadow-md p-2 rounded-r-md border border-gray-200"
            aria-label="展开目录"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
        )}
        
        {/* 点击遮罩关闭侧边栏 */}
        {showResult && (leftSidebarOpen || rightSidebarOpen) && window.innerWidth < 768 && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => {
              if (leftSidebarOpen) setLeftSidebarOpen(false);
              if (rightSidebarOpen) setRightSidebarOpen(false);
            }}
          />
        )}
        
        {/* 中间主内容区域 */}
        <main className="flex-grow overflow-y-auto bg-gray-100 min-w-0 w-full">
          <div className="p-3 sm:p-6 mx-auto max-w-full">
            <ErrorMessage error={error} />
            
            {!showResult ? (
              <div className="max-w-3xl mx-auto">
                <InputForm 
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  file={file}
                  setFile={setFile}
                  url={url}
                  setUrl={setUrl}
                  prompts={prompts}
                  selectedPrompt={selectedPrompt}
                  setSelectedPrompt={setSelectedPrompt}
                  fileInputRef={fileInputRef}
                  isAnalyzing={isAnalyzing}
                  handleSubmit={handleSubmit}
                />
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full break-words">
                  <ResultViewer 
                    isFromHistory={isFromHistory}
                    isAnalyzing={isAnalyzing}
                    resultRef={resultRef}
                    result={result}
                    resultTab={resultTab}
                    setResultTab={setResultTab}
                    handleBackToInput={handleBackToInput}
                    handleCancel={handleCancel}
                    handleDownloadResult={handleDownloadResult}
                    documentOutline={documentOutline}
                  />
                </div>
              </div>
            )}
          </div>
        </main>
        
        {/* 右侧边栏 - 工具和辅助信息 */}
        {showResult && (
          <aside 
            className={`
              ${rightSidebarOpen ? 'md:w-56 lg:w-60 xl:w-64' : 'w-0 md:w-0'} 
              h-full md:static fixed right-0 top-16 bottom-0 z-30
              bg-gray-50 border-l border-gray-200 transition-all duration-300
              ${rightSidebarOpen && !leftSidebarOpen ? 'md:block' : ''}
              ${rightSidebarOpen && window.innerWidth < 768 ? 'w-full' : ''}
              flex-shrink-0
            `}
            style={{ 
              maxWidth: rightSidebarOpen && window.innerWidth < 768 ? '100%' : '16rem',
              display: rightSidebarOpen && window.innerWidth >= 768 ? 'block' : 'none'
            }}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="font-medium text-gray-700">辅助工具</h3>
              <button 
                onClick={toggleRightSidebar} 
                className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-200"
                aria-label="关闭右侧栏"
              >
                <FaChevronRight size={16} />
              </button>
            </div>
            <div className="overflow-y-auto p-4" style={{ height: 'calc(100% - 3rem)' }}>
              {/* 工具卡片 */}
              <div className="space-y-4">
                {/* 提示词模板卡片 */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-3">使用的分析模板</h4>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
                    {selectedPrompt && prompts[selectedPrompt] ? (
                      <>
                        <div className="font-medium truncate" title={selectedPrompt}>{selectedPrompt}</div>
                        <div className="mt-1 text-xs line-clamp-3" title={prompts[selectedPrompt]}>{prompts[selectedPrompt]}</div>
                      </>
                    ) : (
                      <p>未选择模板</p>
                    )}
                  </div>
                </div>
                
                {/* 文档信息卡片 */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-3">文档信息</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">类型:</dt>
                      <dd className="text-gray-800">{activeTab === 'upload' ? '本地PDF' : 'arXiv链接'}</dd>
                    </div>
                    {url && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">链接:</dt>
                        <dd className="text-gray-800 truncate max-w-[120px]" title={url}>{url}</dd>
                      </div>
                    )}
                    {file && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">文件:</dt>
                        <dd className="text-gray-800 truncate max-w-[120px]" title={file.name}>{file.name}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-gray-500">分析时间:</dt>
                      <dd className="text-gray-800 truncate">{new Date().toLocaleString()}</dd>
                    </div>
                  </dl>
                </div>
                
                {/* 快捷操作卡片 */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-3">快捷操作</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={handleDownloadResult}
                      disabled={!result || isAnalyzing}
                      className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaDownload className="mr-2" /> 下载Markdown
                    </button>
                    <button 
                      onClick={() => setResultTab(resultTab === 'preview' ? 'markdown' : 'preview')}
                      disabled={!result || isAnalyzing}
                      className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resultTab === 'preview' ? '查看源码' : '查看预览'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
        
        {/* 收起/展开右侧边栏的按钮 */}
        {showResult && !rightSidebarOpen && (
          <button 
            onClick={toggleRightSidebar}
            className="fixed right-0 top-20 z-30 bg-white shadow-md p-2 rounded-l-md border border-gray-200"
            aria-label="展开工具"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage; 