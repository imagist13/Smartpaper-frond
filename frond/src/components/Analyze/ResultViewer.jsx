import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaFileDownload, FaArrowLeft, FaTimes } from 'react-icons/fa';
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
  handleBackToInput,
  handleCancel,
  handleDownloadResult
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 shadow-sm w-full"
    >
      {/* 结果页面顶部导航 */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center">
          <button 
            onClick={handleBackToInput}
            className="mr-4 p-2 hover:bg-gray-100 rounded transition-colors"
            title="返回"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {isFromHistory ? '历史分析结果' : '分析结果'}
          </h2>
          
          {isAnalyzing && (
            <div className="ml-4 flex items-center text-indigo-600">
              <FaSpinner className="animate-spin mr-2" />
              <span className="text-sm font-medium">实时生成中...</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {isAnalyzing ? (
            <button 
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center"
            >
              <FaTimes className="mr-2" /> 取消分析
            </button>
          ) : result && (
            <button 
              onClick={handleDownloadResult}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors flex items-center"
            >
              <FaFileDownload className="mr-2" /> 下载结果
            </button>
          )}
        </div>
      </div>
      
      {/* 结果内容区域 */}
      <Tabs defaultValue="preview" className="w-full" value={resultTab} onValueChange={setResultTab}>
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="px-6 py-2">
            <TabsList className="grid w-[220px] grid-cols-2">
              <TabsTrigger value="preview" className="text-base">预览</TabsTrigger>
              <TabsTrigger value="markdown" className="text-base">Markdown</TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="preview" className="p-0 m-0">
          <div 
            ref={resultRef}
            className="prose prose-indigo max-w-none h-[calc(100vh-250px)] overflow-y-auto px-8 py-6 bg-white"
          >
            {isAnalyzing && !result && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FaSpinner className="animate-spin text-4xl mb-4 text-indigo-500" />
                <p className="text-lg">正在分析论文，请稍候...</p>
                <p className="text-sm text-gray-400 mt-2">分析时间取决于论文长度和复杂度</p>
              </div>
            )}
            
            {!isAnalyzing && !result && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>分析结果将显示在这里</p>
              </div>
            )}
            
            {result && (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeSanitize, rehypeRaw, rehypeKatex]}
                className="prose-headings:text-indigo-900 prose-h1:border-b prose-h1:pb-2 prose-h1:border-gray-200 prose-a:text-blue-600 prose-strong:text-indigo-700 prose-code:text-indigo-800 prose-code:bg-indigo-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-li:my-1"
              >
                {result}
              </ReactMarkdown>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="markdown" className="p-0 m-0">
          <div className="relative h-[calc(100vh-250px)]">
            <pre className="h-full overflow-y-auto p-8 bg-gray-50 font-mono text-sm">
              {result || '# 分析结果将以Markdown格式显示在这里'}
            </pre>
            {result && (
              <button
                onClick={handleDownloadResult}
                className="absolute top-4 right-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors flex items-center"
              >
                <FaFileDownload className="mr-2" /> 下载
              </button>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {isAnalyzing && (
        <div className="px-8 py-4 bg-indigo-50 border-t border-indigo-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaSpinner className="animate-spin text-indigo-500 mr-2" />
              <span className="text-indigo-700">正在生成分析结果，实时更新中...</span>
            </div>
            <div>
              <button
                onClick={handleCancel}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResultViewer; 