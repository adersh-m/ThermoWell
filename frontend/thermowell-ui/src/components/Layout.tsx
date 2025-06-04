import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
  hideTopBar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideTopBar }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="flex">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className={`flex-1 flex flex-col transition-all duration-200 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {!hideTopBar && <TopBar />}
        <main className="flex-1 px-0 md:px-10 py-8 bg-gray-50">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 p-8 mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* <div className="flex gap-6 text-sm">
              <a href="/dashboard" className="text-gray-500 hover:text-primary-500 transition-colors">Dashboard</a>
              <a href="/advisories" className="text-gray-500 hover:text-primary-500 transition-colors">Advisories</a>
              <a href="/alerts" className="text-gray-500 hover:text-primary-500 transition-colors">Alerts</a>
              <a href="/resources" className="text-gray-500 hover:text-primary-500 transition-colors">Resources</a>
              <a href="/tips" className="text-gray-500 hover:text-primary-500 transition-colors">Tips</a>
              <a href="/settings" className="text-gray-500 hover:text-primary-500 transition-colors">Settings</a>
              <a href="/help" className="text-gray-500 hover:text-primary-500 transition-colors">Help</a>
            </div> */}
            <div className="text-gray-400 text-xs text-center md:text-center w-full md:w-auto">© {new Date().getFullYear()} ThermoWell. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
