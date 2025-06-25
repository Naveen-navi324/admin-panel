import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Initialize sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          darkMode={darkMode} 
          sidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'
        }`}>
          {/* Top Navigation Bar */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-4">
                {/* Mobile menu button */}
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200"
                >
                  <FaBars size={20} />
                </button>
                
                {/* Desktop sidebar toggle */}
                <button
                  onClick={toggleSidebar}
                  className="hidden lg:block text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200"
                >
                  <FaBars size={16} />
                </button>
                
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  Dashboard
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Dark mode toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200"
                  title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;