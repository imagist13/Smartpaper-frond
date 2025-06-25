import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaLinkedin, FaChartBar, FaFileAlt, FaRocket, FaPaperPlane, FaBook, FaQuestionCircle } from "react-icons/fa";
import Logo from "../assets/Logo.png";
// 导入分析图片
import AnalysisResult1 from '../assets/analysis/analysis_result1.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "产品",
      links: [
        { name: "首页", to: "/" },
        { name: "论文分析", to: "/analyze" },
        { name: "历史记录", to: "/history" },
        { name: "使用指南", to: "#" },
      ]
    },
    {
      title: "资源",
      links: [
        { name: "文档", to: "#" },
        { name: "API", to: "#" },
        { name: "GitHub", to: "https://github.com/sanbuphy/SmartPaper", external: true },
        { name: "更新日志", to: "#" },
      ]
    },
    {
      title: "关于",
      links: [
        { name: "团队", to: "#" },
        { name: "联系我们", to: "#" },
        { name: "隐私政策", to: "#" },
        { name: "服务条款", to: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 产品信息 */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/logo.png" alt="SmartPaper Logo" className="h-8" />
              <h3 className="ml-2 text-lg font-bold text-[#4338ca]">SmartPaper</h3>
            </div>
            <p className="text-gray-600 text-sm">
              SmartPaper是一个智能论文分析工具，使用AI技术快速分析和总结学术论文，节省研究时间。
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://github.com/sanbuphy/SmartPaper" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/analyze" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                  论文分析
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                  历史记录
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 文档链接 */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">文档</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/sanbuphy/SmartPaper/blob/main/README.md" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center text-sm"
                >
                  <FaBook className="mr-2" />
                  项目文档
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/sanbuphy/SmartPaper/tree/main/docs" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center text-sm"
                >
                  <FaFileAlt className="mr-2" />
                  使用指南
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/sanbuphy/SmartPaper/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center text-sm"
                >
                  <FaQuestionCircle className="mr-2" />
                  问题反馈
                </a>
              </li>
            </ul>
          </div>
          
          {/* 联系我们 */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">关于我们</h3>
            <p className="text-gray-600 text-sm mb-4">
              SmartPaper是一个开源项目，欢迎贡献代码和提供反馈。
            </p>
            <a 
              href="https://github.com/sanbuphy/SmartPaper" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              <FaGithub className="mr-2" />
              访问GitHub
            </a>
          </div>
        </div>
        
        {/* 版权信息 */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© {currentYear} SmartPaper. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 