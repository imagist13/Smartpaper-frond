import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFileAlt, FaHistory, FaInfoCircle, FaRobot } from 'react-icons/fa';

/**
 * 应用程序头部导航组件
 */
const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-2 flex items-center">
        <Link to="/" className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <FaRobot className="text-white" />
          </div>
          <div>
            <h1 className="text-indigo-600 font-bold text-xl">SmartPaper</h1>
            <p className="text-gray-500 text-xs">智能论文分析</p>
          </div>
        </Link>
        
        <div className="ml-auto flex items-center space-x-6">
          <Link 
            to="/" 
            className={`flex items-center ${path === '/' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}
          >
            <FaHome className="mr-1.5" /> 首页
          </Link>
          
          <Link 
            to="/analyze" 
            className={`flex items-center ${path === '/analyze' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}
          >
            <FaFileAlt className="mr-1.5" /> 论文分析
          </Link>
          
          <Link 
            to="/history" 
            className={`flex items-center ${path === '/history' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}
          >
            <FaHistory className="mr-1.5" /> 历史记录
          </Link>
          
          <Link 
            to="/experience" 
            className={`flex items-center ${path === '/experience' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`}
          >
            <FaInfoCircle className="mr-1.5" /> 使用体验
          </Link>
        </div>
        
        <button className="ml-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md font-medium text-sm">
          开始使用
        </button>
      </div>
    </header>
  );
};

export default Header; 