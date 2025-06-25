import React from "react";
import AnalysisResult from "../../assets/analysis/result.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCode, FaRobot, FaChevronDown } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-12 sm:py-20">
      {/* 背景效果 - 更现代的梯度效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-300 rounded-full opacity-20 blur-[100px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* 文本内容 - 更简洁现代的排版 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl lg:max-w-2xl"
          >
            <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-100 bg-white/80 backdrop-blur-sm shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2"></span>
              <span className="text-xs font-medium text-indigo-800">用AI重新定义论文阅读体验</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                论文智能解析
              </span>
              <br />
              <span>更高效、更直观</span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              告别繁琐的论文阅读过程，只需上传论文或输入URL，即可获得结构化的分析结果，
              <span className="text-indigo-700 font-medium">节省80%的阅读时间</span>。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/analyze">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg hover:shadow-indigo-400/20 transition-all duration-300 flex items-center gap-2"
                >
                  <FaRobot className="text-sm" />
                  <span>开始分析</span>
                  <FaArrowRight className="ml-2 text-xs" />
                </motion.button>
              </Link>
              
              <Link to="/history">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 ring-1 ring-gray-200 hover:ring-indigo-200 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaCode className="text-sm" />
                  <span>查看历史</span>
                </motion.button>
              </Link>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">已被全球学术机构广泛采用</p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </motion.div>
          
          {/* 增强静态图片效果 - 使用分析结果图片 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-xl"
          >
            <div className="relative">
              {/* 玻璃效果卡片 */}
              <motion.div 
                className="absolute -top-10 -left-10 z-10 p-4 bg-white/70 backdrop-blur-lg rounded-lg shadow-xl border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    <FaRobot />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">智能分析中</p>
                    <p className="text-sm font-medium">提取关键结论...</p>
                  </div>
                </div>
              </motion.div>
              
              {/* 分析结果图片容器 */}
              <div className="relative bg-gradient-to-r p-2 from-indigo-200 to-purple-200 rounded-xl shadow-2xl overflow-hidden">
                {/* 模拟浏览器窗口 */}
                <div className="bg-white rounded-lg overflow-hidden group">
                  {/* 浏览器标题栏 */}
                  <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4">
                    <div className="flex space-x-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 h-5 bg-white rounded-full px-4 flex items-center text-xs text-gray-500 overflow-hidden">
                      smartpaper.ai/analyze/result
                    </div>
                  </div>
                  
                  {/* 分析结果图片 */}
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <img
                      src={AnalysisResult}
                      alt="论文分析结果示例"
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                  
                  {/* 动态元素覆盖 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* 标注 */}
                <div className="absolute top-1/4 -right-3 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg shadow-lg">
                  <span className="text-xs text-green-800 font-medium">论文结构解析</span>
                </div>
                
                <div className="absolute bottom-1/4 -left-3 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg shadow-lg">
                  <span className="text-xs text-indigo-800 font-medium">关键发现提取</span>
                </div>
              </div>
              
              {/* 浮动徽章 */}
              <motion.div 
                className="absolute -bottom-5 -right-5 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-xl text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="text-xs">AI分析速度</div>
                <div className="text-lg font-bold">提升10倍</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* 滚动指示器 */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 bottom-4"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-xs text-gray-400 mb-1">向下滚动了解更多</span>
            <FaChevronDown className="text-gray-400" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
