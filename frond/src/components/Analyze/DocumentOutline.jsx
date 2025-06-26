import React from 'react';
import { FaList, FaChevronRight } from 'react-icons/fa';

// 从Markdown提取标题的辅助函数
export const extractDocumentOutline = (result) => {
  if (!result) return [];
  
  // 从Markdown提取标题创建大纲
  const headings = [];
  const lines = result.split('\n');
  
  lines.forEach((line, index) => {
    if (line.startsWith('#')) {
      const level = line.indexOf(' ');
      if (level > 0 && level <= 6) {
        const title = line.substring(level + 1).trim();
        headings.push({
          id: `heading-${index}`,
          title,
          level,
        });
      }
    }
  });
  
  return headings;
};

/**
 * 文档大纲组件
 * @param {Object} props - 组件属性
 * @param {Array} props.headings - 标题数组，每个标题包含id、title和level
 * @param {Function} props.onHeadingClick - 点击标题的回调函数
 * @param {string} props.activeHeadingId - 当前活动标题的ID
 */
const DocumentOutline = ({ headings = [], onHeadingClick, activeHeadingId = '' }) => {
  if (!headings || headings.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        暂无大纲信息
      </div>
    );
  }

  // 构建问答形式的大纲
  const questionItems = headings.filter(heading => heading.title.startsWith('Q:'));

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 bg-gray-100 border-b border-gray-200 flex items-center">
        <FaList className="text-gray-600 mr-2" />
        <h3 className="font-medium text-gray-700">文档大纲</h3>
      </div>
      
      <div className="overflow-y-auto flex-grow p-2">
        {questionItems.length > 0 ? (
          <div>
            {questionItems.map((heading, index) => (
              <div 
                key={`q-${index}`}
                className={`
                  py-2 px-3 mb-2 rounded cursor-pointer text-sm
                  border-l-2 hover:bg-gray-100 transition-colors
                  ${activeHeadingId === heading.id ? 'bg-blue-50 border-blue-500' : 'border-transparent'}
                `}
                onClick={() => onHeadingClick(heading.id)}
              >
                <div className="flex items-start">
                  <FaChevronRight className="text-gray-400 mt-1 mr-1.5 flex-shrink-0" size={10} />
                  <div className="truncate">{heading.title}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-0.5">
            {headings.map((heading, index) => (
              <li 
                key={index}
                className={`
                  py-1.5 px-2 cursor-pointer hover:bg-gray-100 rounded 
                  text-sm truncate border-l-2 transition-colors
                  ${activeHeadingId === heading.id ? 'border-blue-500 bg-blue-50' : 'border-transparent'}
                `}
                style={{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }}
                onClick={() => onHeadingClick(heading.id)}
              >
                {heading.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DocumentOutline; 