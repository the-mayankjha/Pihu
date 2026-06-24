import * as React from 'react';
import { Group, Panel, Separator } from "react-resizable-panels";
import type { LayoutNode, SplitNode, PanelNode } from "@pihu/types";
import { useLayoutStore } from "@pihu/layout-engine";
import { useThemeStore } from "@pihu/theme";
import { SettingsPanel } from "./SettingsPanel";

interface LayoutRendererProps {
  layout: LayoutNode;
}

export function LayoutRenderer({ layout }: LayoutRendererProps) {
  const maximizedPanelId = useLayoutStore(state => state.maximizedPanelId);

  // If a panel is maximized, only render that panel
  if (maximizedPanelId) {
    const isTarget = findPanel(layout, maximizedPanelId);
    if (isTarget) {
      return <PanelRenderer node={isTarget} />;
    }
  }

  if (layout.type === "split") {
    return <SplitRenderer node={layout} />;
  }
  if (layout.type === "panel") {
    return <PanelRenderer node={layout} />;
  }
  return null;
}

function findPanel(node: LayoutNode, id: string): PanelNode | null {
  if (node.id === id && node.type === 'panel') return node as PanelNode;
  if (node.type === 'split') {
    for (const child of node.children) {
      const found = findPanel(child, id);
      if (found) return found;
    }
  }
  return null;
}

function SplitRenderer({ node }: { node: SplitNode }) {
  return (
    <Group
      orientation={node.direction}
      id={node.id}
      style={{ width: '100%', height: '100%' }}
    >
      {node.children.map((child, index) => (
        <React.Fragment key={child.id}>
          {index > 0 && <Separator className="resize-handle" />}
          <Panel
            id={child.id}
            defaultSize={node.sizes[index] || 100 / node.children.length}
          >
            <LayoutRenderer layout={child} />
          </Panel>
        </React.Fragment>
      ))}
    </Group>
  );
}

function PanelRenderer({ node }: { node: PanelNode }) {
  const activePanelId = useLayoutStore(state => state.activePanelId);
  const setActivePanel = useLayoutStore(state => state.setActivePanel);
  const { themes, activeThemeId } = useThemeStore();
  
  const currentTheme = themes[activeThemeId];
  const isActive = activePanelId === node.id;

  const showActiveBorder = currentTheme?.glass?.activePanelBorder ?? true;
  const activeBorderOpacity = currentTheme?.glass?.activePanelBorderOpacity ?? 1.0;
  
  const borderColor = isActive && showActiveBorder 
    ? `color-mix(in srgb, var(--pihu-primary) ${activeBorderOpacity * 100}%, transparent)` 
    : "transparent";

  return (
    <div 
      className={`pihu-glass-level-2 ${isActive ? 'is-active' : ''}`}
      onClick={() => setActivePanel(node.id)}
      style={{ padding: "16px", height: "100%", color: "var(--pihu-text)", border: `1px solid ${borderColor}`, borderRadius: "var(--pihu-radius-md)", boxSizing: "border-box", display: "flex", flexDirection: "column", transition: 'border-color 0.3s ease' }}
    >
      <div style={{ borderBottom: "1px solid var(--pihu-border)", paddingBottom: "8px", marginBottom: "8px", fontWeight: "bold", display: "flex", gap: "8px" }}>
        {node.tabs.map(tab => (
          <span key={tab} style={{ color: tab === node.activeTab ? 'var(--pihu-primary)' : 'var(--pihu-text)', opacity: tab === node.activeTab ? 1 : 0.6, cursor: 'pointer' }}>
            {tab}
          </span>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: 'hidden' }}>
        {node.activeTab === 'settings' ? <SettingsPanel /> : 'Panel Content'}
      </div>
    </div>
  );
}
