import React from "react";
import Logo from "../../assets/book.png";
import { FaPhone } from "react-icons/fa6";
import { LuMessageSquare } from "react-icons/lu";
import { motion } from "framer-motion";
import { SlideLeft } from "../../animation/animate";

const Footer = () => {
  return (
    <motion.footer
      variants={SlideLeft(0.2)}
      initial="initial"
      whileInView="animate"
      className="bg-white border-t border-gray-100"
    >
      <div className="container py-11">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info section */}
          <div className="space-y-4 font-semibold">
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="" className="w-6" />
              <p className="text-xl font-semibold">SmartPaper</p>
            </div>
            <p>中国，北京</p>
            <p>© 2024 SmartPaper All rights reserved</p>
          </div>
          {/* Footer Link */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-4">
              <h1 className="text-xl font-semibold">关于我们</h1>
              <ul className="text-sm space-y-4">
                <li>
                  <a href="#">我们的故事</a>
                </li>
                <li>
                  <a href="#">团队</a>
                </li>
                <li>
                  <a href="#">技术</a>
                </li>
                <li>
                  <a href="#">开源</a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h1 className="text-xl font-semibold">支持</h1>
              <ul className="text-sm space-y-4">
                <li>
                  <a href="#">常见问题</a>
                </li>
                <li>
                  <a href="#">使用指南</a>
                </li>
                <li>
                  <a href="#">API文档</a>
                </li>
                <li>
                  <a href="#">反馈</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Contact section */}
          <div className="space-y-4">
            <h1 className="text-xl font-semibold">联系我们</h1>
            <ul className="text-base font-semibold space-y-4">
              <li className="flex items-center space-x-3">
                <FaPhone />
                <a href="#">+86 123456789</a>
              </li>
              <li className="flex items-center space-x-3">
                <LuMessageSquare />
                <a href="mailto:contact@smartpaper.com">Email</a>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom section */}
        <p className="text-center text-sm font-semibold border-t-2 pt-5 mt-5">
          © 2024 SmartPaper. All rights reserved
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
