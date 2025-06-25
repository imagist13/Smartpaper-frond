import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';

const ResultViewer = ({
  isFromHistory,
  isAnalyzing,
  resultRef,
  result,
  resultTab,
  setResultTab,
  documentOutline
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col"
    >
      {/* 自定义CSS，优先处理溢出问题 */}
      <style jsx global>{`
        /* 处理长文本和表格溢出 */
        .markdown-custom {
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
          hyphens: auto;
        }
        
        /* 表格处理 */
        .markdown-custom table {
          display: block;
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          border-collapse: collapse;
        }
        
        .markdown-custom table th,
        .markdown-custom table td {
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          min-width: 80px;
          max-width: 300px;
          word-break: break-word;
        }
        
        /* 链接处理 */
        .markdown-custom a {
          word-break: break-all;
          color: #4f46e5;
        }
        
        /* 代码块处理 */
        .markdown-custom pre {
          max-width: 100%;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-word;
        }
        
        .markdown-custom code {
          white-space: pre-wrap;
          word-break: break-all;
        }
        
        /* 标题处理 */
        .markdown-custom h1, 
        .markdown-custom h2, 
        .markdown-custom h3, 
        .markdown-custom h4, 
        .markdown-custom h5, 
        .markdown-custom h6 {
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
          max-width: 100%;
        }
        
        /* 段落处理 */
        .markdown-custom p {
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
        }
        
        /* 列表处理 */
        .markdown-custom ul,
        .markdown-custom ol {
          padding-left: 1.5rem;
          max-width: 100%;
        }
        
        /* 引用处理 */
        .markdown-custom blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          max-width: 100%;
        }
        
        /* 图片处理 */
        .markdown-custom img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
      
      {/* 结果内容区域 */}
      <Tabs defaultValue="preview" className="w-full h-full flex flex-col" value={resultTab} onValueChange={setResultTab}>
        <div className="border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="px-3 sm:px-6 py-2 flex items-center">
            <TabsList className="grid w-[180px] sm:w-[220px] grid-cols-2">
              <TabsTrigger value="preview" className="text-sm sm:text-base">预览</TabsTrigger>
              <TabsTrigger value="markdown" className="text-sm sm:text-base">源码</TabsTrigger>
            </TabsList>
            
            <div className="ml-4 text-xs text-gray-500 hidden sm:block">
              {result ? `分析结果 · ${new Date().toLocaleDateString()}` : ''}
            </div>
          </div>
        </div>
        
        <TabsContent value="preview" className="p-0 m-0 flex-grow overflow-hidden">
          <div 
            ref={resultRef}
            className="markdown-custom h-full overflow-y-auto px-3 sm:px-6 py-4 bg-white"
          >
            {isAnalyzing && !result && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FaSpinner className="animate-spin text-2xl sm:text-4xl mb-2 sm:mb-4 text-indigo-500" />
                <p className="text-base sm:text-lg">正在分析论文，请稍候...</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">分析时间取决于论文长度和复杂度</p>
              </div>
            )}
            
            {!isAnalyzing && !result && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>分析结果将显示在这里</p>
              </div>
            )}
            
            {result && (
              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeSanitize, rehypeRaw, rehypeKatex]}
                  className="prose-indigo"
                  components={{
                    // 为标题添加ID，以支持导航
                    h1: ({node, ...props}) => (
                      <h1 id={`heading-${props.index}`} className="text-xl sm:text-2xl border-b pb-2 border-gray-200 text-indigo-900" {...props} />
                    ),
                    h2: ({node, ...props}) => (
                      <h2 id={`heading-${props.index}`} className="text-lg sm:text-xl mt-6 mb-4 text-indigo-900" {...props} />
                    ),
                    h3: ({node, ...props}) => (
                      <h3 id={`heading-${props.index}`} className="text-base sm:text-lg mt-5 mb-3 text-indigo-900" {...props} />
                    ),
                    h4: ({node, ...props}) => (
                      <h4 id={`heading-${props.index}`} className="text-sm sm:text-base mt-4 mb-2 text-indigo-900" {...props} />
                    ),
                    h5: ({node, ...props}) => (
                      <h5 id={`heading-${props.index}`} className="text-xs sm:text-sm mt-3 mb-2 text-indigo-900" {...props} />
                    ),
                    h6: ({node, ...props}) => (
                      <h6 id={`heading-${props.index}`} className="text-xs mt-3 mb-2 text-indigo-900" {...props} />
                    ),
                    
                    // 表格组件
                    table: ({node, ...props}) => (
                      <div className="overflow-x-auto my-4 border border-gray-200 rounded">
                        <table className="min-w-full divide-y divide-gray-200" {...props} />
                      </div>
                    ),
                    thead: ({node, ...props}) => (
                      <thead className="bg-gray-50" {...props} />
                    ),
                    th: ({node, ...props}) => (
                      <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
                    ),
                    td: ({node, ...props}) => (
                      <td className="px-3 py-2 text-sm text-gray-500 break-words" {...props} />
                    ),
                    
                    // 链接
                    a: ({node, href, ...props}) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                        {...props} 
                      />
                    ),
                    
                    // 图片
                    img: ({node, ...props}) => (
                      <div className="flex justify-center my-4">
                        <img
                          {...props}
                          className="max-w-full h-auto rounded-md"
                          style={{ maxHeight: '60vh' }}
                          loading="lazy"
                        />
                      </div>
                    ),
                    
                    // 代码块
                    pre: ({node, ...props}) => (
                      <div className="overflow-x-auto rounded-md bg-gray-50 border border-gray-200">
                        <pre 
                          {...props} 
                          className="p-3 sm:p-4 text-xs sm:text-sm" 
                          style={{ overflow: 'auto', maxHeight: '400px' }}
                        />
                      </div>
                    ),
                    code: ({node, inline, className, children, ...props}) => {
                      return inline ? (
                        <code className="bg-indigo-50 text-indigo-800 px-1 py-0.5 rounded text-xs sm:text-sm break-all" {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className={`${className || ''} block`} {...props}>
                          {children}
                        </code>
                      );
                    },
                    
                    // 段落和列表
                    p: ({node, ...props}) => (
                      <p className="my-2 sm:my-4 text-sm sm:text-base text-gray-800" {...props} />
                    ),
                    ul: ({node, ...props}) => (
                      <ul className="my-2 sm:my-4 pl-5 list-disc" {...props} />
                    ),
                    ol: ({node, ...props}) => (
                      <ol className="my-2 sm:my-4 pl-5 list-decimal" {...props} />
                    ),
                    li: ({node, ...props}) => (
                      <li className="my-1 sm:my-2 text-sm sm:text-base" {...props} />
                    ),
                    
                    // 引用
                    blockquote: ({node, ...props}) => (
                      <blockquote className="border-l-4 border-indigo-200 pl-4 my-4 py-2 bg-indigo-50 text-gray-700 italic rounded-r" {...props} />
                    ),
                    
                    // 强调
                    strong: ({node, ...props}) => (
                      <strong className="font-semibold text-indigo-700" {...props} />
                    ),
                    em: ({node, ...props}) => (
                      <em className="text-gray-800 italic" {...props} />
                    ),
                  }}
                >
                  {result}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="markdown" className="p-0 m-0 flex-grow overflow-hidden">
          <div className="h-full overflow-y-auto bg-gray-50">
            <pre 
              className="h-full p-3 sm:p-6 text-xs sm:text-sm font-mono text-gray-800"
              style={{ 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word', 
                overflowWrap: 'break-word',
                maxWidth: '100%'
              }}
            >
              {result || '# 分析结果将以Markdown格式显示在这里'}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
      
      {isAnalyzing && (
        <div className="px-4 sm:px-8 py-3 sm:py-4 bg-indigo-50 border-t border-indigo-100 flex-shrink-0">
          <div className="flex items-center">
            <FaSpinner className="animate-spin text-indigo-500 mr-2" />
            <span className="text-indigo-700 text-sm sm:text-base">正在生成分析结果，实时更新中...</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResultViewer; 