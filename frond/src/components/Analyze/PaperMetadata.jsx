import React from 'react';
import { FaFileAlt, FaRegCalendarAlt, FaUser, FaLink, FaTag } from 'react-icons/fa';

// 从Markdown内容中提取论文元数据
export const extractPaperMetadata = (markdownContent) => {
  if (!markdownContent) return null;

  // 提取标题
  const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : '未知标题';
  
  // 提取作者
  const authorMatch = markdownContent.match(/\*\*作者\*\*[:：]\s*(.+?)(?:\n|$)/i) || 
                      markdownContent.match(/\*\*Authors?\*\*[:：]\s*(.+?)(?:\n|$)/i);
  const authors = authorMatch ? authorMatch[1].trim() : '未知作者';
  
  // 提取日期
  const dateMatch = markdownContent.match(/\*\*日期\*\*[:：]\s*(.+?)(?:\n|$)/i) || 
                   markdownContent.match(/\*\*Date\*\*[:：]\s*(.+?)(?:\n|$)/i) ||
                   markdownContent.match(/\*\*发布日期\*\*[:：]\s*(.+?)(?:\n|$)/i);
  const date = dateMatch ? dateMatch[1].trim() : '未知日期';
  
  // 提取URL/DOI
  const urlMatch = markdownContent.match(/\*\*URL\*\*[:：]\s*(.+?)(?:\n|$)/i) || 
                  markdownContent.match(/\*\*DOI\*\*[:：]\s*(.+?)(?:\n|$)/i) ||
                  markdownContent.match(/\*\*链接\*\*[:：]\s*(.+?)(?:\n|$)/i);
  const url = urlMatch ? urlMatch[1].trim() : '';
  
  // 提取关键词
  const keywordsMatch = markdownContent.match(/\*\*关键词\*\*[:：]\s*(.+?)(?:\n|$)/i) || 
                        markdownContent.match(/\*\*Keywords\*\*[:：]\s*(.+?)(?:\n|$)/i);
  const keywords = keywordsMatch 
    ? keywordsMatch[1].split(/[,，;；]/).map(k => k.trim()).filter(Boolean)
    : [];
  
  return { title, authors, date, url, keywords };
};

// 从Markdown内容中提取摘要
export const extractSummary = (markdownContent) => {
  if (!markdownContent) return '';
  
  // 寻找摘要或总结部分
  const summaryMatch = markdownContent.match(/##\s+摘要\s*\n+([\s\S]+?)(?=\n##|\n#|$)/i) || 
                       markdownContent.match(/##\s+总结\s*\n+([\s\S]+?)(?=\n##|\n#|$)/i) ||
                       markdownContent.match(/##\s+概述\s*\n+([\s\S]+?)(?=\n##|\n#|$)/i) ||
                       markdownContent.match(/##\s+Abstract\s*\n+([\s\S]+?)(?=\n##|\n#|$)/i) ||
                       markdownContent.match(/##\s+Summary\s*\n+([\s\S]+?)(?=\n##|\n#|$)/i);
                       
  return summaryMatch ? summaryMatch[1].trim() : '';
};

/**
 * 论文元数据显示组件
 */
const PaperMetadata = ({ metadata, summary, showFullSummary = false, toggleSummary }) => {
  if (!metadata) return null;
  
  const { title, authors, date, url, keywords } = metadata;

  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <div className="p-3 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-medium text-gray-700 flex items-center">
          <FaFileAlt className="mr-2 text-gray-600" /> 
          论文信息
        </h3>
      </div>
      
      <div className="p-3">
        {/* 标题 */}
        <h2 className="text-lg font-medium text-gray-800 mb-3">{title}</h2>
        
        {/* 作者信息 */}
        <div className="flex items-start mb-2 text-sm">
          <FaUser className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
          <div className="text-gray-700">{authors}</div>
        </div>
        
        {/* 日期信息 */}
        <div className="flex items-start mb-2 text-sm">
          <FaRegCalendarAlt className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
          <div className="text-gray-700">{date}</div>
        </div>
        
        {/* URL/DOI信息 */}
        {url && (
          <div className="flex items-start mb-2 text-sm">
            <FaLink className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 hover:underline truncate"
            >
              {url}
            </a>
          </div>
        )}
        
        {/* 关键词标签 */}
        {keywords && keywords.length > 0 && (
          <div className="flex items-start mb-2 text-sm">
            <FaTag className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <div className="flex flex-wrap gap-1.5">
              {keywords.map((keyword, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* 摘要 */}
        {summary && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-1">摘要</div>
            <div className={`text-sm text-gray-600 ${!showFullSummary && 'line-clamp-3'}`}>
              {summary}
            </div>
            {summary.length > 150 && (
              <button 
                onClick={toggleSummary} 
                className="text-xs text-blue-600 hover:text-blue-800 mt-1"
              >
                {showFullSummary ? '收起' : '显示更多'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperMetadata; 