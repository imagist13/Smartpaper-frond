import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaDownload, FaEye, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { getHistory, deleteHistory } from '../services/api';

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  
  const navigate = useNavigate();
  
  // 获取历史记录
  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const response = await getHistory();
        setHistory(response.history || []);
      } catch (error) {
        console.error('获取历史记录失败', error);
        setError('获取历史记录失败，请稍后再试');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHistory();
  }, []);
  
  // 查看历史记录详情
  const handleViewDetail = (item) => {
    navigate('/analyze', { state: { historyItem: item } });
  };
  
  // 下载历史记录
  const handleDownload = (item) => {
    window.open(`http://localhost:8000/history/${item.id}`, '_blank');
  };
  
  // 删除历史记录
  const handleDelete = async (id) => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    setDeleteItemId(id);
    
    try {
      await deleteHistory(id);
      // 更新本地历史记录列表
      setHistory(history.filter(item => item.id !== id));
    } catch (error) {
      console.error('删除历史记录失败', error);
      setError('删除历史记录失败，请稍后再试');
    } finally {
      setIsDeleting(false);
      setDeleteItemId(null);
    }
  };
  
  // 格式化日期
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              分析历史记录
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              查看您之前的论文分析历史记录和结果
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-indigo-600 text-3xl" />
              </div>
            ) : history.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-64 text-gray-500">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="text-lg">暂无分析历史</p>
                <button 
                  onClick={() => navigate('/analyze')}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  开始分析
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        论文标题
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        分析模板
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        日期
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {history.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {item.snippet}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                            {item.promptName}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-gray-400" />
                            {formatDate(item.date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleViewDetail(item)}
                              className="text-indigo-600 hover:text-indigo-900 flex items-center"
                              title="查看"
                            >
                              <FaEye className="mr-1" /> 查看
                            </button>
                            <button
                              onClick={() => handleDownload(item)}
                              className="text-green-600 hover:text-green-900 flex items-center"
                              title="下载"
                            >
                              <FaDownload className="mr-1" /> 下载
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-900 flex items-center"
                              disabled={isDeleting && deleteItemId === item.id}
                              title="删除"
                            >
                              {isDeleting && deleteItemId === item.id ? (
                                <>
                                  <FaSpinner className="animate-spin mr-1" /> 删除中
                                </>
                              ) : (
                                <>
                                  <FaTrash className="mr-1" /> 删除
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default History; 