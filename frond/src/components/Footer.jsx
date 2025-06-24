const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} SmartPaper. 保留所有权利。
            </p>
          </div>
          <div className="flex space-x-4">
            <a 
              href="https://github.com/your-username/smartpaper" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="/docs" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              文档
            </a>
            <a 
              href="/about" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              关于
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 