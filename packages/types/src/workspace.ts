import type { LayoutNode } from "./layout";

export interface Workspace {
  id: string;
  name: string;
  icon: string;
  intent?: string; // Information for LLMs regarding the purpose of this workspace
  leftLayout?: LayoutNode;
  centerLayout: LayoutNode;
  rightLayout?: LayoutNode;
}
