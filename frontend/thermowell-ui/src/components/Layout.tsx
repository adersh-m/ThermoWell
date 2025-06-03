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
      </div>
    </div>
  );
};

export default Layout;
