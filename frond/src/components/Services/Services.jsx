import React from "react";
import { FaVectorSquare, FaArrowRight } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { BiSolidDollarCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import { SlideUp, BounceIn, hoverScale } from "../../animation/animateExtended";

const ServiceCard = [
  {
    id: 1,
    title: "智能分析",
    description:
      "使用先进的AI技术自动分析学术论文的结构、方法和结论，节省您的阅读时间",
    icon: <FaVectorSquare />,
    link: "#",
    delay: 0.2,
  },
  {
    id: 2,
    title: "多种模板",
    description:
      "提供多种分析模板，满足不同场景的需求，包括摘要提取、关键点分析和详细解读",
    icon: <FaPenToSquare />,
    link: "#",
    delay: 0.4,
  },
  {
    id: 3,
    title: "免费使用",
    description:
      "完全开源免费，无需注册，只需输入论文URL即可立即获得分析结果",
    icon: <BiSolidDollarCircle />,
    link: "#",
    delay: 0.6,
  },
];
const Services = () => {
  return (
    <div className="relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="container py-28 relative z-10">
        {/* heading title */}
        <div className="space-y-4 text-center max-w-[600px] mx-auto mb-16">
          <motion.div
            variants={BounceIn(0.1)}
            initial="initial"
            whileInView={"animate"}
            className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full mb-4"
          >
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">功能特点</span>
          </motion.div>
          <motion.h1
            variants={BounceIn(0.2)}
            initial="initial"
            whileInView={"animate"}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          >
            我们提供的服务
          </motion.h1>
          <motion.p
            variants={SlideUp(0.3)}
            initial="initial"
            whileInView={"animate"}
            className="text-gray-600 text-lg"
          >
            使用先进的AI技术，让学术论文阅读和理解变得更加简单高效
          </motion.p>
        </div>
        {/* card section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ServiceCard.map((card) => {
            return (
              <motion.div
                variants={SlideUp(card.delay)}
                initial="initial"
                whileInView={"animate"}
                whileHover={{ y: -8, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
                key={card.id}
                className="space-y-5 border border-gray-100 px-7 py-10 rounded-xl bg-white transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <motion.span 
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-xl text-white shadow-lg"
                  whileHover={hoverScale}
                >
                  {card.icon}
                </motion.span>
                <p className="text-xl font-medium">{card.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                <motion.a
                  href={card.link}
                  className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors duration-300 group-hover:underline"
                  whileHover={{ x: 5 }}
                >
                  了解更多 <FaArrowRight className="ml-1 text-xs" />
                </motion.a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
