import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaHome, 
  FaFileAlt, 
  FaHistory, 
  FaCog, 
  FaInfoCircle,
  FaSignOutAlt
} from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      path: "/", 
      name: "首页", 
      icon: <FaHome className="w-5 h-5" /> 
    },
    { 
      path: "/analyze", 
      name: "分析论文", 
      icon: <FaFileAlt className="w-5 h-5" />
    },
    { 
      path: "/history", 
      name: "历史记录", 
      icon: <FaHistory className="w-5 h-5" /> 
    },
    { 
      path: "/experience", 
      name: "使用体验", 
      icon: <RiRobot2Fill className="w-5 h-5" /> 
    }
  ];

  return (
    <div className="w-[280px] h-full bg-gray-900 text-white flex flex-col fixed left-0 top-0 bottom-0 z-10">
      {/* Logo区域 */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <RiRobot2Fill className="text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
            SmartPaper
          </h1>
        </div>
        <p className="text-xs text-gray-400 mt-2">AI驱动的论文分析工具</p>
      </div>
      
      {/* 导航菜单 */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 
                    ${isActive 
                      ? 'bg-gradient-to-r from-indigo-900 to-indigo-800 shadow-lg shadow-indigo-800/20' 
                      : 'hover:bg-gray-800/50'}`}
                >
                  <span className={`mr-3 ${isActive ? 'text-indigo-300' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  <span className={`${isActive ? 'font-medium' : 'font-normal'}`}>
                    {item.name}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="ml-auto w-1.5 h-5 bg-indigo-400 rounded-full"
                    />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* 底部菜单 */}
      <div className="p-4 border-t border-gray-800">
        <ul className="space-y-2">
          <li>
            <button className="w-full flex items-center px-4 py-2 text-gray-400 hover:text-gray-300 rounded-lg hover:bg-gray-800/50 transition-all duration-200">
              <FaCog className="w-4 h-4 mr-3" />
              <span>设置</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center px-4 py-2 text-gray-400 hover:text-gray-300 rounded-lg hover:bg-gray-800/50 transition-all duration-200">
              <FaInfoCircle className="w-4 h-4 mr-3" />
              <span>关于我们</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center px-4 py-2 text-gray-400 hover:text-gray-300 rounded-lg hover:bg-gray-800/50 transition-all duration-200">
              <FaSignOutAlt className="w-4 h-4 mr-3" />
              <span>退出登录</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar; 