import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import { useToast } from '../components/ui/use-toast';
import { useLocation } from 'react-router-dom';

// 组件
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const API_BASE_URL = 'http://localhost:8000';

const AnalyzePage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const historyItem = location.state?.historyItem;
  
  const [url, setUrl] = useState('');
  const [prompts, setPrompts] = useState({});
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [clientId] = useState(uuidv4());
  const [socket, setSocket] = useState(null);
  const resultRef = useRef(null);
  const [isFromHistory, setIsFromHistory] = useState(false);

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
        toast({
          variant: 'destructive',
          title: '获取提示词模板失败',
          description: error.message,
        });
      }
    };

    fetchPrompts();
  }, [toast]);

  // 如果从历史记录页面跳转过来，加载历史记录内容
  useEffect(() => {
    if (historyItem) {
      const loadHistoryItem = async () => {
        setIsLoading(true);
        try {
          // 设置URL和提示词模板
          setUrl(historyItem.url);
          setSelectedPrompt(historyItem.promptName);
          setIsFromHistory(true);
          
          // 获取历史记录内容
          const response = await axios.get(`${API_BASE_URL}/history/${historyItem.id}`);
          setResult(response.data);
          
          toast({
            title: '已加载历史记录',
            description: `已加载"${historyItem.title}"的分析结果`,
          });
        } catch (error) {
          toast({
            variant: 'destructive',
            title: '加载历史记录失败',
            description: error.message || '请稍后重试',
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      loadHistoryItem();
    }
  }, [historyItem, toast]);

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        variant: 'destructive',
        title: '请输入论文URL',
        description: '请提供有效的论文URL地址',
      });
      return;
    }

    if (!selectedPrompt) {
      toast({
        variant: 'destructive',
        title: '请选择提示词模板',
        description: '请从列表中选择一个提示词模板',
      });
      return;
    }

    // 清除之前的历史状态
    setIsFromHistory(false);
    setResult('');
    setIsLoading(true);

    try {
      // 创建WebSocket连接
      const ws = new WebSocket(`ws://localhost:8000/ws/analyze/${clientId}`);
      setSocket(ws);

      ws.onopen = () => {
        // 发送分析请求
        ws.send(JSON.stringify({
          url: url,
          prompt_name: selectedPrompt,
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'chunk') {
          setResult(prev => prev + data.content);
          scrollToBottom();
        } else if (data.type === 'final') {
          if (data.success) {
            toast({
              title: '分析完成',
              description: '论文分析已完成',
            });
          }
          setIsLoading(false);
          ws.close();
        } else if (data.type === 'error') {
          toast({
            variant: 'destructive',
            title: '分析失败',
            description: data.message,
          });
          setIsLoading(false);
          ws.close();
        }
      };

      ws.onerror = (error) => {
        toast({
          variant: 'destructive',
          title: '连接错误',
          description: '与服务器连接失败，请稍后重试',
        });
        setIsLoading(false);
      };

      ws.onclose = () => {
        setSocket(null);
      };

    } catch (error) {
      toast({
        variant: 'destructive',
        title: '分析失败',
        description: error.message,
      });
      setIsLoading(false);
    }
  };

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
    setIsLoading(false);
  };

  // 清除当前结果，开始新分析
  const handleStartNewAnalysis = () => {
    setIsFromHistory(false);
    setResult('');
  };

  return (
    <div className="flex flex-col space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">论文分析</h1>
        
        {isFromHistory && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-blue-800">已加载历史记录</p>
                <p className="text-sm text-blue-600">使用模板: {selectedPrompt}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleStartNewAnalysis}
                className="text-blue-600 hover:text-blue-800"
              >
                开始新分析
              </Button>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">论文URL</Label>
            <Input
              id="url"
              type="text"
              placeholder="输入arXiv或其他论文URL (例如: https://arxiv.org/pdf/2305.12002)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading || isFromHistory}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prompt">分析模板</Label>
            <Select
              value={selectedPrompt}
              onValueChange={setSelectedPrompt}
              disabled={isLoading || Object.keys(prompts).length === 0 || isFromHistory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="选择分析模板" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(prompts).map(([key, description]) => (
                  <SelectItem key={key} value={key}>
                    {key} - {description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-4">
            {isLoading ? (
              <Button type="button" variant="destructive" onClick={handleCancel}>
                取消分析
              </Button>
            ) : !isFromHistory ? (
              <Button type="submit" disabled={isLoading || !url || !selectedPrompt}>
                开始分析
              </Button>
            ) : null}
          </div>
        </form>
      </section>
      
      <section className="border rounded-lg p-4 bg-white min-h-[500px]">
        <Tabs defaultValue="preview">
          <TabsList className="mb-4">
            <TabsTrigger value="preview">预览</TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="h-[500px]">
            <div 
              ref={resultRef}
              className="prose prose-sm max-w-none h-full overflow-y-auto px-4 py-2 bg-white rounded border"
            >
              {isLoading && !result && (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>正在分析论文，请稍候...</p>
                  <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}
              
              {!isLoading && !result && (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>分析结果将显示在这里</p>
                </div>
              )}
              
              {result && (
                <ReactMarkdown 
                  rehypePlugins={[rehypeSanitize, rehypeRaw]}
                >
                  {result}
                </ReactMarkdown>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="markdown" className="h-[500px]">
            <div className="relative h-full">
              <pre className="h-full overflow-y-auto p-4 bg-gray-100 rounded border font-mono text-sm">
                {result || '# 分析结果将以Markdown格式显示在这里'}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default AnalyzePage; 