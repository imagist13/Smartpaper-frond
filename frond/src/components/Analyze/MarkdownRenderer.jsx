import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';

/**
 * Markdown 渲染组件
 * 支持 GitHub Flavored Markdown、数学公式、表格等
 * @param {Object} props - 组件属性
 * @param {string} props.content - 要渲染的Markdown内容
 * @param {string} props.className - 额外的CSS类名
 */
const MarkdownRenderer = ({ content, className = "" }) => {
  if (!content) return null;
  
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeSanitize, rehypeRaw, rehypeKatex]}
      className={`prose prose-indigo max-w-none ${className}`}
      components={{
        // 标题样式
        h1: ({node, ...props}) => (
          <h1 id={`heading-${props.index}`} className="text-2xl font-bold mb-4 text-indigo-900 border-b pb-2 border-gray-200" {...props} />
        ),
        h2: ({node, ...props}) => (
          <h2 id={`heading-${props.index}`} className="text-xl font-bold mt-8 mb-4 text-indigo-800" {...props} />
        ),
        h3: ({node, ...props}) => (
          <h3 id={`heading-${props.index}`} className="text-lg font-semibold mt-6 mb-3 text-indigo-700" {...props} />
        ),
        h4: ({node, ...props}) => (
          <h4 id={`heading-${props.index}`} className="text-base font-medium mt-5 mb-2 text-indigo-700" {...props} />
        ),
        h5: ({node, ...props}) => (
          <h5 id={`heading-${props.index}`} className="text-sm font-medium mt-4 mb-1 text-indigo-700" {...props} />
        ),
        h6: ({node, ...props}) => (
          <h6 id={`heading-${props.index}`} className="text-xs font-medium mt-3 mb-1 text-indigo-700" {...props} />
        ),
        
        // 段落样式
        p: ({node, ...props}) => (
          <p className="my-4 leading-relaxed text-gray-700" {...props} />
        ),
        
        // 列表样式
        ul: ({node, ...props}) => (
          <ul className="my-4 ml-5 list-disc space-y-2" {...props} />
        ),
        ol: ({node, ...props}) => (
          <ol className="my-4 ml-5 list-decimal space-y-2" {...props} />
        ),
        li: ({node, ...props}) => (
          <li className="text-gray-700" {...props} />
        ),
        
        // 表格样式
        table: ({node, ...props}) => (
          <div className="overflow-x-auto my-6 border border-gray-200 rounded-md">
            <table className="min-w-full divide-y divide-gray-200" {...props} />
          </div>
        ),
        thead: ({node, ...props}) => (
          <thead className="bg-gray-50" {...props} />
        ),
        th: ({node, ...props}) => (
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
        ),
        tr: ({node, ...props}) => (
          <tr className="bg-white even:bg-gray-50" {...props} />
        ),
        td: ({node, ...props}) => (
          <td className="px-4 py-3 text-sm text-gray-500 whitespace-normal" {...props} />
        ),
        
        // 代码样式
        code: ({node, inline, className, children, ...props}) => {
          return inline ? (
            <code className="px-1.5 py-0.5 rounded text-sm bg-gray-100 text-indigo-700 border border-gray-200" {...props}>
              {children}
            </code>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        pre: ({node, ...props}) => (
          <pre className="p-4 bg-gray-50 border border-gray-200 rounded-md overflow-auto text-sm" {...props} />
        ),
        
        // 引用样式
        blockquote: ({node, ...props}) => (
          <blockquote className="pl-4 border-l-4 border-indigo-200 italic text-gray-600 my-4" {...props} />
        ),
        
        // 链接样式
        a: ({node, ...props}) => (
          <a className="text-indigo-600 hover:text-indigo-800 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
        ),
        
        // 图片样式
        img: ({node, ...props}) => (
          <div className="flex justify-center my-6">
            <img className="max-w-full rounded-lg shadow-md" {...props} alt={props.alt || "图片"} />
          </div>
        ),
        
        // 分割线样式
        hr: ({node, ...props}) => (
          <hr className="my-8 border-gray-200" {...props} />
        ),
        
        // 强调样式
        strong: ({node, ...props}) => (
          <strong className="font-bold text-gray-900" {...props} />
        ),
        em: ({node, ...props}) => (
          <em className="italic text-gray-800" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer; 