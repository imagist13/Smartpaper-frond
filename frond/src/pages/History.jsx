import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiDownload, FiEye, FiCalendar, FiBook, FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { useToast } from '../components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000'; // API 地址

const History = () => {
  const { toast } = useToast();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      // 从API获取真实历史数据
      const response = await axios.get(`${API_URL}/history`);
      setHistory(response.data.history);
      setIsLoading(false);
    } catch (error) {
      console.error('获取历史记录失败:', error);
      toast({
        title: '获取历史记录失败',
        description: error.message || '请稍后重试',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/history/${id}`);
      setHistory(history.filter(item => item.id !== id));
      toast({
        title: '删除成功',
        description: '已成功删除该历史记录',
      });
    } catch (error) {
      console.error('删除历史记录失败:', error);
      toast({
        title: '删除失败',
        description: error.message || '请稍后重试',
        variant: 'destructive',
      });
    }
  };

  const handleView = (item) => {
    // 将内容显示在分析页面
    navigate('/analyze', { state: { historyItem: item } });
  };

  const handleDownload = async (id) => {
    try {
      // 直接访问下载链接
      window.open(`${API_URL}/history/${id}`, '_blank');
    } catch (error) {
      console.error('下载历史记录失败:', error);
      toast({
        title: '下载失败',
        description: error.message || '请稍后重试',
        variant: 'destructive',
      });
    }
  };

  // 过滤历史记录
  const filteredHistory = history.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.promptName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">历史分析记录</h1>
          <p className="text-gray-500 mt-1">查看您之前分析的所有论文记录</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="搜索历史记录..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <FiBook className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            {searchTerm ? '没有找到相关历史记录' : '没有分析记录'}
          </h3>
          <p className="mt-1 text-gray-500">
            {searchTerm ? '请尝试其他搜索词' : '开始分析您的第一篇论文吧'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              清除搜索
            </button>
          )}
          {!searchTerm && (
            <button
              onClick={() => navigate('/analyze')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              开始分析
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredHistory.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer" onClick={() => handleView(item)}>
                    {item.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 gap-2">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1.5 h-4 w-4 flex-shrink-0" />
                      <span>{item.date}</span>
                    </div>
                    <span className="hidden md:inline-block">•</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.promptName}
                    </span>
                    <span className="hidden md:inline-block">•</span>
                    <span className="text-gray-500 truncate max-w-xs">
                      {item.url}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2 bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                    {item.snippet}...
                  </p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0 flex space-x-2">
                  <button
                    onClick={() => handleView(item)}
                    className="p-2 text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-full transition-colors"
                    title="查看分析结果"
                  >
                    <FiEye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDownload(item.id)}
                    className="p-2 text-gray-500 hover:text-green-600 bg-gray-50 hover:bg-green-50 rounded-full transition-colors"
                    title="下载分析结果"
                  >
                    <FiDownload className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-full transition-colors"
                    title="删除记录"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* 分页控件（将来可以添加） */}
      {filteredHistory.length > 0 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow">
            <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              上一页
            </button>
            <button className="px-3 py-2 border-t border-b border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
              1
            </button>
            <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              下一页
            </button>
          </nav>
        </div>
      )}
    </motion.div>
  );
};

export default History; 