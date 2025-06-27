import React from "react";
import Header from "../Header";
import { motion } from "framer-motion";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 顶部导航 */}
      <Header />
      
      {/* 内容区域 */}
      <motion.div 
        className="flex-1"
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