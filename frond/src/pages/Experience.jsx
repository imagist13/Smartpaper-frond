<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaStar, FaRegStar, FaSmile, FaMeh, FaFrown } from "react-icons/fa";
>>>>>>> 63483267648195cff784cdfe286eadeedbc2d1cd

const Experience = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  
  // 体验类型选项
  const experienceOptions = [
    { id: "speed", title: "速度体验", description: "分析速度和响应时间" },
    { id: "accuracy", title: "准确度", description: "分析结果的准确性和相关性" },
    { id: "ui", title: "用户界面", description: "界面设计和使用体验" },
    { id: "features", title: "功能完整性", description: "产品功能的全面性" }
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 在实际应用中，这里会发送数据到服务器
    setSubmitted(true);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">使用体验</h1>
        <p className="text-gray-600 mb-8">
          您的反馈对我们至关重要。请分享您使用SmartPaper的体验和建议。
        </p>
      </motion.div>
      
<<<<<<< HEAD
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
=======
      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center"
        >
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <FaPaperPlane className="text-green-600 text-xl" />
          </div>
          <h2 className="text-2xl font-bold mb-2">感谢您的反馈！</h2>
          <p className="text-gray-600 mb-4">
            您的宝贵意见将帮助我们不断改进SmartPaper，为您提供更好的体验。
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            提交新反馈
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 体验类型选择 */}
            <div>
              <h2 className="text-lg font-semibold mb-4">您想分享哪方面的体验？</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experienceOptions.map((option) => (
                  <div 
                    key={option.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedExperience === option.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 bg-white hover:border-indigo-200'
                    }`}
                    onClick={() => setSelectedExperience(option.id)}
                  >
                    <h3 className="font-medium mb-1">{option.title}</h3>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 星级评分 */}
            <div>
              <h2 className="text-lg font-semibold mb-2">总体评分</h2>
              <p className="text-sm text-gray-500 mb-4">您对SmartPaper的整体满意度如何？</p>
              
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl transition-all"
                  >
                    {star <= rating ? (
                      <FaStar className="text-yellow-400" />
                    ) : (
                      <FaRegStar className="text-gray-300 hover:text-yellow-400" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-3 mt-2">
                <FaFrown className={`${rating <= 2 ? 'text-red-500' : 'text-gray-300'}`} />
                <div className="flex-1 h-1 bg-gray-200 rounded-full">
                  <div 
                    className="h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full"
                    style={{ width: `${(rating / 5) * 100}%` }}
                  ></div>
                </div>
                <FaSmile className={`${rating >= 4 ? 'text-green-500' : 'text-gray-300'}`} />
              </div>
            </div>
            
            {/* 详细反馈 */}
            <div>
              <h2 className="text-lg font-semibold mb-2">详细反馈</h2>
              <p className="text-sm text-gray-500 mb-4">请分享您的使用体验或改进建议</p>
              
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all resize-none"
                placeholder="请分享您的想法..."
              />
            </div>
            
            {/* 提交按钮 */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`px-8 py-3 rounded-lg flex items-center gap-2 shadow-sm ${
                  rating > 0 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/20'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={rating === 0}
              >
                <span>提交反馈</span>
                <FaPaperPlane className="text-sm" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
>>>>>>> 63483267648195cff784cdfe286eadeedbc2d1cd
    </div>
  );
};

export default Experience;