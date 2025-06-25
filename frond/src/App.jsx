import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  createRoutesFromElements, 
  Route,
  Outlet
} from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import History from './pages/History';
import Footer from './components/Footer/Footer';

// 根布局组件
const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

// 首页路由 - 包含自己的Footer
const HomeRoute = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <HomePage />;
};

// 其他页面路由 - 包含公共Footer
const PageWithFooter = ({ Component }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Component />
      <Footer />
    </>
  );
};

// 创建路由器，使用future flags
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomeRoute />} />
      <Route path="analyze" element={<PageWithFooter Component={AnalyzePage} />} />
      <Route path="history" element={<PageWithFooter Component={History} />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
