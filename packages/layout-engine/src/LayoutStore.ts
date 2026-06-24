import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LayoutNode, SplitNode, PanelNode, Workspace } from '@pihu/types';

export interface LayoutState {
  workspaces: Record<string, Workspace>;
  activeWorkspaceId: string | null;
  activePanelId: string | null;
  maximizedPanelId: string | null;

  initWorkspaces: (workspaces: Workspace[], activeId: string) => void;
  switchWorkspace: (id: string) => void;

  setCenterLayout: (layout: LayoutNode) => void;
  setActivePanel: (id: string) => void;
  toggleMaximize: (id?: string) => void;
  splitPanel: (id: string, direction: 'horizontal' | 'vertical') => void;
  navigateFocus: (direction: 'up' | 'down' | 'left' | 'right') => void;
  addTab: (panelId: string | null, tabName: string) => void;
  closeTab: (panelId: string, tabName?: string) => void;
}

function findParentSplit(
  node: LayoutNode,
  targetId: string,
  parent: SplitNode | null = null,
  indexInParent: number = -1
): { parent: SplitNode | null; index: number; target: LayoutNode } | null {
  if (node.id === targetId) return { parent, index: indexInParent, target: node };
  if (node.type === 'split') {
    for (let i = 0; i < node.children.length; i++) {
      const result = findParentSplit(node.children[i], targetId, node, i);
      if (result) return result;
    }
  }
  return null;
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set, get) => ({
  workspaces: {},
  activeWorkspaceId: null,
  activePanelId: null,
  maximizedPanelId: null,

  initWorkspaces: (workspaces, activeId) => {
    set((state) => {
      // If we already have persisted workspaces, don't overwrite them
      if (Object.keys(state.workspaces).length > 0) return state;
      
      const wsRecord: Record<string, Workspace> = {};
      workspaces.forEach(w => wsRecord[w.id] = w);
      return { workspaces: wsRecord, activeWorkspaceId: activeId };
    });
  },

  switchWorkspace: (id) => {
    set({ activeWorkspaceId: id, activePanelId: null, maximizedPanelId: null });
  },

  setCenterLayout: (layout) => set((state) => {
    if (!state.activeWorkspaceId) return state;
    const workspaces = { ...state.workspaces };
    workspaces[state.activeWorkspaceId] = {
      ...workspaces[state.activeWorkspaceId],
      centerLayout: layout
    };
    return { workspaces };
  }),

  setActivePanel: (id) => set({ activePanelId: id }),

  toggleMaximize: (id) => {
    const targetId = id || get().activePanelId;
    if (!targetId) return;

    set((state) => ({
      maximizedPanelId: state.maximizedPanelId === targetId ? null : targetId
    }));
  },

  splitPanel: (id, direction) => {
    set((state) => {
      if (!state.activeWorkspaceId) return state;
      const workspace = state.workspaces[state.activeWorkspaceId];
      if (!workspace || !workspace.centerLayout) return state;

      const newLayout = cloneDeep(workspace.centerLayout);
      const found = findParentSplit(newLayout, id);
      if (!found) return state;

      const { parent, index, target } = found;

      const newPanelId = `panel-${generateId()}`;
      const newPanel: PanelNode = {
        type: 'panel',
        id: newPanelId,
        tabs: ['new-tab'],
        activeTab: 'new-tab'
      };

      const newSplit: SplitNode = {
        type: 'split',
        id: `split-${generateId()}`,
        direction,
        sizes: [50, 50],
        children: [target, newPanel]
      };

      let finalLayout = newLayout;
      if (!parent) {
        finalLayout = newSplit;
      } else {
        parent.children[index] = newSplit;
      }

      return {
        workspaces: {
          ...state.workspaces,
          [state.activeWorkspaceId]: { ...workspace, centerLayout: finalLayout }
        },
        activePanelId: newPanelId
      };
    });
  },

  navigateFocus: (direction) => {
    const { workspaces, activeWorkspaceId, activePanelId } = get();
    if (!activeWorkspaceId || !activePanelId) return;
    const layout = workspaces[activeWorkspaceId]?.centerLayout;
    if (!layout) return;

    const path: { node: SplitNode; index: number }[] = [];
    function findPath(current: LayoutNode, targetId: string): boolean {
      if (current.id === targetId) return true;
      if (current.type === 'split') {
        for (let i = 0; i < current.children.length; i++) {
          path.push({ node: current, index: i });
          if (findPath(current.children[i], targetId)) return true;
          path.pop();
        }
      }
      return false;
    }

    if (!findPath(layout, activePanelId)) return;

    const axis = (direction === 'left' || direction === 'right') ? 'horizontal' : 'vertical';
    const delta = (direction === 'left' || direction === 'up') ? -1 : 1;

    for (let i = path.length - 1; i >= 0; i--) {
      const step = path[i];
      if (step.node.direction === axis) {
        const nextIndex = step.index + delta;
        if (nextIndex >= 0 && nextIndex < step.node.children.length) {
          let nextNode = step.node.children[nextIndex];
          while (nextNode.type === 'split') {
            const childIndex = delta > 0 ? 0 : nextNode.children.length - 1;
            nextNode = nextNode.children[childIndex];
          }
          if (nextNode.type === 'panel') {
            get().setActivePanel(nextNode.id);
            return;
          }
        }
      }
    }
  },

  addTab: (panelId, tabName) => {
    set((state) => {
      if (!state.activeWorkspaceId) return state;
      const workspace = state.workspaces[state.activeWorkspaceId];
      if (!workspace || !workspace.centerLayout) return state;

      let targetId = panelId;
      
      // If no panelId is provided, try to find the first panel in the layout
      if (!targetId) {
        let firstPanel: PanelNode | null = null;
        function findFirst(n: LayoutNode) {
          if (firstPanel) return;
          if (n.type === 'panel') firstPanel = n as PanelNode;
          else if (n.type === 'split') n.children.forEach(findFirst);
        }
        findFirst(workspace.centerLayout);
        if (firstPanel) targetId = firstPanel.id;
      }

      if (!targetId) return state;

      const newLayout = cloneDeep(workspace.centerLayout);
      const found = findParentSplit(newLayout, targetId);
      
      const targetPanel = found ? found.target as PanelNode : (newLayout.id === targetId && newLayout.type === 'panel' ? newLayout as PanelNode : null);
      
      if (!targetPanel || targetPanel.type !== 'panel') return state;

      if (!targetPanel.tabs.includes(tabName)) {
        targetPanel.tabs.push(tabName);
      }
      targetPanel.activeTab = tabName;

      return {
        workspaces: {
          ...state.workspaces,
          [state.activeWorkspaceId]: { ...workspace, centerLayout: newLayout }
        },
        activePanelId: targetId
      };
    });
  },

  closeTab: (panelId, tabName) => {
    set((state) => {
      if (!state.activeWorkspaceId) return state;
      const workspace = state.workspaces[state.activeWorkspaceId];
      if (!workspace || !workspace.centerLayout) return state;

      const newLayout = cloneDeep(workspace.centerLayout);
      const found = findParentSplit(newLayout, panelId);
      
      const targetPanel = found ? found.target as PanelNode : (newLayout.id === panelId && newLayout.type === 'panel' ? newLayout as PanelNode : null);
      
      if (!targetPanel || targetPanel.type !== 'panel') return state;

      const tabToClose = tabName || targetPanel.activeTab;
      if (!tabToClose) return state;

      targetPanel.tabs = targetPanel.tabs.filter(t => t !== tabToClose);
      
      if (targetPanel.activeTab === tabToClose) {
        targetPanel.activeTab = targetPanel.tabs[targetPanel.tabs.length - 1] || '';
      }

      function cleanEmptyPanels(node: LayoutNode): LayoutNode | null {
        if (node.type === 'panel') {
          if (node.tabs.length === 0) return null;
          return node;
        }
        if (node.type === 'split') {
          const newChildren = node.children.map(cleanEmptyPanels).filter(Boolean) as LayoutNode[];
          if (newChildren.length === 0) return null;
          if (newChildren.length === 1) return newChildren[0];
          node.children = newChildren;
          return node;
        }
        return null;
      }

      let cleanedLayout = cleanEmptyPanels(newLayout);

      if (!cleanedLayout) {
        // If everything was closed, leave one empty panel so the center layout isn't completely empty
        cleanedLayout = {
          type: 'panel',
          id: `panel-${generateId()}`,
          tabs: ['Empty'],
          activeTab: 'Empty'
        };
      }

      let newActiveId = state.activePanelId;
      if (cleanedLayout && state.activePanelId) {
        const stillExists = findParentSplit(cleanedLayout, state.activePanelId) || (cleanedLayout.id === state.activePanelId);
        if (!stillExists) {
          let firstPanel: PanelNode | null = null;
          function findFirst(n: LayoutNode) {
            if (firstPanel) return;
            if (n.type === 'panel') firstPanel = n;
            else n.children.forEach(findFirst);
          }
          findFirst(cleanedLayout);
          newActiveId = firstPanel ? (firstPanel as PanelNode).id : null;
        }
      } else if (!cleanedLayout) {
        newActiveId = null;
      }

      return {
        workspaces: {
          ...state.workspaces,
          [state.activeWorkspaceId]: { ...workspace, centerLayout: cleanedLayout as LayoutNode }
        },
        activePanelId: newActiveId
      };
    });
  }
    }),
    {
      name: 'pihu-layout-storage',
    }
  )
);
