import React from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaLink, FaSpinner, FaInfoCircle } from 'react-icons/fa';
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
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* 标签页切换 */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-colors text-sm sm:text-base ${
                activeTab === 'upload'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700 bg-gray-50'
              }`}
              onClick={() => setActiveTab('upload')}
            >
              <FaUpload className="inline mr-1 sm:mr-2" />
              <span className="hidden xs:inline">上传PDF</span>
              <span className="xs:hidden">PDF</span>
            </button>
            <button
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-colors text-sm sm:text-base ${
                activeTab === 'url'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700 bg-gray-50'
              }`}
              onClick={() => setActiveTab('url')}
            >
              <FaLink className="inline mr-1 sm:mr-2" />
              <span className="hidden xs:inline">arXiv链接</span>
              <span className="xs:hidden">链接</span>
            </button>
          </div>
        </div>
        
        {/* 表单部分 */}
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-0">
                  {activeTab === 'upload' ? '上传论文PDF文件' : '输入论文URL'}
                </h3>
                <div className="bg-blue-50 text-blue-700 text-xs px-2 sm:px-3 py-1 rounded-full flex items-center self-start sm:self-auto">
                  <FaInfoCircle className="mr-1" /> 
                  {activeTab === 'upload' ? '支持PDF格式' : '支持arXiv链接'}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 sm:p-6 border border-gray-200">
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
              </div>
            </div>
            
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-0">选择分析模板</h3>
                <div className="bg-purple-50 text-purple-700 text-xs px-2 sm:px-3 py-1 rounded-full flex items-center self-start sm:self-auto">
                  <FaInfoCircle className="mr-1" /> 
                  <span className="hidden xs:inline">不同模板适用于不同分析需求</span>
                  <span className="xs:hidden">选择适合的模板</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 sm:p-6 border border-gray-200">
                <PromptSelector 
                  prompts={prompts} 
                  selectedPrompt={selectedPrompt} 
                  setSelectedPrompt={setSelectedPrompt} 
                />
              </div>
            </div>
            
            {/* 提交按钮 */}
            <div className="pt-3 sm:pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-0">
                  {isAnalyzing 
                    ? '分析中，请稍候...' 
                    : '点击开始分析按钮开始智能解析论文'
                  }
                </div>
                
                <button
                  type="submit"
                  disabled={isAnalyzing || 
                    (activeTab === 'upload' && !file) || 
                    (activeTab === 'url' && !url) || 
                    !selectedPrompt}
                  className={`w-full sm:w-auto px-4 sm:px-8 py-2.5 sm:py-3 rounded-md transition-colors flex items-center justify-center ${
                    isAnalyzing || 
                    (activeTab === 'upload' && !file) || 
                    (activeTab === 'url' && !url) || 
                    !selectedPrompt
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
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
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default InputForm; 