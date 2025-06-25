import React, { useState, useEffect } from "react";
import Logo from "../../assets/book.png";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const NavLinks = [
  {
    id: 1,
    title: "主页",
    link: "/",
  },
  {
    id: 2,
    title: "论文分析",
    link: "/analyze",
  },
  {
    id: 3,
    title: "历史记录",
    link: "/history",
  },
  {
    id: 4,
    title: "文档",
    link: "https://github.com/sanbuphy/SmartPaper/blob/main/README.md",
    external: true,
  },
  {
    id: 5,
    title: "百度飞桨",
    link: "https://aistudio.baidu.com/application/detail/68062",
    external: true,
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // 监听滚动事件以更改导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
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
  
  // 关闭当前路径匹配的菜单项
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled 
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3" 
            : "bg-transparent py-5"
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo section */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <motion.img 
              src={Logo} 
              alt="logo" 
              className="w-8" 
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 10, transition: { duration: 0.2 } }}
            />
            <span className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              SmartPaper
            </span>
          </Link>
          
          {/* Desktop Link section */}
          <div className="hidden md:flex items-center space-x-8">
            {NavLinks.map((link) => (
              link.external ? (
                <a
                  key={link.id}
                  href={link.link}
                  className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              ) : (
                <Link
                  key={link.id}
                  to={link.link}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.link
                      ? "text-purple-600"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  {link.title}
                </Link>
              )
            ))}
          </div>
          
          {/* GitHub button */}
          <div className="hidden md:block">
            <a href="https://github.com/sanbuphy/SmartPaper" target="_blank" rel="noopener noreferrer">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full hover:shadow-lg transition-all duration-300 shadow-md"
              >
                <FaGithub className="text-sm" />
                <span>开源使用</span>
              </motion.button>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt4 className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 bg-white z-40 border-b border-gray-200 shadow-lg md:hidden overflow-hidden"
          >
            <div className="flex flex-col space-y-1 p-4">
              {NavLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.id}
                    href={link.link}
                    className="py-3 px-4 text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center justify-between"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{link.title}</span>
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                ) : (
                  <Link
                    key={link.id}
                    to={link.link}
                    className={`py-3 px-4 text-base font-medium rounded-lg transition-colors duration-200 ${
                      location.pathname === link.link
                        ? "text-purple-600 bg-purple-50"
                        : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.title}
                  </Link>
                )
              ))}
              <div className="pt-2">
                <a 
                  href="https://github.com/sanbuphy/SmartPaper" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-3 text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg"
                >
                  <div className="flex items-center justify-center gap-2">
                    <FaGithub className="text-sm" />
                    <span>开源使用</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Spacer for fixed header */}
      <div className={`${scrolled ? 'h-16' : 'h-20'} transition-all duration-300`}></div>
    </>
  );
};

export default Navbar;
