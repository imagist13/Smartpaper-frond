import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import History from './pages/History';
import Experience from './pages/Experience';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/history" element={<History />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/about" element={<div className="container mx-auto p-6"><h1 className="text-2xl font-bold">关于我们</h1></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
