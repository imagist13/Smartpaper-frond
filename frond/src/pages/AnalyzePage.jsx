import React, { useRef, useState, useEffect } from 'react';
import { FaUpload, FaLink, FaFileAlt, FaChevronDown, FaChevronUp, FaDownload, FaShareAlt, FaBookmark, FaPrint } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { useLocation, useNavigate } from 'react-router-dom';
import AnalyzeHeader from '../components/Analyze/AnalyzeHeader';
import InputForm from '../components/Analyze/InputForm';
import DocumentOutline from '../components/Analyze/DocumentOutline';
import PaperMetadata from '../components/Analyze/PaperMetadata';
import MarkdownRenderer from '../components/Analyze/MarkdownRenderer';
import { toast } from '../components/ui/use-toast';
import { motion } from 'framer-motion';
import { getPrompts, uploadPdfFile, createAnalysisWebSocket, getHistoryItem } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

// 示例分析结果文本 - 用于模拟流式输出
const EXAMPLE_RESULT = `# 深度学习在自然语言处理中的应用

## 论文信息

- **标题**: 深度学习在自然语言处理中的应用
- **作者**: John Doe, Jane Smith
- **发表日期**: 2023-05-15
- **DOI**: 10.1234/example.5678
- **期刊**: Journal of AI Research
- **关键词**: 深度学习, 自然语言处理, 神经网络, 机器翻译

## 摘要

本文综述了深度学习技术在自然语言处理领域的最新进展。随着计算能力的提升和大型语料库的可用性增加，深度学习模型已经成为NLP任务的主流方法。我们探讨了Transformer架构的发展、预训练语言模型的进步以及它们在各种NLP任务中的应用。实验结果表明，这些方法显著提高了机器翻译、文本分类和问答系统的性能。

## 研究背景

自然语言处理(NLP)一直是人工智能研究的核心领域之一。过去几年，随着深度学习技术的快速发展，NLP任务的性能得到了前所未有的提升。特别是，注意力机制和Transformer架构的引入彻底改变了这一领域。

这项研究的主要动机是系统地回顾深度学习方法如何改进传统NLP任务，并探索未来的研究方向。我们特别关注预训练语言模型如BERT、GPT和T5的进步，这些模型已经成为许多NLP系统的核心组件。

## 主要方法

本研究采用了综合文献回顾的方法，分析了2017年至2023年发表的超过200篇关于深度学习在NLP中应用的论文。我们特别关注以下技术的发展：

### Transformer架构

Transformer架构通过使用自注意力机制处理序列数据，已成为大多数现代NLP模型的基础。我们分析了它的各种变体，包括：

1. 原始Transformer (Vaswani et al., 2017)
2. BERT的双向编码器 (Devlin et al., 2019)
3. GPT系列的自回归解码器 (Radford et al., 2019)
4. T5的编码器-解码器框架 (Raffel et al., 2020)

### 预训练与微调范式

预训练-微调范式已成为NLP的主导方法。主要步骤包括：

1. 在大规模无标签文本语料库上进行自监督预训练
2. 在特定任务的标记数据上进行微调
3. 使用适配器或提示学习等参数高效方法

### 多模态融合

结合文本与其他模态（如图像、视频、音频）的多模态方法正在兴起。我们分析了：

1. CLIP(文本-图像)
2. Whisper(文本-音频)
3. VideoBERT(文本-视频)

## 实验结果

我们汇总了深度学习模型在各种NLP基准测试中的性能：

| 任务 | 最佳模型 | 准确率 | 相比传统方法提升 |
|-------|-------|-------|-----|
| 机器翻译 | T5-XXL | 45.6 BLEU | +8.3 |
| 问答系统 | PaLM | 89.2% F1 | +12.7% |
| 文本分类 | DeBERTa-v3 | 96.8% | +5.4% |
| 命名实体识别 | LUKE | 94.3% F1 | +4.8% |

## 主要贡献

本研究的主要贡献包括：

1. 全面回顾了深度学习在NLP中的应用及其历史发展
2. 确定了当前研究中的主要趋势和突破
3. 讨论了当前方法的局限性和面临的挑战
4. 提出了未来研究的有前景的方向

## 结论与未来工作

我们的分析表明，深度学习方法，特别是基于Transformer的预训练模型，已经彻底改变了NLP领域。然而，这些模型仍然面临着计算效率、可解释性和数据偏见等挑战。

未来工作应该关注：

1. 开发更高效的预训练和推理方法
2. 提高模型的可解释性和透明度
3. 解决数据偏见和公平性问题
4. 探索新兴领域如多语言NLP和低资源语言处理

## 参考文献

1. Vaswani, A., Shazeer, N., Parmar, N., et al. (2017). "Attention is all you need". In Advances in Neural Information Processing Systems.
2. Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K. (2019). "BERT: Pre-training of deep bidirectional transformers for language understanding". In NAACL-HLT.
3. Radford, A., Wu, J., Child, R., et al. (2019). "Language models are unsupervised multitask learners". OpenAI Blog.
4. Raffel, C., Shazeer, N., Roberts, A., et al. (2020). "Exploring the limits of transfer learning with a unified text-to-text transformer". Journal of Machine Learning Research.
5. Brown, T., Mann, B., Ryder, N., et al. (2020). "Language models are few-shot learners". In Advances in Neural Information Processing Systems.`;

