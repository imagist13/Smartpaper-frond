import React from 'react';
import { FaAngleDown } from 'react-icons/fa';

/**
 * 提示词选择器组件
 * @param {Object} props - 组件属性
 * @param {Array} props.prompts - 可用的提示词模板数组，每个元素包含id和name属性
 * @param {Object} props.selectedPrompt - 当前选中的提示词模板对象
 * @param {Function} props.onChange - 选择变更回调函数
 */
const PromptSelector = ({ prompts, selectedPrompt, onChange }) => {
  if (!prompts || prompts.length === 0) {
    return (
      <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-500">
        正在加载分析模板...
      </div>
    );
  }
  
  // 提示模板描述
  const promptDescriptions = {
    coolpapaers: "适合一般学术论文的全面分析，包含背景、方法、结果、价值等",
    summary: "生成简洁的论文摘要，快速了解论文核心内容",
    yuanbao: "深入分析论文创新点与贡献，关注技术亮点",
    methodology: "专注于研究方法与实验设计分析",
    results: "重点分析实验结果与数据解读"
  };

  return (
    <div className="relative">
      <select
        value={selectedPrompt ? selectedPrompt.id : ''}
        onChange={(e) => {
          const selected = prompts.find(prompt => prompt.id === e.target.value);
          onChange(selected);
        }}
        className="w-full appearance-none bg-white border border-gray-300 rounded-md p-2.5 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        {prompts.map((prompt) => (
          <option key={prompt.id} value={prompt.id}>
            {prompt.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <FaAngleDown />
      </div>
      
      {selectedPrompt && promptDescriptions[selectedPrompt.id] && (
        <div className="mt-2 text-sm text-gray-600">
          {promptDescriptions[selectedPrompt.id]}
        </div>
      )}
    </div>
  );
};

export default PromptSelector; 