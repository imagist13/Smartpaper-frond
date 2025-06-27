import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFileAlt, FaRobot, FaStar, FaCheckCircle, FaUserGraduate, FaUniversity, FaRegLightbulb, FaRegClock, FaRegChartBar, FaBrain, FaCode, FaRocket, FaChartLine, FaLightbulb } from 'react-icons/fa';
import Banner from '../components/Banner/Banner';
import Brands from '../components/Brands/Brands';
import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import FetchShowcase from '../components/FetchShowcase/FetchShowcase';
import Footer from '../components/Footer/Footer';
import Banner2 from '../components/Banner/Banner2';
import AIFlow from '../components/AIFlow/AIFlow';
import AnalysisResult from "../assets/analysis/result.png";

const features = [
  {
    id: 1,
    icon: <FaBrain className="text-3xl text-purple-600" />,
    title: 'AI驱动分析',
    description: '基于先进大模型技术，智能提取论文核心观点与方法论，为研究提供洞察',
  },
  {
    id: 2,
    icon: <FaRegClock className="text-3xl text-blue-500" />,
    title: '节省研究时间',
    description: '快速获取论文精华内容，减少阅读负担，提高研究效率',
  },
  {
    id: 3,
    icon: <FaRegLightbulb className="text-3xl text-yellow-500" />,
    title: '定制化分析',
    description: '多种专业分析模板，满足不同学科和研究目的的需求',
  },
];

const useCases = [
  {
    id: 1,
    title: "学术研究人员",
    description: "快速了解领域最新进展，节省文献阅读时间",
    icon: <FaUserGraduate className="text-3xl text-indigo-500" />
  },
  {
    id: 2,
    title: "企业研发团队",
    description: "追踪技术前沿，将学术成果转化为产品创新",
    icon: <FaRocket className="text-3xl text-purple-500" />
  },
  {
    id: 3,
    title: "学生与教育工作者",
    description: "辅助学习理解复杂论文，提高学习效率",
    icon: <FaRegChartBar className="text-3xl text-blue-500" />
  },
  {
    id: 4,
    title: "开发人员",
    description: "快速把握算法原理，加速技术实现与应用",
    icon: <FaCode className="text-3xl text-teal-500" />
  }
];

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  // 添加背景视差效果
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* 自定义内容区域 */}
      <div className="max-w-6xl mx-auto px-4">
        {/* 主标题区域 */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              论文智能解析
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl"
          >
            使用先进的AI技术，将复杂论文转化为结构化知识，提升研究效率，节省您的宝贵时间
          </motion.p>
        </div>
        
        {/* 功能展示与CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* 左侧：功能介绍和行动按钮 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* 特性列表 */}
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="mt-1 mr-4 p-2 bg-indigo-100 rounded-lg">
                  <FaFileAlt className="text-indigo-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">论文智能解读</h3>
                  <p className="text-gray-600">
                    自动提取论文关键结构、方法和结论，使复杂内容变得易于理解
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 p-2 bg-purple-100 rounded-lg">
                  <FaChartLine className="text-purple-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">结构化知识展示</h3>
                  <p className="text-gray-600">
                    将论文内容转换为清晰的结构化格式，轻松把握论文脉络和核心观点
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 p-2 bg-indigo-100 rounded-lg">
                  <FaLightbulb className="text-indigo-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">深度洞察生成</h3>
                  <p className="text-gray-600">
                    AI分析提供论文的关键洞察，帮助您快速理解研究价值和创新点
                  </p>
                </div>
              </div>
            </div>
            
            {/* 行动按钮 */}
            <Link to="/analyze">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
              >
                <span className="font-medium">开始分析论文</span>
                <FaArrowRight className="ml-2" />
              </motion.button>
            </Link>
          </motion.div>
          
          {/* 右侧：分析结果演示 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* 浏览器窗口模拟 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
              {/* 浏览器标题栏 */}
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 h-5 bg-white rounded-full px-4 flex items-center text-xs text-gray-500 overflow-hidden">
                  smartpaper.ai/analysis/result
                </div>
              </div>
              
              {/* 分析结果图片 */}
              <img
                src={AnalysisResult}
                alt="论文分析结果示例"
                className="w-full h-auto object-cover"
              />
              
              {/* 浮动信息卡片 */}
              <div className="absolute top-12 -right-6 bg-white p-3 rounded-lg shadow-lg border border-indigo-100 max-w-[180px]">
                <div className="text-xs font-medium text-indigo-800 mb-1">AI分析完成</div>
                <div className="text-xs text-gray-600">从5,879字的论文中提取了24个关键点</div>
              </div>
              
              <div className="absolute bottom-12 -left-6 bg-white p-3 rounded-lg shadow-lg border border-purple-100 max-w-[180px]">
                <div className="text-xs font-medium text-purple-800 mb-1">解析速度</div>
                <div className="text-xs text-gray-600">仅用27秒完成分析，节省3小时阅读时间</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* 品牌展示 */}
      <Brands />
      
      {/* 服务介绍 */}
      <Services />
      
      {/* AI分析流程展示 */}
      <AIFlow />
      
      {/* 案例展示 */}
      <Banner />
      
      {/* 第二个Banner */}
      <Banner2 />
      
      {/* 底部 */}
      <Footer />
    </>
  );
};

export default HomePage; 