const AnalyzePage = () => {
  // 路由相关
  const location = useLocation();
  const navigate = useNavigate();
  const historyItem = location.state?.historyItem;
  
  // 基础状态
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const fileInputRef = useRef(null);
  
  // 分析状态
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [result, setResult] = useState('');
  const [showInput, setShowInput] = useState(true);
  
  // 导航状态
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [currentTab, setCurrentTab] = useState('summary');
  const [documentOutline, setDocumentOutline] = useState([]);
  
  // 分析提示词模板
  const [prompts, setPrompts] = useState([
    { id: 'coolpapaers', name: '标准分析' },
    { id: 'summary', name: '简明总结' },
    { id: 'yuanbao', name: '详细解读' }
  ]);
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);
  
  // WebSocket 客户端ID
  const [clientId] = useState(uuidv4());
  const wsRef = useRef(null);

  // 如果从历史记录页面跳转来，直接显示结果
  useEffect(() => {
    const loadHistoryItem = async () => {
      if (historyItem) {
        setShowInput(false);
        setIsAnalyzing(true);
        
        try {
          // 获取历史记录内容
          const content = await getHistoryItem(historyItem.id);
          setResult(content);
          
          // 如果有历史记录的prompt信息，设置为当前的prompt
          if (historyItem.promptName) {
            const matchedPrompt = prompts.find(p => p.id === historyItem.promptName);
            if (matchedPrompt) {
              setSelectedPrompt(matchedPrompt);
            }
          }
          
          // 如果有URL，设置URL
          if (historyItem.url) {
            setUrl(historyItem.url);
          }
          
        } catch (error) {
          console.error('加载历史记录失败:', error);
          toast({
            title: "加载失败",
            description: "无法加载历史记录，请返回重试",
            variant: "destructive",
          });
        } finally {
          setIsAnalyzing(false);
        }
      }
    };
    
    loadHistoryItem();
  }, [historyItem]);

  // 获取提示词模板
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await getPrompts();
        if (response && response.prompts) {
          // 转换提示词对象为数组格式
          const promptsArray = Object.entries(response.prompts).map(([id, name]) => ({
            id,
            name
          }));
          
          if (promptsArray.length > 0) {
            setPrompts(promptsArray);
            setSelectedPrompt(promptsArray[0]);
          }
        }
      } catch (error) {
        console.error('获取提示词模板失败:', error);
        toast({
          title: "加载失败",
          description: "无法获取分析模板，请检查服务器连接",
          variant: "destructive",
        });
      }
    };
    
    fetchPrompts();
  }, []);

  // 当有结果时解析文档大纲
  useEffect(() => {
    if (result) {
      // 从markdown提取标题作为大纲
      const headings = result.match(/#{1,6}\s+.+/g) || [];
      const parsedOutline = headings.map((heading, index) => {
        const level = heading.match(/^#+/)[0].length;
        const title = heading.replace(/^#+\s+/, '');
        return { id: `heading-${index}`, level, title };
      });
      
      setDocumentOutline(parsedOutline);
    }
  }, [result]);

  // 处理WebSocket消息接收
  const handleWebSocketMessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      
      // 处理分析结果消息
      if (data.type === 'chunk') {
        setResult((prevResult) => prevResult + data.content);
      } 
      // 处理完成消息
      else if (data.type === 'final') {
        setIsStreaming(false);
        setIsAnalyzing(false);
        toast({
          title: "分析完成",
          description: "论文解析已完成，您可以查看分析结果"
        });
      } 
      // 处理错误消息
      else if (data.type === 'error') {
        setIsStreaming(false);
        setIsAnalyzing(false);
        toast({
          title: "分析失败",
          description: data.message || "论文分析过程中出现错误",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('处理WebSocket消息失败:', error);
    }
  };

  // 提交处理函数
  const handleSubmit = async (submittedTab) => {
    if ((submittedTab === 'upload' && !file) || (submittedTab === 'url' && !url)) {
      toast({
        title: "错误",
        description: submittedTab === 'upload' ? "请上传PDF文件" : "请输入有效的arXiv链接",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setIsStreaming(true);
    setResult('');
    setShowInput(false);
    
    try {
      // 创建WebSocket连接
      const isFileUpload = submittedTab === 'upload';
      const socket = createAnalysisWebSocket(clientId, isFileUpload);
      wsRef.current = socket;
      
      // 设置WebSocket事件处理程序
      socket.onopen = async () => {
        if (isFileUpload) {
          // 文件上传采用REST API
          try {
            await uploadPdfFile(file, selectedPrompt.id, clientId);
            // 文件上传后，WebSocket会自动接收分析结果
          } catch (uploadError) {
            console.error('文件上传失败:', uploadError);
            setIsStreaming(false);
            setIsAnalyzing(false);
            setShowInput(true);
            toast({
              title: "上传失败",
              description: "PDF文件上传失败，请重试",
              variant: "destructive",
            });
          }
        } else {
          // URL分析直接通过WebSocket发送请求
          const request = JSON.stringify({
            url: url,
            prompt_name: selectedPrompt.id
          });
          socket.send(request);
        }
      };
      
      socket.onmessage = handleWebSocketMessage;
      
      socket.onerror = (error) => {
        console.error('WebSocket错误:', error);
        setIsStreaming(false);
        setIsAnalyzing(false);
        toast({
          title: "连接错误",
          description: "服务器连接失败，请稍后重试",
          variant: "destructive",
        });
      };
      
      socket.onclose = () => {
        // 连接关闭，但不一定是错误
        console.log('WebSocket连接已关闭');
      };
      
    } catch (error) {
      console.error('创建WebSocket连接失败:', error);
      setIsStreaming(false);
      setIsAnalyzing(false);
      setShowInput(true);
      toast({
        title: "连接错误",
        description: "无法连接到服务器，请检查网络连接",
        variant: "destructive",
      });
    }
  };
  
  // 关闭WebSocket连接
  useEffect(() => {
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, []);
  
  // 重置分析，返回输入界面
  const handleReset = () => {
    setShowInput(true);
    setFile(null);
    setUrl('');
    setResult('');
    
    // 如果是从历史记录页面来的，返回历史记录页面
    if (historyItem) {
      navigate('/history');
    }
  };

  // 下载分析结果
  const handleDownload = () => {
    if (!result) return;
    
    const element = document.createElement("a");
    const file = new Blob([result], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `分析结果_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "下载成功",
      description: "分析结果已保存为Markdown文件",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 输入表单页面 */}
      {showInput ? (
        <div className="flex-1">
          <AnalyzeHeader />
          <div className="container mx-auto px-4 py-8">
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
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          {/* 固定顶部导航栏 */}
          <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button 
                      onClick={() => setShowLeftSidebar(!showLeftSidebar)}
                      className="p-2 rounded-md hover:bg-gray-100"
                      aria-label="切换左侧边栏"
                    >
                      {showLeftSidebar ? (
                        <FaChevronUp className="text-gray-600" />
                      ) : (
                        <FaChevronDown className="text-gray-600" />
                      )}
                    </button>
                  </div>
                  
                  <h1 className="text-lg font-medium text-gray-900 truncate max-w-md">
                    {file ? file.name : url ? (() => {
                      try {
                        return new URL(url).pathname.split('/').pop();
                      } catch (e) {
                        return url;
                      }
                    })() : "论文分析结果"}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleDownload}
                    className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
                      isStreaming || isAnalyzing 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    disabled={isStreaming || isAnalyzing}
                  >
                    <FaDownload className="mr-1.5" /> 
                    <span className="hidden sm:inline">下载</span>
                  </button>
                  
                  <button 
                    onClick={() => toast({ title: "分享", description: "分享功能正在开发中" })}
                    className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <FaShareAlt className="mr-1.5" /> 
                    <span className="hidden sm:inline">分享</span>
                  </button>
                  
                  <button 
                    onClick={() => toast({ title: "收藏", description: "收藏功能正在开发中" })}
                    className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <FaBookmark className="mr-1.5" /> 
                    <span className="hidden sm:inline">收藏</span>
                  </button>
                  
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    <FaPrint className="mr-1.5" /> 
                    <span className="hidden sm:inline">打印</span>
                  </button>
                  
                  <button 
                    onClick={handleReset}
                    className="ml-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md"
                  >
                    新的分析
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 主要内容区 - 三栏布局 */}
          <div className="flex flex-1">
            {/* 左侧边栏 - 文档导航 */}
            {showLeftSidebar && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "280px", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="w-[280px] border-r border-gray-200 bg-white overflow-y-auto"
              >
                <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-4 py-3">
                  <h2 className="font-medium text-gray-800">文档导航</h2>
                </div>
                
                <div className="p-4">
                  {/* 文档元数据 */}
                  <div className="mb-6">
                    <PaperMetadata result={result} />
                  </div>
                  
                  {/* 文档大纲 */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">目录</h3>
                    <DocumentOutline outlineItems={documentOutline} />
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* 中央内容区 */}
            <div className={`flex-1 ${!showLeftSidebar && !showRightSidebar ? 'max-w-6xl mx-auto' : ''}`}>
              {isAnalyzing && !isStreaming ? (
                <div className="flex flex-col items-center justify-center h-full py-20">
                  <div className="w-16 h-16 mb-6 border-4 border-t-indigo-600 border-indigo-200 rounded-full animate-spin"></div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">正在分析论文...</h3>
                  <p className="text-gray-500">这可能需要几分钟，请耐心等待</p>
                </div>
              ) : (
                <div className="px-6 py-8">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200">
                      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                        <TabsList className="border-b border-gray-200 px-6">
                          <TabsTrigger value="summary">总览</TabsTrigger>
                          <TabsTrigger value="content">详细内容</TabsTrigger>
                          <TabsTrigger value="insights">关键洞见</TabsTrigger>
                          <TabsTrigger value="references">参考文献</TabsTrigger>
                        </TabsList>
                        
                        <div className="p-6 relative">
                          {/* 流式输出指示器 */}
                          {isStreaming && (
                            <div className="absolute right-6 top-6 flex items-center text-indigo-600">
                              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse mr-2"></div>
                              <span className="text-xs font-medium">AI正在生成...</span>
                            </div>
                          )}
                          
                          <TabsContent value="summary" className="mt-0">
                            <div className="prose-indigo max-w-none">
                              <MarkdownRenderer content={result} />
                              {isStreaming && (
                                <div className="inline-block w-1 h-5 ml-0.5 bg-indigo-600 animate-pulse"></div>
                              )}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="content" className="mt-0">
                            <div className="prose-indigo max-w-none">
                              <MarkdownRenderer content={result} />
                              {isStreaming && (
                                <div className="inline-block w-1 h-5 ml-0.5 bg-indigo-600 animate-pulse"></div>
                              )}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="insights" className="mt-0">
                            <div className="prose-indigo max-w-none">
                              <h2>关键洞见</h2>
                              <p>此功能正在开发中，敬请期待。</p>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="references" className="mt-0">
                            <div className="prose-indigo max-w-none">
                              <h2>参考文献</h2>
                              <ol>
                                <li>Vaswani, A., Shazeer, N., Parmar, N., et al. (2017). "Attention is all you need". In Advances in Neural Information Processing Systems.</li>
                                <li>Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K. (2019). "BERT: Pre-training of deep bidirectional transformers for language understanding". In NAACL-HLT.</li>
                                <li>Radford, A., Wu, J., Child, R., et al. (2019). "Language models are unsupervised multitask learners". OpenAI Blog.</li>
                                <li>Raffel, C., Shazeer, N., Roberts, A., et al. (2020). "Exploring the limits of transfer learning with a unified text-to-text transformer". Journal of Machine Learning Research.</li>
                              </ol>
                            </div>
                          </TabsContent>
                        </div>
                      </Tabs>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* 右侧边栏 - 工具和辅助信息 */}
            {showRightSidebar && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "320px", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="w-[320px] border-l border-gray-200 bg-white overflow-y-auto"
              >
                <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                  <h2 className="font-medium text-gray-800">工具与设置</h2>
                  <button 
                    onClick={() => setShowRightSidebar(false)}
                    className="p-1 rounded-md hover:bg-gray-200"
                  >
                    <FaChevronUp className="text-gray-600" />
                  </button>
                </div>
                
                <div className="p-4">
                  {/* 高亮设置 */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <IoMdSettings className="mr-1.5" /> 文档设置
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">字体大小</label>
                        <input type="range" className="w-full" min="80" max="120" defaultValue="100" />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">高亮显示</label>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">方法</button>
                          <button className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">结果</button>
                          <button className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">贡献</button>
                          <button className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800">结论</button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">布局选项</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">紧凑视图</button>
                          <button className="px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-800">阅读模式</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 笔记区域 */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">笔记</h3>
                    <textarea 
                      className="w-full h-48 p-3 border border-gray-300 rounded-md text-sm" 
                      placeholder="在这里添加您的研究笔记..."
                    />
                    <div className="mt-2 flex justify-end">
                      <button className="text-xs text-indigo-600 hover:text-indigo-800">保存笔记</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* 右侧边栏切换按钮（当右侧边栏隐藏时显示） */}
            {!showRightSidebar && (
              <button 
                onClick={() => setShowRightSidebar(true)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white shadow-md rounded-full border border-gray-200 hover:bg-gray-50"
              >
                <FaChevronDown className="text-gray-600" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzePage; 