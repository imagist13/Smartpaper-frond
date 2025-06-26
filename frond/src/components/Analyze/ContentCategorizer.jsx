import React from 'react';

/**
 * 对Markdown内容进行分类
 * @param {string} content - Markdown内容
 * @returns {Object} - 分类后的内容
 */
export const categorizeContent = (content) => {
  if (!content) return {};

  // 查找所有二级标题及其内容
  const sections = {};
  const lines = content.split('\n');
  let currentSection = null;
  let sectionContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 检查是否是二级标题
    if (line.startsWith('## ')) {
      // 如果已经有当前部分，保存它
      if (currentSection) {
        sections[currentSection] = sectionContent.join('\n');
        sectionContent = [];
      }
      
      // 设置新的当前部分
      currentSection = line.replace('## ', '').trim();
    } 
    // 如果当前有部分，添加内容
    else if (currentSection) {
      sectionContent.push(line);
    }
  }
  
  // 保存最后一个部分
  if (currentSection) {
    sections[currentSection] = sectionContent.join('\n');
  }
  
  // 特别提取：问题背景、方法、实验与结果
  const result = {
    background: sections['问题背景'] || sections['背景'] || sections['研究背景'] || sections['Background'] || '',
    method: sections['方法'] || sections['方法论'] || sections['研究方法'] || sections['Methodology'] || '',
    results: sections['实验'] || sections['结果'] || sections['实验与结果'] || sections['Results'] || sections['实验结果'] || '',
    conclusion: sections['结论'] || sections['总结'] || sections['Conclusion'] || '',
    contribution: sections['贡献'] || sections['主要贡献'] || sections['创新点'] || sections['Contribution'] || '',
  };
  
  return result;
};

/**
 * 内容分类器组件 - 用于在不同类别的内容之间切换
 */
const ContentCategorizer = ({ categories, activeCategory, setActiveCategory }) => {
  // 确保categories不为空
  if (!categories || Object.keys(categories).length === 0) {
    return null;
  }
  
  // 标签映射表
  const categoryLabels = {
    background: '问题背景',
    method: '方法',
    results: '实验与结果',
    conclusion: '结论',
    contribution: '主要贡献',
  };
  
  // 有内容的类别
  const availableCategories = Object.entries(categories)
    .filter(([_, content]) => content.trim().length > 0)
    .map(([key]) => key);
  
  if (availableCategories.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-4">
      <div className="flex items-center border-b border-gray-200">
        {availableCategories.map((category) => (
          <button
            key={category}
            className={`
              px-4 py-2 text-sm font-medium 
              ${activeCategory === category 
                ? 'text-blue-600 border-b-2 border-blue-500 -mb-px' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
            `}
            onClick={() => setActiveCategory(category)}
          >
            {categoryLabels[category] || category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContentCategorizer; 