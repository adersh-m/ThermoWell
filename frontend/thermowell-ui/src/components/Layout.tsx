import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container" style={{
      display: 'flex',
      minHeight: '100vh'
    }}>
      <Sidebar />
      <main style={{
        flex: 1,
        padding: '40px',
        backgroundColor: 'var(--color-background)'
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
