import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaGithub, FaFileAlt, FaHistory, FaHome } from 'react-icons/fa';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import Logo from "../assets/paper_samples/logo.png";

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
  
  // 关闭菜单当路由变化时
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  // 导航菜单项
  const menuItems = [
    { name: '首页', path: '/', icon: <FaHome className="mr-2" /> },
    { name: '论文分析', path: '/analyze', icon: <FaFileAlt className="mr-2" /> },
    { name: '历史记录', path: '/history', icon: <FaHistory className="mr-2" /> }
  ];
  
  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled || isOpen
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
            : 'bg-white/80 backdrop-blur-md py-4'
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                className="relative w-10 h-10"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-md opacity-30 group-hover:opacity-70 transition-opacity"></div>
                <div className="w-10 h-10 rounded-full overflow-hidden relative z-10 bg-white flex items-center justify-center">
                  <img 
                    src={Logo} 
                    alt="SmartPaper Logo" 
                    className="w-9 h-9 object-contain"
                  />
                </div>
              </motion.div>
              
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  SmartPaper
                </span>
                <span className="text-xs text-gray-600 font-medium -mt-1">智能论文解析</span>
              </div>
            </Link>
            
            {/* 桌面端导航 */}
            <nav className="hidden md:flex space-x-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-indigo-700"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  {location.pathname === item.path && (
                    <motion.span 
                      className="absolute inset-0 bg-indigo-50 rounded-lg"
                      layoutId="navbar-active"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center ${location.pathname === item.path ? "text-indigo-700" : ""}`}>
                    {item.icon}
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
            
            {/* GitHub 按钮 */}
            <div className="hidden md:block">
              <a href="https://github.com/sanbuphy/SmartPaper" target="_blank" rel="noopener noreferrer">
                <motion.button 
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg transition-all shadow-sm hover:shadow"
                >
                  <FaGithub className="text-white" />
                  <span>开源使用</span>
                </motion.button>
              </a>
            </div>
            
            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "关闭菜单" : "打开菜单"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenuAlt4 className="h-6 w-6" />
                )}
              </motion.div>
            </button>
          </div>
          
          {/* 移动端导航 */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden mt-4 pb-4 overflow-hidden"
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 rounded-md my-1 transition-colors flex items-center ${
                        location.pathname === item.path
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                  className="pt-4 mt-4 border-t border-gray-100"
                >
                  <a 
                    href="https://github.com/sanbuphy/SmartPaper" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md"
                  >
                    <FaGithub />
                    <span>开源使用</span>
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
      
      {/* Spacer for fixed header */}
      <div className={`${scrolled ? 'h-16' : 'h-20'} transition-all duration-300`}></div>
    </>
  );
};

export default Header; 