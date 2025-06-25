import React from 'react';

const AnalysisResult1 = () => {
  return (
    <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="#f8fafc" />
      
      {/* 标题区域 */}
      <rect x="40" y="30" width="720" height="60" rx="8" fill="#4338ca" />
      <text x="60" y="70" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="white">
        论文分析报告: Attention Is All You Need
      </text>
      
      {/* 摘要区域 */}
      <rect x="40" y="110" width="720" height="100" rx="8" fill="#eef2ff" />
      <text x="60" y="140" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#312e81">
        摘要
      </text>
      <text x="60" y="170" fontFamily="Arial" fontSize="14" fill="#1e293b">
        <tspan x="60" dy="0">本论文提出了一种全新的简单网络架构Transformer，完全基于注意力</tspan>
        <tspan x="60" dy="20">机制，摒弃了循环和卷积。在机器翻译任务上，新模型更加并行化，</tspan>
        <tspan x="60" dy="20">训练更快，并取得了更好的性能。</tspan>
      </text>
      
      {/* 关键贡献 */}
      <rect x="40" y="230" width="350" height="150" rx="8" fill="#e0e7ff" />
      <text x="60" y="260" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#312e81">
        主要贡献
      </text>
      <circle cx="70" cy="290" r="5" fill="#4f46e5" />
      <text x="85" y="295" fontFamily="Arial" fontSize="14" fill="#1e293b">提出了自注意力机制</text>
      <circle cx="70" cy="320" r="5" fill="#4f46e5" />
      <text x="85" y="325" fontFamily="Arial" fontSize="14" fill="#1e293b">设计了多头注意力结构</text>
      <circle cx="70" cy="350" r="5" fill="#4f46e5" />
      <text x="85" y="355" fontFamily="Arial" fontSize="14" fill="#1e293b">实现了并行计算提高效率</text>
      
      {/* 性能指标 */}
      <rect x="410" y="230" width="350" height="150" rx="8" fill="#dbeafe" />
      <text x="430" y="260" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#1e40af">
        性能评估
      </text>
      
      {/* 柱状图 */}
      <rect x="450" y="280" width="40" height="80" fill="#3b82f6" />
      <rect x="510" y="300" width="40" height="60" fill="#3b82f6" />
      <rect x="570" y="290" width="40" height="70" fill="#3b82f6" />
      <rect x="630" y="270" width="40" height="90" fill="#3b82f6" />
      
      <line x1="430" y1="360" x2="700" y2="360" stroke="#64748b" strokeWidth="2" />
      
      <text x="460" y="380" fontFamily="Arial" fontSize="12" fill="#1e293b" textAnchor="middle">BLEU</text>
      <text x="520" y="380" fontFamily="Arial" fontSize="12" fill="#1e293b" textAnchor="middle">ROUGE</text>
      <text x="580" y="380" fontFamily="Arial" fontSize="12" fill="#1e293b" textAnchor="middle">METEOR</text>
      <text x="640" y="380" fontFamily="Arial" fontSize="12" fill="#1e293b" textAnchor="middle">Transformer</text>
      
      {/* 模型架构 */}
      <rect x="40" y="400" width="720" height="170" rx="8" fill="#ede9fe" />
      <text x="60" y="430" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#5b21b6">
        Transformer架构
      </text>
      
      {/* 简化的Transformer架构图 */}
      <rect x="130" y="450" width="120" height="90" rx="5" stroke="#7c3aed" strokeWidth="2" fill="white" />
      <text x="190" y="495" fontFamily="Arial" fontSize="14" fill="#5b21b6" textAnchor="middle">编码器</text>
      
      <rect x="450" y="450" width="120" height="90" rx="5" stroke="#7c3aed" strokeWidth="2" fill="white" />
      <text x="510" y="495" fontFamily="Arial" fontSize="14" fill="#5b21b6" textAnchor="middle">解码器</text>
      
      <line x1="250" y1="495" x2="450" y2="495" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5,5" />
      <polygon points="440,490 450,495 440,500" fill="#7c3aed" />
      
      {/* 自注意力标识 */}
      <rect x="140" y="460" width="100" height="25" rx="3" fill="#ddd6fe" />
      <text x="190" y="477" fontFamily="Arial" fontSize="12" fill="#5b21b6" textAnchor="middle">自注意力</text>
      
      <rect x="140" y="505" width="100" height="25" rx="3" fill="#ddd6fe" />
      <text x="190" y="522" fontFamily="Arial" fontSize="12" fill="#5b21b6" textAnchor="middle">前馈神经网络</text>
      
      <rect x="460" y="460" width="100" height="25" rx="3" fill="#ddd6fe" />
      <text x="510" y="477" fontFamily="Arial" fontSize="12" fill="#5b21b6" textAnchor="middle">自注意力</text>
      
      <rect x="460" y="505" width="100" height="25" rx="3" fill="#ddd6fe" />
      <text x="510" y="522" fontFamily="Arial" fontSize="12" fill="#5b21b6" textAnchor="middle">前馈神经网络</text>
    </svg>
  );
};

export default AnalysisResult1; 