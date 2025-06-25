import React from "react";
import { motion } from "framer-motion";
import Brand1 from "../../assets/brand/1.png";
import Brand2 from "../../assets/brand/2.png";
import Brand3 from "../../assets/brand/3.png";
import Brand4 from "../../assets/brand/4.png";
import Brand5 from "../../assets/brand/5.png";

const brands = [
  { id: 1, img: Brand1, alt: "Partner 1" },
  { id: 2, img: Brand2, alt: "Partner 2" },
  { id: 3, img: Brand3, alt: "Partner 3" },
  { id: 4, img: Brand4, alt: "Partner 4" },
  { id: 5, img: Brand5, alt: "Partner 5" },
];

const Brands = () => {
  return (
    <div className="w-full py-6">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              {/* Highlight effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200/0 via-purple-200/30 to-blue-200/0 opacity-0 group-hover:opacity-100 rounded-xl blur-xl transition-opacity duration-500"></div>
              
              <div className="relative bg-white/50 backdrop-blur-sm p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 w-32 h-32 flex items-center justify-center">
                <img
                  src={brand.img}
                  alt={brand.alt}
                  className="max-h-16 max-w-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Brands;
