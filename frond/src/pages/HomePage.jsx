import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          智能论文分析助手
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          使用先进的AI技术，快速理解、分析和总结学术论文，提升您的研究效率
        </p>
        <Link
          to="/analyze"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          开始分析
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          核心功能
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">快速论文解析</h3>
            <p className="text-gray-600">
              输入论文URL或上传PDF，AI助手将快速解析并提取关键信息，为您节省宝贵时间
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">多种分析模板</h3>
            <p className="text-gray-600">
              根据不同研究领域和分析需求，选择专业的提示词模板，获取定制化的分析结果
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">结果导出分享</h3>
            <p className="text-gray-600">
              分析结果支持多种格式导出，方便您保存、整理和与同事分享重要的研究发现
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          准备好提升您的研究效率了吗？
        </h2>
        <p className="text-gray-600 mb-6">
          立即体验SmartPaper智能论文分析，让AI成为您的研究助手
        </p>
        <Link
          to="/analyze"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          立即开始
        </Link>
      </section>
    </div>
  );
};

export default HomePage; 