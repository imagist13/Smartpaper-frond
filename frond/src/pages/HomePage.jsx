import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFileAlt, FaRobot, FaStar, FaCheckCircle, FaUserGraduate, FaUniversity, FaRegLightbulb, FaRegClock, FaRegChartBar, FaBrain, FaCode, FaRocket } from 'react-icons/fa';
import Banner from '../components/Banner/Banner';
import Brands from '../components/Brands/Brands';
import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import FetchShowcase from '../components/FetchShowcase/FetchShowcase';
import Footer from '../components/Footer/Footer';
import Banner2 from '../components/Banner/Banner2';
import AIFlow from '../components/AIFlow/AIFlow';

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
    <div className="min-h-screen bg-white overflow-hidden">
      {/* 悬浮动态背景 */}
      <motion.div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-[100px]"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-indigo-300 rounded-full opacity-20 blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-300 rounded-full opacity-20 blur-[100px]"></div>
      </motion.div>
      
      {/* Hero Section */}
      <motion.section 
        className="relative z-10"
        style={{ opacity, scale }}
      >
        <Hero />
      </motion.section>
      
      {/* Services Section */}
      <section className="relative z-10">
        <Services />
      </section>
      
      {/* Main Banner */}
      <section className="mt-8 relative z-10">
        <Banner />
      </section>
      
      {/* Features Showcase */}
      <section className="py-16 relative z-10">
        <FetchShowcase />
      </section>
      
      {/* AI Workflow */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative z-10">
        <AIFlow />
      </section>
      
      {/* Trusted By */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">受到信赖</h2>
            <p className="text-gray-600">全球研究机构和学术组织的首选</p>
          </div>
          <Brands />
        </div>
      </section>
      
      {/* Secondary Banner */}
      <section className="relative z-10">
        <Banner2 />
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            准备好提升您的论文阅读效率了吗？
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg mb-8 max-w-2xl mx-auto text-indigo-100"
          >
            开始使用 SmartPaper，让AI技术帮助您快速理解和分析学术论文
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/analyze">
              <button className="px-8 py-4 bg-white text-indigo-700 font-medium rounded-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2">
                立即开始分析 <FaArrowRight className="ml-1 text-sm" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage; 