import * as React from 'react';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Tabs({ tabs, activeTab, onChange, className = '', style }: TabsProps) {
  return (
    <div 
      className={`pihu-glass-level-2 ${className}`} 
      style={{
        display: 'inline-flex',
        padding: '4px',
        borderRadius: 'var(--pihu-radius-lg, 12px)',
        gap: '4px',
        ...style
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--pihu-radius-md, 8px)',
              border: 'none',
              background: isActive ? 'color-mix(in srgb, var(--pihu-primary) 20%, transparent)' : 'transparent',
              color: isActive ? 'var(--pihu-primary)' : 'var(--pihu-text)',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: isActive ? '0 2px 8px color-mix(in srgb, var(--pihu-primary) 20%, transparent)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = 'color-mix(in srgb, var(--pihu-text) 5%, transparent)';
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = 'transparent';
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
