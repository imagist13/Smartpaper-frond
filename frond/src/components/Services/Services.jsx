import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaSearch, FaChartBar } from "react-icons/fa";
import { HiTemplate, HiOutlineLightBulb, HiOutlineDocumentReport } from "react-icons/hi";

const ServiceCard = [
  {
    id: 1,
    title: "智能分析",
    description:
      "使用先进的AI大模型技术，快速提取论文核心观点和关键贡献，节省您的研究时间",
    icon: <FaSearch />,
    iconBg: "from-blue-500 to-indigo-600",
    delay: 0.2,
  },
  {
    id: 2,
    title: "多种模板",
    description:
      "提供多种专业分析模板，满足不同学科和研究场景需求，可自由选择分析角度和深度",
    icon: <HiTemplate />,
    iconBg: "from-purple-500 to-indigo-600",
    delay: 0.4,
  },
  {
    id: 3,
    title: "开源免费",
    description:
      "完全开源免费，无需注册，输入论文URL或上传PDF文件即可立即获得分析结果",
    icon: <HiOutlineLightBulb />,
    iconBg: "from-indigo-500 to-blue-600",
    delay: 0.6,
  },
];

const features = [
  {
    id: 1,
    title: "提高研究效率",
    description: "快速了解论文核心内容，节省80%的时间，提高文献阅读效率",
    icon: <FaRocket />,
    delay: 0.3,
  },
  {
    id: 2,
    title: "结构化呈现",
    description: "自动梳理论文结构，提取关键方法和实验结果，清晰直观",
    icon: <HiOutlineDocumentReport />,
    delay: 0.5,
  },
  {
    id: 3,
    title: "定制化分析",
    description: "灵活选择分析维度和深度，满足不同研究阶段的需求",
    icon: <FaChartBar />,
    delay: 0.7,
  }
];

const Services = () => {
  const bgPattern = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E";
  
  return (
    <div className="relative bg-white overflow-hidden pt-16 pb-24">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-50" 
        style={{ backgroundImage: `url("${bgPattern}")`, backgroundSize: "30px 30px" }}></div>

      {/* Gradient accent */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 hidden lg:block">
        <div className="w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 hidden lg:block">
        <div className="w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-4 bg-indigo-50 text-indigo-600 font-medium text-sm rounded-full"
          >
            核心功能
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
          >
            AI驱动的<span className="text-indigo-600">论文解析服务</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            使用先进的AI技术，让学术论文阅读和理解变得更加简单高效，助力您的研究工作事半功倍
          </motion.p>
        </div>
        
        {/* Services cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ServiceCard.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: card.delay }}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300"
            >
              {/* Gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
              
              <div className="p-8">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${card.iconBg} text-white shadow-lg mb-6`}>
                  <span className="text-xl">{card.icon}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Features section */}
        <div className="mt-20 pt-16 border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-4"
            >
              为什么选择 SmartPaper
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600"
            >
              我们致力于提供业界领先的论文智能分析服务
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600">
                      {feature.icon}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Stats section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100"
        >
          {[
            { value: "500+", label: "用户" },
            { value: "3000+", label: "论文分析" },
            { value: "80%", label: "时间节省" },
            { value: "99.9%", label: "使用满意度" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold text-indigo-600"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
