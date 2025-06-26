import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
>>>>>>> 63483267648195cff784cdfe286eadeedbc2d1cd
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import History from './pages/History';
import Experience from './pages/Experience';
<<<<<<< HEAD
=======
import { Toaster } from './components/ui/toaster';
>>>>>>> 63483267648195cff784cdfe286eadeedbc2d1cd

function App() {
  return (
    <Router>
<<<<<<< HEAD
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
=======
      <div className="app">
        <Toaster />
        <Routes>
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/analyze" element={<MainLayout><AnalyzePage /></MainLayout>} />
          <Route path="/history" element={<MainLayout><History /></MainLayout>} />
          <Route path="/experience" element={<MainLayout><Experience /></MainLayout>} />
        </Routes>
>>>>>>> 63483267648195cff784cdfe286eadeedbc2d1cd
      </div>
    </Router>
  );
}

export default App;
