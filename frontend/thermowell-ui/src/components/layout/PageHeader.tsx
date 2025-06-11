import React, { type ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {actions && <div>{actions}</div>}
    </div>
    {subtitle && (
      <p className="mt-1 text-gray-600 dark:text-gray-400">{subtitle}</p>
    )}
  </div>
);

export default PageHeader;
