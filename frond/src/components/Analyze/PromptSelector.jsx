import React from 'react';

const PromptSelector = ({ prompts, selectedPrompt, setSelectedPrompt }) => {
  return (
    <div className="mb-8">
      <label htmlFor="prompt-select" className="block text-base font-medium text-gray-700 mb-3">
        选择分析模板
      </label>
      <select
        id="prompt-select"
        className="w-full px-5 py-4 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
        value={selectedPrompt}
        onChange={(e) => setSelectedPrompt(e.target.value)}
      >
        <option value="" disabled>选择分析模板</option>
        {Object.entries(prompts).map(([key, description]) => (
          <option key={key} value={key}>{key} - {description}</option>
        ))}
      </select>
      <p className="mt-2 text-sm text-gray-500">
        不同的分析模板适用于不同类型的论文分析需求
      </p>
    </div>
  );
};

export default PromptSelector; 