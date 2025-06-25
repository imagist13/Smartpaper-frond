import React from 'react';
import { FaChevronDown, FaCheckCircle } from 'react-icons/fa';

const PromptSelector = ({ prompts, selectedPrompt, setSelectedPrompt }) => {
  return (
    <div>
      <div className="relative">
        <select
          id="prompt-select"
          className="w-full px-3 sm:px-5 py-3 sm:py-4 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base bg-white pr-10"
          value={selectedPrompt}
          onChange={(e) => setSelectedPrompt(e.target.value)}
        >
          <option value="" disabled>选择分析模板</option>
          {Object.entries(prompts).map(([key, description]) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none">
          <FaChevronDown className="text-gray-500" />
        </div>
      </div>
      
      {selectedPrompt && prompts[selectedPrompt] && (
        <div className="mt-3 sm:mt-4 bg-white p-3 sm:p-4 rounded-lg border border-indigo-100 shadow-sm">
          <div className="flex items-start">
            <FaCheckCircle className="text-indigo-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" />
            <div>
              <h4 className="font-medium text-gray-800 text-sm sm:text-base">{selectedPrompt}</h4>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">{prompts[selectedPrompt]}</p>
            </div>
          </div>
        </div>
      )}
      
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">
        选择适合您需求的分析模板，不同模板关注论文的不同方面
      </p>
    </div>
  );
};

export default PromptSelector; 