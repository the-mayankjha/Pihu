import React, { useEffect } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { useLayoutStore } from '@pihu/layout-engine';
import { LayoutRenderer } from './LayoutRenderer';
import { SettingsPreviewSidebar } from './SettingsPreviewSidebar';
import { useSettingsUIStore } from './SettingsUIStore';
import { LiquidGlassSVGProvider } from './LiquidGlassSVGProvider';
import { Dock, OrbWidget, WelcomeWidget } from '../components';

export function WorkspaceRoot() {
  const { workspaces, activeWorkspaceId, leftWidgets, rightWidgets, moveWidget } = useLayoutStore();
  const { isSettingsOpen, activeTab, setSettingsOpen } = useSettingsUIStore();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, target: 'left' | 'right') => {
    e.preventDefault();
    const widgetId = e.dataTransfer.getData('widgetId');
    if (widgetId) {
      moveWidget(widgetId, target);
    }
  };

  const renderWidget = (id: string) => {
    switch (id) {
      case 'orb': return <OrbWidget key="orb" />;
      case 'welcome': return <WelcomeWidget key="welcome" />;
      default: return null;
    }
  };

  useEffect(() => {
    // Only run in Tauri environment
    if (window.__TAURI__) {
      import('@tauri-apps/api/event').then(({ listen }) => {
        listen('open-settings', () => {
          setSettingsOpen(true);
        });
      });
    }
  }, [setSettingsOpen]);

  if (!activeWorkspaceId) {
    return <div style={{ color: '#fff', padding: '24px' }}>No Active Workspace</div>;
  }

  const workspace = workspaces[activeWorkspaceId];
  if (!workspace) {
    return <div style={{ color: '#fff', padding: '24px' }}>Workspace Not Found</div>;
  }

  return (
    <>
      <LiquidGlassSVGProvider />
      <Group orientation="horizontal" style={{ height: '100%', width: '100%', background: 'transparent' }}>
        
      {/* Left Container */}
      <Panel defaultSize="20%" minSize="15%" maxSize="25%" style={{ background: 'transparent', borderRight: '1px solid var(--pihu-border)' }}>
        <div 
          style={{ padding: '16px', color: 'var(--pihu-text)', height: '100%', overflow: 'hidden', boxSizing: 'border-box' }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'left')}
        >
          {leftWidgets.map(renderWidget)}
          
          
          {leftWidgets.length === 0 && (
            <div style={{ marginTop: '24px', opacity: 0.3, border: '1px dashed var(--pihu-border)', padding: '24px', textAlign: 'center', borderRadius: '12px' }}>
              Drop Widgets Here
            </div>
          )}
        </div>
      </Panel>
      
      <Separator style={{ width: '4px', background: 'transparent', cursor: 'col-resize' }} />

      {/* Center Container */}
      <Panel style={{ background: 'transparent' }}>
        <LayoutRenderer layout={workspace.centerLayout} />
      </Panel>

      <Separator style={{ width: '4px', background: 'transparent', cursor: 'col-resize' }} />

      {/* Right Container */}
      <Panel defaultSize="15%" minSize="15%" maxSize="20%" style={{ background: 'transparent', borderLeft: '1px solid var(--pihu-border)' }}>
        {isSettingsOpen && activeTab === 'appearance' ? (
          <SettingsPreviewSidebar />
        ) : (
          <div 
            style={{ padding: '16px', color: 'var(--pihu-text)', height: '100%', overflow: 'hidden', boxSizing: 'border-box' }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'right')}
          >
            {rightWidgets.map(renderWidget)}
            
            
            {rightWidgets.length === 0 && (
              <div style={{ marginTop: '24px', opacity: 0.3, border: '1px dashed var(--pihu-border)', padding: '24px', textAlign: 'center', borderRadius: '12px' }}>
                Drop Widgets Here
              </div>
            )}
          </div>
        )}
      </Panel>

      </Group>
      <Dock />
    </>
  );
}
