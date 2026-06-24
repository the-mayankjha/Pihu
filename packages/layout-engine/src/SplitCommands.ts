import type { CommandBus } from '@pihu/kernel';
import { useLayoutStore } from './LayoutStore';

export function registerLayoutCommands(commandBus: CommandBus) {
  commandBus.register('layout:split', (payload: { direction: 'horizontal' | 'vertical', panelId?: string }) => {
    const { direction, panelId } = payload;
    const targetId = panelId || useLayoutStore.getState().activePanelId;
    if (targetId) {
      useLayoutStore.getState().splitPanel(targetId, direction);
    }
  });

  commandBus.register('layout:focus', (payload: { direction: 'up' | 'down' | 'left' | 'right' }) => {
    useLayoutStore.getState().navigateFocus(payload.direction);
  });

  commandBus.register('layout:maximize', (payload?: { panelId?: string }) => {
    const targetId = payload?.panelId || useLayoutStore.getState().activePanelId;
    if (targetId) {
      useLayoutStore.getState().toggleMaximize(targetId);
    }
  });

  commandBus.register('layout:open-settings', () => {
    // We will open the Settings tab in the currently active panel
    const activePanelId = useLayoutStore.getState().activePanelId;
    if (activePanelId) {
      // Find the active panel and add the tab. For now, we dispatch an event or update state.
      // We need an openTab function in LayoutStore. Let's add it there or just modify the state directly here.
      useLayoutStore.setState((state) => {
        if (!state.activeWorkspaceId) return state;
        const workspace = state.workspaces[state.activeWorkspaceId];
        if (!workspace || !workspace.centerLayout) return state;
        const newLayout = JSON.parse(JSON.stringify(workspace.centerLayout));
        
        function addTabToPanel(node: any): boolean {
          if (node.id === activePanelId) {
            if (!node.tabs.includes('settings')) {
              node.tabs.push('settings');
            }
            node.activeTab = 'settings';
            return true;
          }
          if (node.type === 'split') {
            for (const child of node.children) {
              if (addTabToPanel(child)) return true;
            }
          }
          return false;
        }

        addTabToPanel(newLayout);
        return { 
          workspaces: {
            ...state.workspaces,
            [state.activeWorkspaceId]: { ...workspace, centerLayout: newLayout }
          }
        };
      });
    }
  });

  commandBus.register('layout:close-tab', (payload?: { panelId?: string, tabName?: string }) => {
    const targetId = payload?.panelId || useLayoutStore.getState().activePanelId;
    if (targetId) {
      useLayoutStore.getState().closeTab(targetId, payload?.tabName);
    }
  });

  commandBus.register('workspace:switch', (payload: { id: string }) => {
    useLayoutStore.getState().switchWorkspace(payload.id);
  });
}
