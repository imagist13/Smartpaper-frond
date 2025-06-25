import React from 'react';
import { FaLink } from 'react-icons/fa';

const UrlInput = ({ url, setUrl }) => {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
          <FaLink className="text-gray-500 text-sm sm:text-base" />
        </div>
        <input
          id="url-input"
          type="url"
          className="w-full pl-9 sm:pl-12 pr-3 sm:pr-5 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base bg-white"
          placeholder="https://arxiv.org/abs/xxxx.xxxxx"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <p className="mt-2 text-xs sm:text-sm text-gray-500">
        输入完整的arXiv论文链接，例如：https://arxiv.org/abs/2006.04768
      </p>
    </div>
  );
};

export default UrlInput; 