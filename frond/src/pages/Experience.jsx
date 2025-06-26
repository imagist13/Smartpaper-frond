import React from "react";

const Experience = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-gray-50 relative">
      {/* 添加背景装饰元素 */}
      <div className="absolute top-20 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-12">体验中心</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">SmartPaper 功能体验</h2>
            <p className="text-gray-700 mb-6">
              我们正在为您准备更多的体验功能，敬请期待！
            </p>
            
            <div className="flex justify-center">
              <a 
                href="/analyze" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
              >
                立即体验论文分析
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;