import * as React from 'react';
import { FrostedCard } from './FrostedCard';
import { motion, useMotionValue } from 'framer-motion';
import { DockIcon } from './DockIcon';
import { SettingsIcon } from './SettingsIcon';
import { TaskIcon } from './TaskIcon';
import { TerminalIcon } from './TerminalIcon';
import { useThemeStore } from '@pihu/theme';
import { useSettingsUIStore } from '../Workspace/SettingsUIStore';
import { useLayoutStore } from '@pihu/layout-engine';

export function Dock() {
  const { themes, activeThemeId } = useThemeStore();
  const { activePanelId, addTab, moveWidget, leftWidgets, rightWidgets, removeWidget } = useLayoutStore();
  const currentTheme = themes[activeThemeId];
  
  if (!currentTheme) return null;

  const isDark = currentTheme.mode === 'dark';
  const mouseX = useMotionValue<number | null>(null);

  const imgStyle: React.CSSProperties = { 
    width: '100%', 
    height: '100%', 
    objectFit: 'contain', 
    pointerEvents: 'none',
    filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.2))'
  };

  const { setSettingsOpen } = useSettingsUIStore();

  const apps = [
    { icon: <TaskIcon style={imgStyle} />, name: 'Tasks', onClick: () => {} },
    { icon: <img src="/icons/widget.png" style={imgStyle} alt="Widgets" />, name: 'Widgets', onClick: () => {
      const hasOrb = leftWidgets.includes('orb') || rightWidgets.includes('orb');
      const hasWelcome = leftWidgets.includes('welcome') || rightWidgets.includes('welcome');
      
      if (hasOrb || hasWelcome) {
        if (hasOrb) removeWidget('orb');
        if (hasWelcome) removeWidget('welcome');
      } else {
        moveWidget('orb', 'left');
        moveWidget('welcome', 'right');
      }
    } },
    { icon: <TerminalIcon style={imgStyle} />, name: 'Terminal', onClick: () => {} },
    { icon: <img src="/icons/ytmusic.svg" style={imgStyle} alt="YouTube Music" />, name: 'Music', onClick: () => {} },
    { icon: <SettingsIcon style={imgStyle} />, name: 'Settings', onClick: () => {
      // Add 'settings' tab. LayoutStore will automatically find a panel if activePanelId is null.
      addTab(activePanelId, 'settings');
    } },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <FrostedCard 
        onMouseMove={(e: React.MouseEvent) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(null)}
        style={{
          borderRadius: '32px',
          padding: '12px 16px',
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-end',
          height: '72px',
          boxSizing: 'border-box',
        }}
      >
        {apps.map((app, index) => (
          <div key={index} onClick={app.onClick}>
            <DockIcon 
              index={index}
              totalIcons={apps.length}
              mouseX={mouseX} 
              icon={app.icon} 
              name={app.name} 
              isDark={isDark} 
            />
          </div>
        ))}
      </FrostedCard>
    </div>
  );
}
