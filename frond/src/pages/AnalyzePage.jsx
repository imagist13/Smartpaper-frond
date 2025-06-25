import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
  
  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* 顶部区域 - 标题和描述 */}
      <AnalyzeHeader />
      
      {/* 主要内容区域 */}
      <div className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-5xl mx-auto">
            <ErrorMessage error={error} />
            
            {!showResult ? (
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
            ) : (
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
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage; 