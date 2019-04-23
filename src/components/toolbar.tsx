import * as React from 'react';

interface ToolbarProps {
  justifyContent?: string;
  flexFlow?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({ children, justifyContent, flexFlow }) => (
  <div style={{ minHeight: 56, display: 'flex', alignItems: 'center', justifyContent, flexFlow }}>
    {children}
  </div>
);
