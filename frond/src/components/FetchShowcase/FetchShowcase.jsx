import React from "react";
import { motion } from "framer-motion";
import { SlideUp, FadeIn, ScaleUp } from "../../animation/animateExtended";
import { FaArrowRight } from "react-icons/fa";

// 模拟数据，根据图片内容创建
const weatherData = {
  temperature: 11,
  location: "Shanghai",
  condition: "Light Rain Shower",
};

const statusData = {
  title: "Soft Movements",
  description: "Rosy Glow",
};

const inventoryData = {
  title: "Gradients",
  quantity: 120,
  status: "In Stock",
};

const astronomyData = {
  sunrise: "06:52 AM",
  sunset: "06:47 PM",
  moon: "Full Moon",
};

const FetchShowcase = () => {
  return (
    <div className="bg-gray-50 py-32 w-full relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="container">
        {/* 标题区域 */}
        <div className="flex flex-col justify-center items-center mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            variants={FadeIn(0.1)}
            initial="initial"
            whileInView="animate"
            className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full mb-6"
          >
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">智能分析 · 高效阅读</span>
          </motion.div>
          <motion.h2
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView="animate"
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          >
            SmartPaper
          </motion.h2>
          <motion.div
            variants={SlideUp(0.3)}
            initial="initial"
            whileInView="animate"
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6"
          >
            <p>使用AI技术快速分析和理解学术论文，无需编写代码</p>
          </motion.div>
        </div>

        {/* 卡片区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 天气卡片 */}
          <motion.div
            variants={ScaleUp(0.3)}
            initial="initial"
            whileInView="animate"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-600"></div>
            <h3 className="text-sm text-gray-500 mb-4">CURRENT WEATHER</h3>
            <div className="flex flex-col">
              <span className="text-5xl font-light mb-2">{weatherData.temperature}</span>
              <p className="font-medium">{weatherData.location}</p>
              <p className="text-sm text-gray-500">{weatherData.condition}</p>
            </div>
          </motion.div>

          {/* 状态卡片 */}
          <motion.div
            variants={ScaleUp(0.4)}
            initial="initial"
            whileInView="animate"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-600"></div>
            <h3 className="text-sm text-gray-500 mb-4">LISTENING STATUS</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl"></div>
              <div>
                <p className="font-medium">{statusData.title}</p>
                <p className="text-sm text-gray-500">{statusData.description}</p>
              </div>
            </div>
          </motion.div>

          {/* 库存卡片 */}
          <motion.div
            variants={ScaleUp(0.5)}
            initial="initial"
            whileInView="animate"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-600"></div>
            <h3 className="text-sm text-gray-500 mb-4">LIVE INVENTORY</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl"></div>
              <div>
                <p className="font-medium">{inventoryData.title}</p>
                <p className="text-sm text-gray-500">
                  {inventoryData.quantity} In Stock
                </p>
              </div>
            </div>
          </motion.div>

          {/* 天文卡片 */}
          <motion.div
            variants={ScaleUp(0.6)}
            initial="initial"
            whileInView="animate"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-600"></div>
            <h3 className="text-sm text-gray-500 mb-4">ASTRONOMY</h3>
            <div className="flex flex-col">
              <div className="flex justify-between mb-1">
                <span>Sunrise</span>
                <span>{astronomyData.sunrise}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Sunset</span>
                <span>{astronomyData.sunset}</span>
              </div>
              <div className="flex justify-between">
                <span>Moon</span>
                <span>{astronomyData.moon}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FetchShowcase;