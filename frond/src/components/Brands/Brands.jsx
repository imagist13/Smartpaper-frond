import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import Brand1 from "../../assets/brand/1.png";
import Brand2 from "../../assets/brand/2.png";
import Brand3 from "../../assets/brand/3.png";
import Brand4 from "../../assets/brand/4.png";
import Brand5 from "../../assets/brand/5.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Brands = () => {
  // 合作伙伴数据 - 使用本地图片
  const partners = [
    {
      id: 1,
      name: '清华大学',
      logo: Brand1,
      alt: '清华大学 Logo',
      delay: 0
    },
    {
      id: 2,
      name: '北京大学',
      logo: Brand2,
      alt: '北京大学 Logo',
      delay: 0.1
    },
    {
      id: 3,
      name: '中国科学院',
      logo: Brand3,
      alt: '中国科学院 Logo',
      delay: 0.2
    },
    {
      id: 4,
      name: '复旦大学',
      logo: Brand4,
      alt: '复旦大学 Logo',
      delay: 0.1
    },
    {
      id: 5,
      name: '浙江大学',
      logo: Brand5,
      alt: '浙江大学 Logo',
      delay: 0.2
    }
  ];

  // 滚动设置
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="py-12 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* 文字部分 - 左侧 */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="pr-0 md:pr-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">受到信赖</h2>
              <p className="text-gray-600">全球研究机构和学术组织的首选</p>
            </motion.div>
          </div>
          
          {/* 滚动标志部分 - 右侧 */}
          <div className="w-full md:w-2/3">
            <div className="brands-container">
              <Slider {...sliderSettings} className="brands-slider">
                {/* 为确保无限滚动效果，重复显示 partners 数组 */}
                {[...partners, ...partners].map((partner, index) => (
                  <div key={`${partner.id}-${index}`} className="brand-item">
                    <img 
                      src={partner.logo} 
                      alt={partner.alt} 
                      className="brand-logo h-16 object-contain"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
