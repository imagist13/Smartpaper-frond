import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaShieldAlt, FaBolt, FaCheckCircle } from "react-icons/fa";
import AnalysisResult from "../../assets/analysis/analysis_result1.svg";

const Banner = () => {
  return (
    <section className="w-full py-20 md:py-28 bg-gradient-to-r from-indigo-900 to-purple-900 text-white overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full"></div>
        <div className="absolute -bottom-10 -left-10 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-500/20 to-transparent rounded-tr-full"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDBIMHYzMGgzMFYwem0zMCAwSDMwdjMwaDMwVjB6TTMwIDMwSDB2MzBoMzBWMzB6bTMwIDBIMzB2MzBoMzBWMzB6IiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full inline-flex items-center mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              <span className="text-xs font-medium">商业级论文分析服务</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              让AI为您的学术研究<br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                提供强大支持
              </span>
            </h2>
            
            <p className="text-lg mb-8 text-indigo-100 max-w-lg">
              SmartPaper提供专业的论文分析服务，帮助研究人员提高工作效率，节省时间，集中精力在真正重要的研究突破上。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { icon: <FaBolt className="text-yellow-300" />, text: "分析速度提升10倍" },
                { icon: <FaShieldAlt className="text-blue-300" />, text: "数据安全保障" },
                { icon: <FaCheckCircle className="text-green-300" />, text: "99.9%服务可用性" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/analyze">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-indigo-900 font-medium rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                >
                  立即开始分析
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </Link>
              
              <a href="https://github.com/sanbuphy/SmartPaper" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-transparent border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  了解更多
                </motion.button>
              </a>
            </div>
          </motion.div>
          
          {/* Image - 使用分析结果图片 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-2xl blur-xl -z-10"></div>
            
            <div className="bg-gradient-to-br from-indigo-800/80 to-purple-800/80 p-2 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-r from-indigo-800/90 to-purple-800/90 backdrop-blur-sm flex items-center px-4 gap-1.5 rounded-t-xl">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              
              <div className="pt-10">
                <img
                  src={AnalysisResult}
                  alt="论文分析结果示例"
                  className="w-full h-auto rounded-b-xl"
                />
              </div>
              
              {/* Floating badges */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -left-6 top-1/3 bg-gradient-to-br from-green-500 to-blue-500 px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm"
              >
                <FaCheckCircle className="text-white" />
                <span className="font-medium">智能摘要</span>
              </motion.div>
              
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -right-6 bottom-1/4 bg-gradient-to-br from-purple-500 to-pink-500 px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm"
              >
                <FaBolt className="text-yellow-300" />
                <span className="font-medium">快速分析</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
