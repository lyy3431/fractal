import type { ReactNode } from 'react';
import './MainLayout.css';

interface MainLayoutProps {
  sidebar: ReactNode;
  info: ReactNode;
  canvas: ReactNode;
}

export function MainLayout({ sidebar, info, canvas }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <div className="sidebar-left">
        {sidebar}
      </div>
      <div className="sidebar-info">
        {info}
      </div>
      <div className="canvas-area">
        {canvas}
      </div>
    </div>
  );
}
