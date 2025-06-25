import React from 'react';

const UrlInput = ({ url, setUrl }) => {
  return (
    <div className="mb-8">
      <label htmlFor="url-input" className="block text-base font-medium text-gray-700 mb-3">
        输入arXiv链接
      </label>
      <input
        id="url-input"
        type="url"
        className="w-full px-5 py-4 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
        placeholder="https://arxiv.org/abs/xxxx.xxxxx"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <p className="mt-2 text-sm text-gray-500">
        输入完整的arXiv论文链接，例如：https://arxiv.org/abs/2006.04768
      </p>
    </div>
  );
};

export default UrlInput; 