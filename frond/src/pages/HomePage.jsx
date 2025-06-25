import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFileAlt, FaRobot, FaStar, FaCheckCircle, FaUserGraduate, FaUniversity, FaRegLightbulb, FaRegClock, FaRegChartBar, FaBrain, FaCode, FaRocket } from 'react-icons/fa';
import Banner from '../components/Banner/Banner';
import Brands from '../components/Brands/Brands';
import Newsletter from '../components/Newsletter/Newsletter';
import AnalysisResult from '../assets/analysis/result.png';

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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    }
  })
};

const HomePage = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Hero Section - Full Screen Height */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-indigo-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDBIMHYzMGgzMFYwem0zMCAwSDMwdjMwaDMwVjB6TTMwIDMwSDB2MzBoMzBWMzB6bTMwIDBIMzB2MzBoMzBWMzB6IiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-12 w-full">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-6">
                  <span className="px-3 py-1 text-xs font-semibold bg-indigo-400/20 text-indigo-200 rounded-full border border-indigo-400/30">
                    AI驱动 · 研究效率提升
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  <span className="block">让研究工作</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300">
                    事半功倍
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-indigo-100 mb-8 leading-relaxed max-w-xl">
                  SmartPaper采用AI技术快速分析学术论文，提取关键内容，为研究人员节省宝贵时间，提高研究效率。
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link to="/analyze">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                    >
                      立即开始分析
                      <FaArrowRight className="text-sm" />
                    </motion.button>
                  </Link>
                  <a href="https://github.com/sanbuphy/SmartPaper" target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-8 py-4 border border-indigo-400/30 rounded-full hover:bg-indigo-700/30 transition-all duration-300 backdrop-blur-sm text-indigo-100 flex items-center justify-center gap-2"
                    >
                      查看开源代码
                    </motion.button>
                  </a>
                </div>
                
                {/* Trust indicators */}
                <div className="flex flex-col sm:flex-row gap-6 text-indigo-200 text-sm">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" />
                    <span>10,000+ 篇论文已分析</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUserGraduate className="text-indigo-300" />
                    <span>1,000+ 研究人员在使用</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUniversity className="text-blue-300" />
                    <span>50+ 科研机构认可</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Hero Image - 更换为分析结果图片 */}
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Decorative elements */}
                <div className="absolute -inset-px bg-gradient-to-tr from-purple-500 to-blue-500 rounded-2xl blur-xl opacity-30 -z-10"></div>
                
                <div className="relative bg-gradient-to-br from-indigo-800 to-indigo-900 p-1 rounded-2xl shadow-2xl overflow-hidden border border-indigo-700/50">
                  <div className="absolute top-0 left-0 w-full h-8 bg-indigo-900/80 backdrop-blur-sm flex items-center px-4 gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  
                  <img
                    src={AnalysisResult}
                    alt="SmartPaper论文分析结果"
                    className="rounded-b-xl rounded-tr-xl w-full h-auto shadow-lg"
                  />
                  
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 via-transparent to-purple-800/20 rounded-2xl"></div>
                </div>
                
                {/* Floating badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -right-6 -bottom-6 bg-gradient-to-br from-blue-500 to-indigo-600 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <FaStar className="text-yellow-300 text-xl" />
                  <span className="text-white font-semibold">AI驱动解析</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - Updated to be more modern and commercial */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full mb-4">
                核心优势
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">提升研究效率的智能工具</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                SmartPaper为研究人员提供强大的AI功能，让论文阅读与分析更加高效
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={feature.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="inline-block p-3 rounded-2xl bg-gray-50 group-hover:bg-purple-50 mb-6 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-700 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Use Cases Section - New section */}
      <section className="w-full py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full mb-4">
                适用场景
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">为各类用户提供价值</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                无论您是研究人员、学生还是企业开发者，SmartPaper都能为您提供显著价值
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-4">{useCase.icon}</div>
                <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works - Updated with more modern design */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full mb-4">
                操作流程
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">简单三步，快速获取分析</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                SmartPaper设计简洁直观的操作流程，让您轻松获取论文精华内容
              </p>
            </motion.div>
          </div>
          
          <div className="max-w-5xl mx-auto relative px-4">
            {/* 连接线 */}
            <div className="hidden lg:block absolute top-[4.5rem] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-purple-200 via-indigo-300 to-blue-200 -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { 
                  step: "01", 
                  title: "上传或粘贴链接", 
                  desc: "上传PDF文件或粘贴arXiv链接",
                  color: "from-purple-500 to-indigo-500"
                },
                { 
                  step: "02", 
                  title: "选择分析模板", 
                  desc: "根据需求选择不同的分析角度",
                  color: "from-indigo-500 to-blue-500"
                },
                { 
                  step: "03", 
                  title: "获取分析结果", 
                  desc: "查看AI生成的结构化分析内容",
                  color: "from-blue-500 to-indigo-500"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg transform transition-all duration-300`}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Banner */}
      <section className="w-full">
        <Banner />
      </section>
      
      {/* Partners - Updated with better styling */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full mb-4">
              信任背书
            </div>
            <h2 className="text-2xl font-bold mb-4">合作伙伴与支持</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              我们与领先的研究机构和技术提供商合作，为您提供最优质的服务
            </p>
          </div>
          <Brands />
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="w-full">
        <Newsletter />
      </section>
    </div>
  );
};

export default HomePage; 