import React from 'react';
import { 
  FaDownload, FaSearch, FaExpand, FaCompress, 
  FaShareAlt, FaBookmark, FaPrint, FaEdit,
  FaEye, FaCode, FaClipboard
} from 'react-icons/fa';

/**
 * 分析工具栏组件
 */
const AnalysisToolbar = ({
  onDownload,
  onSearch,
  onFullscreen,
  isFullscreen,
  onShare,
  onPrint,
  onCopy,
  onEdit,
  viewMode,
  onViewModeChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 p-2">
      {/* 左侧视图切换 */}
      <div className="flex items-center space-x-1">
        <button
          className={`p-1.5 rounded text-sm flex items-center ${
            viewMode === 'preview' 
              ? 'bg-blue-50 text-blue-600' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          onClick={() => onViewModeChange('preview')}
          disabled={disabled}
          title="预览视图"
        >
          <FaEye className="mr-1" /> 预览
        </button>
        <button
          className={`p-1.5 rounded text-sm flex items-center ${
            viewMode === 'code' 
              ? 'bg-blue-50 text-blue-600' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          onClick={() => onViewModeChange('code')}
          disabled={disabled}
          title="代码视图"
        >
          <FaCode className="mr-1" /> Markdown
        </button>
      </div>
      
      {/* 右侧工具按钮 */}
      <div className="flex items-center space-x-1">
        <button
          className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
          onClick={onSearch}
          disabled={disabled}
          title="搜索"
        >
          <FaSearch />
        </button>
        
        <button
          className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
          onClick={onFullscreen}
          disabled={disabled}
          title={isFullscreen ? "退出全屏" : "全屏"}
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
        
        <button
          className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
          onClick={onCopy}
          disabled={disabled}
          title="复制内容"
        >
          <FaClipboard />
        </button>
        
        <button
          className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
          onClick={onEdit}
          disabled={disabled}
          title="编辑"
        >
          <FaEdit />
        </button>
        
        <button
          className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
          onClick={onShare}
          disabled={disabled}
          title="分享"
        >
          <FaShareAlt />
        </button>
        
        <button
          className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
          onClick={onPrint}
          disabled={disabled}
          title="打印"
        >
          <FaPrint />
        </button>
        
        <button
          className="p-1.5 rounded bg-blue-500 text-white hover:bg-blue-600"
          onClick={onDownload}
          disabled={disabled}
          title="下载"
        >
          <FaDownload />
        </button>
      </div>
    </div>
  );
};

export default AnalysisToolbar; 