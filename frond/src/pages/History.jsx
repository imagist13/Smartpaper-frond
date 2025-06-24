import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiDownload, FiEye, FiCalendar, FiBook } from 'react-icons/fi';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟获取历史记录数据
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        // 这里应该是从API获取真实数据
        // const response = await axios.get('http://localhost:8000/history');
        // setHistory(response.data);
        
        // 使用模拟数据
        setTimeout(() => {
          setHistory([
            {
              id: '1',
              title: 'Attention Is All You Need',
              url: 'https://arxiv.org/pdf/1706.03762.pdf',
              date: '2023-05-15',
              promptName: 'yuanbao',
              snippet: '这篇论文提出了Transformer模型，一种完全基于注意力机制的架构...'
            },
            {
              id: '2',
              title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
              url: 'https://arxiv.org/pdf/1810.04805.pdf',
              date: '2023-05-20',
              promptName: 'summary',
              snippet: 'BERT是一种预训练语言表示模型，通过双向训练提升了NLP任务的性能...'
            },
            {
              id: '3',
              title: 'GPT-4 Technical Report',
              url: 'https://arxiv.org/pdf/2303.08774.pdf',
              date: '2023-06-01',
              promptName: 'critique',
              snippet: 'GPT-4是一个多模态大型语言模型，在各种专业和学术基准上表现出人类水平的性能...'
            }
          ]);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('获取历史记录失败:', error);
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = (id) => {
    // 实际应用中，这里应该调用后端API删除历史记录
    setHistory(history.filter(item => item.id !== id));
  };

  const handleView = (id) => {
    // 实际应用中，这里应该跳转到查看历史记录详情页面
    console.log(`查看历史记录: ${id}`);
  };

  const handleDownload = (id) => {
    // 实际应用中，这里应该调用后端API下载历史记录
    console.log(`下载历史记录: ${id}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">历史分析记录</h1>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-12">
          <FiBook className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">没有分析记录</h3>
          <p className="mt-1 text-sm text-gray-500">开始分析您的第一篇论文吧</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <FiCalendar className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    <span>{item.date}</span>
                    <span className="mx-2">•</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.promptName}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.snippet}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex space-x-2">
                  <button
                    onClick={() => handleView(item.id)}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <FiEye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDownload(item.id)}
                    className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <FiDownload className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History; 