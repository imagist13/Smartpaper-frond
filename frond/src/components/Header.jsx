import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaGithub, FaFileAlt, FaHistory, FaHome, FaInfoCircle, FaBars, FaTimes } from 'react-icons/fa';
import { HiMenuAlt4, HiX } from 'react-icons/hi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // 监听滚动事件，设置导航栏背景
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 导航菜单项
  const menuItems = [
    { name: '首页', path: '/', icon: <FaHome className="mr-2" /> },
    { name: '论文分析', path: '/analyze', icon: <FaFileAlt className="mr-2" /> },
    { name: '历史记录', path: '/history', icon: <FaHistory className="mr-2" /> },
    { name: '关于我们', path: '/about', icon: <FaInfoCircle className="mr-2" /> }
  ];
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-white shadow-md py-2' 
            : 'bg-white shadow-sm py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="SmartPaper Logo" className="h-8" />
              <span className="ml-2 text-xl font-bold text-[#4338ca]">SmartPaper</span>
            </Link>
            
            {/* 桌面端导航 */}
            <nav className="hidden md:flex space-x-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md flex items-center transition-colors ${
                    location.pathname === item.path
                      ? 'bg-indigo-100 text-indigo-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          
          {/* 移动端导航 */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-md my-1 transition-colors flex items-center ${
                    location.pathname === item.path
                      ? 'bg-indigo-100 text-indigo-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div className={`${scrolled ? 'h-16' : 'h-20'} transition-all duration-300`}></div>
    </>
  );
};

export default Header; 