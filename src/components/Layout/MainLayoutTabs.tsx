import { useState } from 'react';
import './MainLayoutTabs.css';

interface MainLayoutTabsProps {
  sidebar: React.ReactNode;
  infoContent: React.ReactNode;
  canvasContent: React.ReactNode;
}

type ActiveTab = 'info' | 'canvas';

export function MainLayoutTabs({ sidebar, infoContent, canvasContent }: MainLayoutTabsProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('canvas');

  return (
    <div className="main-layout-tabs">
      <div className="sidebar-left">
        {sidebar}
      </div>
      <div className="main-content">
        <div className="tab-header">
          <button
            className={`tab-button ${activeTab === 'canvas' ? 'active' : ''}`}
            onClick={() => setActiveTab('canvas')}
          >
            <span className="tab-icon">📊</span>
            图形显示
          </button>
          <button
            className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <span className="tab-icon">📖</span>
            图形介绍
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'canvas' ? canvasContent : infoContent}
        </div>
      </div>
    </div>
  );
}
