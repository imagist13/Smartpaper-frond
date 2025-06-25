import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBookReader, FaBrain, FaChartLine } from "react-icons/fa";
import AnalysisResult from "../../assets/analysis/analysis_result1.svg";

const Banner = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Modern gradient background with mesh pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900 opacity-95"></div>
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0V0zm20 20c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundSize: "30px 30px"
      }}></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500/10 to-transparent"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 bg-white rounded-full opacity-10"
            initial={{ 
              x: Math.random() * 100 - 50, 
              y: Math.random() * 100, 
              scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
              x: Math.random() * 100 - 50,
              y: Math.random() * 100,
              scale: Math.random() * 0.5 + 0.5,
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10 + Math.random() * 10, 
              ease: "easeInOut" 
            }}
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(40px)"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-white/90 shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2.5 animate-pulse"></div>
              <span className="text-sm font-medium">AI驱动·高效阅读</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
              让论文阅读变得<br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">
                简单而高效
              </span>
            </h2>
            
            <div className="text-lg text-indigo-100/90 mb-8 max-w-lg">
              <p>使用先进AI技术自动提取论文精华，节省大量阅读时间，让您专注于创新与研究。</p>
            </div>
            
            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {[
                { 
                  icon: <FaBrain className="text-indigo-300" />, 
                  text: "智能提取核心观点",
                  delay: 0.4
                },
                { 
                  icon: <FaBookReader className="text-blue-300" />, 
                  text: "结构化呈现研究方法",
                  delay: 0.5 
                },
                { 
                  icon: <FaChartLine className="text-purple-300" />, 
                  text: "突出关键实验结果",
                  delay: 0.6
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center px-4 py-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 text-sm shadow-inner"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay, duration: 0.4 }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <div className="mr-3 text-lg">{item.icon}</div>
                  <p className="text-white/90">{item.text}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/analyze">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 20px 30px -10px rgba(79, 70, 229, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 bg-white font-medium text-indigo-900 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-indigo-900/30"
                >
                  立即开始分析
                  <FaArrowRight className="text-sm ml-1" />
                </motion.button>
              </Link>
              
              <a href="https://github.com/sanbuphy/SmartPaper" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 bg-transparent border border-white/30 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-indigo-900/20"
                >
                  了解更多
                </motion.button>
              </a>
            </div>
          </motion.div>
          
          {/* Image showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              {/* Visual effects for the showcase */}
              <div className="absolute -inset-px bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              
              {/* Browser-like window */}
              <motion.div 
                className="relative bg-gradient-to-br from-indigo-800/80 to-purple-800/80 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.5)" }}
                transition={{ duration: 0.4 }}
              >
                {/* Browser chrome */}
                <div className="h-12 bg-gradient-to-r from-indigo-800 to-purple-800 px-4 flex items-center">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 h-6 bg-indigo-700/50 rounded-full px-4 flex items-center text-xs text-white/70 overflow-hidden">
                    smartpaper.ai/analyze
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-1">
                  <img
                    src={AnalysisResult}
                    alt="论文分析结果示例"
                    className="w-full rounded-b-lg"
                  />
                </div>
                
                {/* Animated badge */}
                <motion.div 
                  className="absolute top-1/3 -right-4 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <span className="text-white text-xs font-medium flex items-center">
                    <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    智能摘要完成
                  </span>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-1/4 -left-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <span className="text-white text-xs font-medium flex items-center">
                    <svg className="w-3 h-3 mr-1.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    快速解析中
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
