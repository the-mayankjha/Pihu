import React, { useState, useEffect } from 'react';
import { WidgetCard } from './WidgetCard';
import { Badge } from './Badge';
import { useSettingsUIStore } from '../Workspace/SettingsUIStore';
import { useLayoutStore } from '@pihu/layout-engine';
import { Sun, Sunrise, MoonStar } from 'lucide-react';

export function WelcomeWidget() {
  const { userName } = useSettingsUIStore();
  const { activeWorkspaceId, workspaces } = useLayoutStore();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };
    updateGreeting();
    
    // Update greeting every minute just in case the period changes
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const activeWorkspace = activeWorkspaceId ? workspaces[activeWorkspaceId] : null;
  const workspaceName = activeWorkspace ? activeWorkspace.name : 'Unknown Workspace';

  const hour = new Date().getHours();
  
  let TimeIcon = Sun;
  let iconColor = '#F59E0B'; // Yellow/Orange
  
  if (hour < 12) {
    TimeIcon = Sunrise;
    iconColor = '#FBBF24';
  } else if (hour >= 18) {
    TimeIcon = MoonStar;
    iconColor = '#818CF8';
  }

  return (
    <WidgetCard
      widgetId="welcome"
      draggable={true}
      resizable={true}
      frosted={true}
      removable={true}
      style={{ padding: '32px 16px', containerType: 'inline-size' }}
    >
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Glowing Icon Avatar */}
        <div style={{ 
          width: '64px', 
          height: '64px', 
          borderRadius: '50%', 
          background: `color-mix(in srgb, ${iconColor} 15%, transparent)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 20px color-mix(in srgb, ${iconColor} 30%, transparent), inset 0 0 10px color-mix(in srgb, ${iconColor} 20%, transparent)`,
          border: `1px solid color-mix(in srgb, ${iconColor} 30%, transparent)`
        }}>
          <TimeIcon size={32} color={iconColor} strokeWidth={1.5} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: 'clamp(14px, 7cqi, 18px)', 
            fontWeight: '500', 
            color: 'color-mix(in srgb, var(--pihu-text) 80%, transparent)',
            lineHeight: '1.2'
          }}>
            {greeting},
          </h2>
          <div style={{ 
            fontSize: 'clamp(18px, 10cqi, 26px)', 
            fontWeight: '800', 
            color: 'var(--pihu-primary)',
            wordBreak: 'break-word',
            letterSpacing: '-0.02em'
          }}>
            {userName}
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px', 
          alignItems: 'center',
          background: 'rgba(0,0,0,0.1)',
          padding: '12px 16px',
          borderRadius: '16px',
          width: '100%',
          boxSizing: 'border-box',
          marginTop: '8px',
          border: '1px solid color-mix(in srgb, var(--pihu-border) 50%, transparent)'
        }}>
          <p style={{ margin: 0, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold', color: 'color-mix(in srgb, var(--pihu-text) 50%, transparent)' }}>
            Current Workspace
          </p>
          <Badge 
            variant="outline"
            style={{ 
              alignSelf: 'center',
              fontSize: '13px',
              padding: '6px 16px',
              background: 'color-mix(in srgb, var(--pihu-surface) 50%, transparent)'
            }}
          >
            {workspaceName}
          </Badge>
        </div>
      </div>
    </WidgetCard>
  );
}
