import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';

const MarkdownRenderer = ({ content, className = "" }) => {
  if (!content) return null;
  
  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeSanitize, rehypeRaw, rehypeKatex]}
        components={{
          // 标题样式，以支持导航
          h1: ({node, ...props}) => (
            <h1 
              id={`heading-${props.index}`} 
              className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4"
              {...props} 
            />
          ),
          h2: ({node, ...props}) => (
            <h2 
              id={`heading-${props.index}`} 
              className="text-lg font-medium text-gray-800 mt-6 mb-3"
              {...props} 
            />
          ),
          h3: ({node, ...props}) => (
            <h3 
              id={`heading-${props.index}`} 
              className="text-base font-medium text-gray-800 mt-5 mb-2"
              {...props} 
            />
          ),
          h4: ({node, ...props}) => (
            <h4 
              id={`heading-${props.index}`} 
              className="text-base font-medium text-gray-700 mt-4 mb-2"
              {...props} 
            />
          ),
          
          // 列表项
          ul: ({node, ...props}) => (
            <ul className="list-disc pl-5 my-3 space-y-1" {...props} />
          ),
          ol: ({node, ...props}) => (
            <ol className="list-decimal pl-5 my-3 space-y-1" {...props} />
          ),
          li: ({node, ...props}) => (
            <li className="text-gray-700 mb-1" {...props} />
          ),
          
          // 段落
          p: ({node, ...props}) => (
            <p className="text-gray-700 my-3 leading-relaxed" {...props} />
          ),
          
          // 链接
          a: ({node, href, ...props}) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              {...props} 
            />
          ),
          
          // 代码样式
          pre: ({node, ...props}) => (
            <div className="my-4 overflow-hidden rounded bg-gray-50 border border-gray-200">
              <pre 
                {...props} 
                className="p-3 text-sm overflow-auto"
                style={{ maxHeight: '300px' }}
              />
            </div>
          ),
          code: ({node, inline, className, children, ...props}) => {
            return inline ? (
              <code 
                className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className={`${className || ''} block`} {...props}>
                {children}
              </code>
            );
          },
          
          // 引用
          blockquote: ({node, ...props}) => (
            <blockquote 
              className="border-l-4 border-gray-200 pl-4 py-2 my-4 bg-gray-50 text-gray-700 italic rounded-r"
              {...props} 
            />
          ),
          
          // 表格
          table: ({node, ...props}) => (
            <div className="my-4 overflow-x-auto rounded border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200" {...props} />
            </div>
          ),
          thead: ({node, ...props}) => (
            <thead className="bg-gray-50" {...props} />
          ),
          th: ({node, ...props}) => (
            <th 
              className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-left" 
              {...props} 
            />
          ),
          td: ({node, ...props}) => (
            <td 
              className="px-3 py-2 text-sm text-gray-500 border-t border-gray-100" 
              {...props} 
            />
          ),
          
          // 强调
          strong: ({node, ...props}) => (
            <strong 
              className="font-semibold text-gray-900" 
              {...props} 
            />
          ),
          em: ({node, ...props}) => (
            <em 
              className="text-gray-800 italic" 
              {...props} 
            />
          ),
          
          // 图片
          img: ({node, ...props}) => (
            <div className="flex justify-center my-4">
              <img
                {...props}
                className="max-w-full h-auto rounded border border-gray-200"
                style={{ maxHeight: '400px' }}
                loading="lazy"
              />
            </div>
          ),
          
          // 水平线
          hr: ({node, ...props}) => (
            <hr 
              className="my-6 border-gray-200" 
              {...props} 
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 