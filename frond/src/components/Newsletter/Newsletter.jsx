import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { processPaperUrlStream } from "../../services/api.js";
// 导入图标
import { FiFileText, FiArrowRight, FiLoader } from "react-icons/fi";

const Newsletter = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [promptName, setPromptName] = useState('yuanbao');
  const [prompts, setPrompts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseContent('');

    try {
      const stream = await processPaperUrlStream(inputUrl, promptName);
      
      while (true) {
        const { done, content } = await stream.read();
        if (done) break;
        setResponseContent(prev => prev + content);
      }
    } catch (error) {
      console.error('流式输出失败:', error);
      setResponseContent('输出失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto space-y-5 py-16 flex flex-col justify-start pt-20 pb-20">
      <motion.h1
        variants={SlideUp(0.2)}
        initial="initial"
        whileInView="animate"
        className="text-3xl font-bold text-center"
      >
        SmartPaper
      </motion.h1>
      <motion.p
        variants={SlideUp(0.4)}
        initial="initial"
        whileInView="animate"
        className="max-w-[450px] mx-auto text-gray-500 text-sm text-center"
      >
        使用说明： 1. 输入arXiv论文URL 2. 选择合适的提示词模板 3. 点击"开始分析"按钮 4. 等待分析完成后可下载结果
      </motion.p>
      {/* form here */}
      <motion.div
        variants={SlideUp(0.6)}
        initial="initial"
        whileInView="animate"
        className="!mt-8"
      >
        <form onSubmit={handleSubmit} className="w-full max-w-[640px] mx-auto">
          <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white group">
            <div className="flex-grow">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="输入arXiv论文URL"
                className="w-full px-5 py-4 outline-none border-none text-gray-800"
                disabled={isLoading}
              />
              <div className="border-t border-gray-100">
                <select
                  value={promptName}
                  onChange={(e) => setPromptName(e.target.value)}
                  className="w-full px-5 py-3 outline-none border-none bg-white text-gray-700 rounded-md shadow-sm transition-all duration-300 cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-purple-200"
                  disabled={isLoading}
                >
                  <option value="yuanbao">元宝模板</option>
                  <option value="summary">摘要模板</option>
                  <option value="coolpapers">酷论文模板</option>
                  <option value="research">研究综述模板</option>
                  <option value="critique">批判性分析模板</option>
                  <option value="technical">技术解析模板</option>
                  <option value="custom">自定义模板</option>
                </select>
              </div>
            </div>
            <motion.button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-lg text-white px-10 py-4 text-base font-medium transition-all duration-300 flex items-center justify-center gap-2 rounded-b-xl"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? '分析中...' : '开始分析'}
              {!isLoading && <FiArrowRight className="ml-1" />}
            </motion.button>
          </div>
        </form>
      </motion.div>
      
      {/* 输出框移到表单下方，并支持Markdown渲染 */}
      {responseContent && (
        <motion.div
          variants={SlideUp(0.8)}
          initial="initial"
          whileInView="animate"
          className="mt-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm w-full max-w-[700px] mx-auto"
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              // 定义自定义组件来应用样式
              p: ({node, ...props}) => <p className="prose prose-sm max-w-none" {...props} />
            }}
          >
            {responseContent}
          </ReactMarkdown>
        </motion.div>
      )}
    </div>
  );
};

export default Newsletter;
