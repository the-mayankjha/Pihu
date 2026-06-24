import type { LayoutNode } from "./layout";

export interface Workspace {
  id: string;
  name: string;
  icon: string;
  rootLayout: LayoutNode;
}
