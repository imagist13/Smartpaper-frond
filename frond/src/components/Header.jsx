import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/logo.svg" 
            alt="SmartPaper Logo" 
            className="h-8 w-8"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/32';
            }}
          />
          <Link to="/" className="text-xl font-bold text-blue-600">SmartPaper</Link>
        </div>
        
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                主页
              </Link>
            </li>
            <li>
              <Link to="/analyze" className="text-gray-600 hover:text-blue-600 transition-colors">
                论文分析
              </Link>
            </li>
            <li>
              <Link to="/history" className="text-gray-600 hover:text-blue-600 transition-colors">
                历史记录
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 