import React from "react";
import { motion } from "framer-motion";
import { FaFileAlt, FaCode, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner2 = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gray-50">
      {/* Background elements */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-gray-100 to-transparent z-0"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                高效论文阅读<br /> 
                <span className="text-indigo-600">从这里开始</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-gray-600 text-lg leading-relaxed"
              >
                告别繁琐的论文阅读过程，让AI助力您更快理解和把握学术前沿。通过智能分析技术，将复杂论文转化为结构化内容，提升研究效率。
              </motion.p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  value: "15+",
                  label: "AI模型支持",
                  delay: 0.3
                },
                {
                  value: "3000+",
                  label: "论文分析次数",
                  delay: 0.4
                },
                {
                  value: "80%",
                  label: "提升研究效率",
                  delay: 0.5
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: stat.delay, duration: 0.5 }}
                  className="space-y-2"
                >
                  <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            
            {/* CTA */}
            <Link to="/analyze">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2"
              >
                开始分析论文
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative grid grid-cols-1 gap-6"
          >
            {[
              {
                icon: <FaFileAlt />,
                title: "智能摘要生成",
                description: "自动提取论文核心内容，快速了解研究目标和主要贡献",
                color: "bg-gradient-to-br from-blue-500 to-indigo-600",
                delay: 0.4
              },
              {
                icon: <FaChartLine />,
                title: "方法与结果分析",
                description: "清晰呈现论文的研究方法、实验设计和关键结果",
                color: "bg-gradient-to-br from-indigo-500 to-purple-600",
                delay: 0.6
              },
              {
                icon: <FaCode />,
                title: "技术实现解读",
                description: "深度解析论文的算法原理和技术实现细节，助力工程落地",
                color: "bg-gradient-to-br from-purple-500 to-pink-600",
                delay: 0.8
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${feature.color} text-white p-3 rounded-lg shadow-lg`}>
                    <span className="text-lg">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Background decoration */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-indigo-100 opacity-50 blur-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner2;
