import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '⚠️', label: 'Advisories', path: '/advisories' },
    { icon: '🌡️', label: 'Health Score', path: '/health-score' },
    { icon: '📍', label: 'Tips', path: '/tips' },
    { icon: '📚', label: 'Resources', path: '/resources' }
  ];

  const supportItems = [
    { icon: '❓', label: 'Help', path: '/help' },
    { icon: '⚙️', label: 'Settings', path: '/settings' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav style={{
      width: '240px',
      backgroundColor: 'var(--color-card)',
      borderRight: 'var(--border-card)',
      padding: '20px 0'
    }}>
      <div style={{
        padding: '0 20px 30px',
        fontSize: '16px',
        fontWeight: '600',
        color: 'var(--color-primary-text)'
      }}>
        Heatwave Health
      </div>

      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px',
            color: isActive(item.path) ? 'var(--color-primary-text)' : 'var(--color-secondary-text)',
            textDecoration: 'none',
            fontSize: '14px',
            backgroundColor: isActive(item.path) ? '#e9ecef' : 'transparent',
            transition: 'background-color 0.2s'
          }}
        >
          <span style={{ marginRight: '12px', opacity: 0.7 }}>{item.icon}</span>
          {item.label}
        </Link>
      ))}

      <div style={{
        marginTop: '30px',
        padding: '0 20px',
        color: 'var(--color-tertiary-text)',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '10px'
      }}>
        Support
      </div>

      {supportItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px',
            color: isActive(item.path) ? 'var(--color-primary-text)' : 'var(--color-secondary-text)',
            textDecoration: 'none',
            fontSize: '14px',
            backgroundColor: isActive(item.path) ? '#e9ecef' : 'transparent',
            transition: 'background-color 0.2s'
          }}
        >
          <span style={{ marginRight: '12px', opacity: 0.7 }}>{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;
