import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

/**
 * 文档大纲导航组件
 * @param {Object} props - 组件属性
 * @param {Array} props.outlineItems - 大纲项目数组，每项包含 id、level 和 title
 */
const DocumentOutline = ({ outlineItems = [] }) => {
  if (!outlineItems || outlineItems.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        暂无大纲信息
      </div>
    );
  }

  // 滚动到指定标题位置
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 设置不同级别标题的样式
  const getItemStyles = (level) => {
    const baseStyles = "flex items-center py-1.5 text-sm hover:text-indigo-700 cursor-pointer transition-colors";
    
    switch (level) {
      case 1:
        return `${baseStyles} font-medium text-gray-800`;
      case 2:
        return `${baseStyles} pl-2 text-gray-700`;
      case 3:
        return `${baseStyles} pl-4 text-gray-700`;
      case 4:
        return `${baseStyles} pl-6 text-gray-600 text-xs`;
      case 5:
        return `${baseStyles} pl-8 text-gray-600 text-xs`;
      case 6:
        return `${baseStyles} pl-10 text-gray-600 text-xs`;
      default:
        return `${baseStyles} pl-2 text-gray-700`;
    }
  };

  return (
    <nav className="outline-navigator bg-white rounded-md">
      <ul className="space-y-0.5">
        {outlineItems.map((item, index) => (
          <li key={`${item.id || index}`} className="truncate">
            <div 
              className={getItemStyles(item.level)}
              onClick={() => scrollToHeading(item.id)}
            >
              <FaChevronRight className={`text-xs mr-1.5 ${item.level > 2 ? 'text-gray-400' : 'text-indigo-600'}`} />
              <span className="truncate">{item.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DocumentOutline; 