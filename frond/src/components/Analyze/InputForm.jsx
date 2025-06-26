import React, { useState } from 'react';
import { FaUpload, FaLink, FaInfoCircle, FaFileAlt } from 'react-icons/fa';
import PromptSelector from './PromptSelector';

const InputForm = ({
  activeTab,
  file,
  setFile,
  url,
  setUrl,
  prompts,
  selectedPrompt,
  setSelectedPrompt,
  handleSubmit,
  fileInputRef
}) => {
  const [activeLocalTab, setActiveLocalTab] = useState(activeTab || 'upload');
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(activeLocalTab);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* 标签页切换 */}
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            className={`w-1/2 py-3 font-medium text-sm flex justify-center items-center ${
              activeLocalTab === 'upload'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveLocalTab('upload')}
          >
            <FaUpload className="mr-2" /> 上传PDF
          </button>
          <button
            type="button"
            className={`w-1/2 py-3 font-medium text-sm flex justify-center items-center ${
              activeLocalTab === 'url'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveLocalTab('url')}
          >
            <FaLink className="mr-2" /> arXiv链接
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="p-6">
          {/* 上传PDF表单 */}
          {activeLocalTab === 'upload' && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">上传论文PDF文件</h3>
              
              <div 
                className={`
                  border-2 border-dashed rounded-lg p-8 mb-4 text-center
                  ${file ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-indigo-300 bg-gray-50'}
                  transition-colors cursor-pointer
                `}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
                
                {file ? (
                  <div className="flex flex-col items-center">
                    <FaFileAlt className="text-3xl text-green-500 mb-2" />
                    <p className="text-gray-800 font-medium mb-1">{file.name}</p>
                    <p className="text-gray-500 text-sm mb-3">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      移除文件
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FaUpload className="text-3xl text-gray-400 mb-2" />
                    <p className="text-gray-800 font-medium mb-1">拖拽PDF文件到此处或点击上传</p>
                    <p className="text-gray-500 text-sm">支持 PDF 格式</p>
                  </div>
                )}
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mb-4 flex items-start">
                <FaInfoCircle className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">支持的PDF格式</p>
                  <p>可以上传学术论文、研究报告、技术文档等PDF文件，系统将自动提取和分析内容。</p>
                </div>
              </div>
            </div>
          )}
          
          {/* arXiv链接表单 */}
          {activeLocalTab === 'url' && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">输入arXiv论文链接</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  论文URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="例如: https://arxiv.org/abs/2303.08774"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mb-4 flex items-start">
                <FaInfoCircle className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">支持的链接格式</p>
                  <p>目前支持分析来自 arXiv.org 的论文链接，请输入完整的 URL 地址。</p>
                </div>
              </div>
            </div>
          )}
          
          {/* 分析选项 */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">分析选项</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                分析模板
              </label>
              <PromptSelector
                prompts={prompts}
                selectedPrompt={selectedPrompt}
                onChange={setSelectedPrompt}
              />
            </div>
          </div>
          
          {/* 提交按钮 */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className={`
                px-4 py-2 rounded-md text-white font-medium
                ${((activeLocalTab === 'upload' && file) || (activeLocalTab === 'url' && url)) && selectedPrompt
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'}
                transition-colors
              `}
              disabled={!((activeLocalTab === 'upload' && file) || (activeLocalTab === 'url' && url)) || !selectedPrompt}
            >
              开始分析
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm; 