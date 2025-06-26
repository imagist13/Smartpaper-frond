import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import History from './pages/History';
import Experience from './pages/Experience';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <div className="app">
        <Toaster />
        <Routes>
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/analyze" element={<MainLayout><AnalyzePage /></MainLayout>} />
          <Route path="/history" element={<MainLayout><History /></MainLayout>} />
          <Route path="/experience" element={<MainLayout><Experience /></MainLayout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
