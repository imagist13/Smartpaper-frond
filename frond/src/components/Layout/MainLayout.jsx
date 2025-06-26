import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { motion } from "framer-motion";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 左侧边栏 */}
      <Sidebar />
      
      {/* 右侧内容区域 */}
      <motion.div 
        className="flex-1 ml-[280px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <main className="min-h-screen py-6 px-8">
          {children}
        </main>
      </motion.div>
    </div>
  );
};

export default MainLayout; 