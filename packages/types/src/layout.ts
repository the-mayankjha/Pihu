export type LayoutNode =
  | SplitNode
  | PanelNode;

export interface SplitNode {
  type: "split";
  id: string;
  direction:
    | "horizontal"
    | "vertical";
  sizes: number[];
  children: LayoutNode[];
}

export interface PanelNode {
  type: "panel";
  id: string;
  tabs: string[];
  activeTab: string;
}
