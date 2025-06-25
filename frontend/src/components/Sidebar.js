import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from 'react-icons/fa';
import menuConfig from '../config/menuConfig';

function Sidebar({ darkMode, sidebarOpen, toggleSidebar }) {
  const role = localStorage.getItem('role') || 'user';
  const location = useLocation();
  const [openMenuTitle, setOpenMenuTitle] = useState('');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const menu = [...(menuConfig[role] || []), ...(menuConfig.common || [])];

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    menu.forEach((item) => {
      if (item.submenu?.some((sub) => sub.path === location.pathname)) {
        setOpenMenuTitle(item.title);
      }
    });
  }, [location.pathname, menu]);

  const handleMenuClick = (title) => {
    setOpenMenuTitle((prev) => (prev === title ? '' : title));
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isDesktop && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          ${isDesktop ? 'relative' : 'fixed top-0 left-0 z-50'}
          h-full bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-700 
          transition-all duration-300 ease-in-out flex flex-col
          ${isDesktop 
            ? (sidebarOpen ? 'w-72' : 'w-20') 
            : (sidebarOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full')
          }
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 flex-shrink-0">
          <div className={`flex items-center space-x-3 transition-all duration-300 ${
            sidebarOpen ? 'opacity-100' : isDesktop ? 'opacity-0' : 'opacity-100'
          }`}>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-bold text-xl">A</span>
            </div>
            {(sidebarOpen || !isDesktop) && (
              <div className="text-white min-w-0">
                <h1 className="font-bold text-lg truncate">AppName</h1>
                <p className="text-xs text-indigo-200 truncate">Admin Panel</p>
              </div>
            )}
          </div>
          
          {/* Close button for mobile */}
          {!isDesktop && (
            <button
              onClick={toggleSidebar}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors duration-200"
            >
              <FaTimes size={16} />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          <nav className="space-y-2">
            {menu.map((item, index) =>
              item.submenu ? (
                <div key={index} className="mb-1">
                  <button
                    onClick={() => handleMenuClick(item.title)}
                    className={`group flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:shadow-md ${
                      openMenuTitle === item.title 
                        ? 'bg-indigo-100 dark:bg-gray-800 text-indigo-700 dark:text-indigo-400 shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}
                    title={item.title}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <item.icon className={`text-lg transition-colors duration-200 flex-shrink-0 ${
                        openMenuTitle === item.title 
                          ? 'text-indigo-600 dark:text-indigo-400' 
                          : 'text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
                      }`} />
                      {(sidebarOpen || !isDesktop) && (
                        <span className="font-medium truncate">
                          {item.title}
                        </span>
                      )}
                    </div>
                    {(sidebarOpen || !isDesktop) && (
                      <div className={`transition-transform duration-200 flex-shrink-0 ${
                        openMenuTitle === item.title ? 'rotate-180' : 'rotate-0'
                      }`}>
                        <FaChevronDown className="text-xs" />
                      </div>
                    )}
                  </button>
                  
                  {/* Submenu */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMenuTitle === item.title && (sidebarOpen || !isDesktop)
                      ? 'max-h-96 opacity-100 mt-2' 
                      : 'max-h-0 opacity-0'
                  }`}>
                    <div className="ml-8 space-y-1 border-l-2 border-indigo-100 dark:border-gray-700 pl-4">
                      {item.submenu.map((sub, i) => (
                        <NavLink
                          key={i}
                          to={sub.path}
                          title={sub.title}
                          className={({ isActive }) =>
                            `group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:shadow-sm hover:translate-x-1 ${
                              isActive
                                ? 'bg-indigo-100 text-indigo-700 dark:bg-gray-800 dark:text-indigo-400 shadow-sm border-l-2 border-indigo-500'
                                : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                            }`
                          }
                        >
                          <sub.icon className={`mr-3 text-base transition-colors duration-200 flex-shrink-0 ${
                            location.pathname === sub.path 
                              ? 'text-indigo-600 dark:text-indigo-400' 
                              : 'text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
                          }`} />
                          <span className="truncate">{sub.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={index}
                  to={item.path}
                  title={item.title}
                  className={({ isActive }) =>
                    `group flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:shadow-md hover:translate-x-1 ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-gray-800 dark:text-indigo-400 shadow-md border-l-4 border-indigo-500'
                        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`
                  }
                >
                  <item.icon className={`text-lg transition-colors duration-200 flex-shrink-0 ${
                    location.pathname === item.path 
                      ? 'text-indigo-600 dark:text-indigo-400' 
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
                  }`} />
                  {(sidebarOpen || !isDesktop) && (
                    <span className="ml-3 font-medium truncate">
                      {item.title}
                    </span>
                  )}
                </NavLink>
              )
            )}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
          <div className={`flex items-center space-x-3 transition-all duration-300 ${
            sidebarOpen || !isDesktop ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                {(role || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
            {(sidebarOpen || !isDesktop) && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {role ? `${role.charAt(0).toUpperCase()}${role.slice(1)}` : 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  user@example.com
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;