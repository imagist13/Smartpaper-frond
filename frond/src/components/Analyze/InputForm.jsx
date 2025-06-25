import React from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaLink, FaSpinner } from 'react-icons/fa';
import FileUploader from './FileUploader';
import UrlInput from './UrlInput';
import PromptSelector from './PromptSelector';

const InputForm = ({
  activeTab,
  setActiveTab,
  file,
  setFile,
  url,
  setUrl,
  prompts,
  selectedPrompt,
  setSelectedPrompt,
  fileInputRef,
  isAnalyzing,
  handleSubmit
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-white border border-gray-200 shadow-sm">
        {/* 标签页切换 */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'upload'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700 bg-gray-50'
              }`}
              onClick={() => setActiveTab('upload')}
            >
              <FaUpload className="inline mr-2" />
              上传PDF
            </button>
            <button
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'url'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700 bg-gray-50'
              }`}
              onClick={() => setActiveTab('url')}
            >
              <FaLink className="inline mr-2" />
              arXiv链接
            </button>
          </div>
        </div>
        
        {/* 表单部分 */}
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            {activeTab === 'upload' && (
              <FileUploader 
                file={file} 
                setFile={setFile} 
                fileInputRef={fileInputRef} 
              />
            )}
            
            {activeTab === 'url' && (
              <UrlInput url={url} setUrl={setUrl} />
            )}
            
            <PromptSelector 
              prompts={prompts} 
              selectedPrompt={selectedPrompt} 
              setSelectedPrompt={setSelectedPrompt} 
            />
            
            {/* 提交按钮 */}
            <div className="flex items-center justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isAnalyzing || 
                  (activeTab === 'upload' && !file) || 
                  (activeTab === 'url' && !url) || 
                  !selectedPrompt}
                className={`px-8 py-4 text-base font-medium rounded transition-colors flex items-center ${
                  isAnalyzing || 
                  (activeTab === 'upload' && !file) || 
                  (activeTab === 'url' && !url) || 
                  !selectedPrompt
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> 
                    分析中...
                  </>
                ) : (
                  '开始分析'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default InputForm; 