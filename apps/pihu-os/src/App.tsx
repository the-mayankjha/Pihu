import { useEffect, useMemo } from 'react';
import { WorkspaceRoot } from '@pihu/ui';
import type { LayoutNode, Workspace } from '@pihu/types';
import { useLayoutStore, registerLayoutCommands } from '@pihu/layout-engine';
import { KeybindingManager } from '@pihu/keybinding-engine';
import { Kernel, SimpleCommandBus } from '@pihu/kernel';
import type { EventBus, ServiceRegistry } from '@pihu/kernel';
import { useThemeStore } from '@pihu/theme';
import './App.css';

const initialLayout1: LayoutNode = {
  type: "split",
  id: "root-split-1",
  direction: "horizontal",
  sizes: [70, 30],
  children: [
    { type: "panel", id: "editor-1", tabs: ["fkvim"], activeTab: "fkvim" },
    { type: "panel", id: "terminal-1", tabs: ["fkterm"], activeTab: "fkterm" }
  ]
};

const initialLayout2: LayoutNode = {
  type: "panel",
  id: "browser-1",
  tabs: ["browser"],
  activeTab: "browser"
};

const initialWorkspaces: Workspace[] = [
  {
    id: 'ws-1',
    name: 'Development',
    icon: 'code',
    intent: 'Main workspace for coding, text editing, and running terminal commands.',
    centerLayout: initialLayout1
  },
  {
    id: 'ws-2',
    name: 'Research',
    icon: 'globe',
    intent: 'Workspace for web browsing, documentation reading, and research tasks.',
    centerLayout: initialLayout2
  }
];

function App() {
  const kernel = useMemo(() => {
    const commandBus = new SimpleCommandBus();
    const k = new Kernel({} as EventBus, commandBus, {} as ServiceRegistry);
    registerLayoutCommands(k.commands);
    const keyManager = new KeybindingManager(k.commands);
    return { kernel: k, keyManager };
  }, []);

  useEffect(() => {
    useThemeStore.getState().init();
    useLayoutStore.getState().initWorkspaces(initialWorkspaces, 'ws-1');
    if (!useLayoutStore.getState().activePanelId) {
      useLayoutStore.getState().setActivePanel("editor-1");
    }
    
    kernel.keyManager.startListening();
    return () => {
      kernel.keyManager.stopListening();
    };
  }, [kernel]);

  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0, background: "transparent" }}>
      <WorkspaceRoot />
    </div>
  );
}

export default App;
