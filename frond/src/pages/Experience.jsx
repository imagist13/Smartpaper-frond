import React from "react";
import Newsletter from "../components/Newsletter/Newsletter";

const Experience = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-gray-50 relative">
      {/* 添加背景装饰元素 */}
      <div className="absolute top-20 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="container relative z-10 pb-20">
        <Newsletter />
      </div>
    </div>
  );
};

export default Experience;