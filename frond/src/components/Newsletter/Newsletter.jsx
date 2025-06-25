import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaRegBell, FaArrowRight, FaLock } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // 这里可以添加实际的订阅逻辑
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };
  
  return (
    <section className="w-full py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full opacity-60 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-60 blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left section with form */}
              <div className="p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full mb-6">
                    实时动态
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    获取学术前沿资讯
                  </h2>
                  
                  <p className="text-gray-600 mb-8">
                    订阅我们的通讯，获取最新的论文分析工具更新、研究技巧和AI技术进展，让您的研究始终保持领先。
                  </p>
                  
                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-100 rounded-xl p-6 text-center"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-500 mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">订阅成功！</h3>
                      <p className="text-gray-600">感谢您的订阅，我们将定期发送最新资讯。</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="请输入您的邮箱地址"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 pl-10"
                          required
                        />
                        <FaRegBell className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <span>立即订阅</span>
                        <FaArrowRight className="text-sm" />
                      </motion.button>
                      
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                        <FaLock className="text-gray-400" />
                        <span>我们尊重您的隐私，绝不会向第三方分享您的信息</span>
                      </div>
                    </form>
                  )}
                </motion.div>
              </div>
              
              {/* Right section with benefits */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 md:p-12 text-white relative hidden lg:block">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDBIMHYzMGgzMFYwem0zMCAwSDMwdjMwaDMwVjB6TTMwIDMwSDB2MzBoMzBWMzB6bTMwIDBIMzB2MzBoMzBWMzB6IiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-10"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-8">订阅者专享权益</h3>
                  
                  <ul className="space-y-6">
                    {[
                      { title: "新功能抢先体验", desc: "获取SmartPaper最新功能的抢先访问权" },
                      { title: "独家研究方法论", desc: "定期收到AI辅助研究的最佳实践指南" },
                      { title: "学术动态追踪", desc: "获取相关领域的研究趋势和突破性进展" }
                    ].map((benefit, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 * i, duration: 0.5 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 bg-white/20 rounded-full p-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold">{benefit.title}</h4>
                          <p className="text-sm text-indigo-200">{benefit.desc}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="mt-12 pt-6 border-t border-white/20">
                    <p className="text-sm text-indigo-200 italic">
                      "SmartPaper极大地提高了我的研究效率，每周通讯中的研究技巧非常实用。"
                    </p>
                    <p className="mt-2 text-sm font-semibold">— 李教授，清华大学</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
