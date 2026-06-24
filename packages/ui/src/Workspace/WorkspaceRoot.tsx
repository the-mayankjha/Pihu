import React, { useEffect } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { useLayoutStore } from '@pihu/layout-engine';
import { LayoutRenderer } from './LayoutRenderer';
import { SettingsPreviewSidebar } from './SettingsPreviewSidebar';
import { useSettingsUIStore } from './SettingsUIStore';
import { LiquidGlassSVGProvider } from './LiquidGlassSVGProvider';
import { Dock } from '../components';

export function WorkspaceRoot() {
  const { workspaces, activeWorkspaceId } = useLayoutStore();
  const { isSettingsOpen, activeTab, setSettingsOpen } = useSettingsUIStore();

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
      <Panel className="pihu-glass-level-3" defaultSize="20%" minSize="15%" maxSize="25%" style={{ borderRight: '1px solid var(--pihu-border)' }}>
        <div style={{ padding: '16px', color: 'var(--pihu-text)' }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--pihu-primary)', fontSize: '14px' }}>{workspace.name} Navs</h3>
          <p style={{ fontSize: '12px', opacity: 0.7 }}>Intent: {workspace.intent || 'General purpose'}</p>
          <div style={{ marginTop: '24px', opacity: 0.5 }}>
            Left Sidebar Widgets
          </div>
        </div>
      </Panel>
      
      <Separator style={{ width: '4px', background: 'transparent', cursor: 'col-resize' }} />

      {/* Center Container */}
      <Panel style={{ background: 'transparent' }}>
        <LayoutRenderer layout={workspace.centerLayout} />
      </Panel>

      <Separator style={{ width: '4px', background: 'transparent', cursor: 'col-resize' }} />

      {/* Right Container */}
      <Panel className="pihu-glass-level-3" defaultSize="15%" minSize="15%" maxSize="20%" style={{ borderLeft: '1px solid var(--pihu-border)' }}>
        {isSettingsOpen && activeTab === 'appearance' ? (
          <SettingsPreviewSidebar />
        ) : (
          <div style={{ padding: '16px', color: 'var(--pihu-text)' }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--pihu-primary)', fontSize: '14px' }}>Tools & Inspect</h3>
            <div style={{ marginTop: '24px', opacity: 0.5 }}>
              Right Sidebar Widgets
            </div>
          </div>
        )}
      </Panel>

      </Group>
      <Dock />
    </>
  );
}
