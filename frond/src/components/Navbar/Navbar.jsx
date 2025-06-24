import React, { useState } from "react";
import Logo from "../../assets/book.png";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const NavLinks = [
  {
    id: 1,
    title: "主页",
    link: "/",
  },
  {
    id: 2,
    title: "功能",
    link: "/experience",
  },
  {
    id: 3,
    title: "文档",
    link: "#",
  },
  {
    id: 4,
    title: "定价",
    link: "#",
  },
  {
    id: 5,
    title: "百度飞桨",
    link: "https://aistudio.baidu.com/application/detail/68062",
  },
];
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="container py-4 flex justify-between items-center sticky top-0 bg-gray-50 z-50 border-b border-gray-200"
      >
        {/* Logo section */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8" />
          <span className="text-xl font-medium">SmartPaper</span>
        </div>
        
        {/* Desktop Link section */}
        <div className="hidden md:flex items-center space-x-8">
          {NavLinks.map((link) => (
            link.link.startsWith('http') || link.link === '#' ? (
              <a
                key={link.id}
                href={link.link}
                className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                target={link.link.startsWith('http') ? "_blank" : "_self"}
                rel={link.link.startsWith('http') ? "noopener noreferrer" : ""}
              >
                {link.title}
              </a>
            ) : (
              <Link
                key={link.id}
                to={link.link}
                className="text-base font-medium text-gray-600 hover:text-black transition-colors duration-200"
              >
                {link.title}
              </Link>
            )
          ))}
        </div>
        
        {/* 开源使用 */}
        <div className="hidden md:block">
          <a href="https://github.com/sanbuphy/SmartPaper" target="_blank" rel="noopener noreferrer">
            <button className="primary-btn flex items-center gap-2 transition-colors duration-300">
              <FaGithub className="text-sm" />
              <span>开源使用</span>
            </button>
          </a>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100"
          >
            {mobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt4 className="h-6 w-6" />}
          </button>
        </div>
      </motion.div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-b border-gray-200 py-4 px-6"
        >
          <div className="flex flex-col space-y-4">
            {NavLinks.map((link) => (
              link.link.startsWith('http') || link.link === '#' ? (
                <a
                  key={link.id}
                  href={link.link}
                  className="text-base font-medium text-gray-600 hover:text-black transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                  target={link.link.startsWith('http') ? "_blank" : "_self"}
                  rel={link.link.startsWith('http') ? "noopener noreferrer" : ""}
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  key={link.id}
                  to={link.link}
                  className="text-base font-medium text-gray-600 hover:text-black transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              )
            ))}
            <a href="https://github.com/sanbuphy/SmartPaper" target="_blank" rel="noopener noreferrer" className="pt-2">
              <button className="primary-btn flex items-center gap-2 w-full justify-center transition-colors duration-300">
                <FaGithub className="text-sm" />
                <span>开源使用</span>
              </button>
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
