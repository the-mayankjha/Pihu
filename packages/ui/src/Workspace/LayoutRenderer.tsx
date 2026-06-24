import * as React from 'react';
import { Group, Panel, Separator } from "react-resizable-panels";
import type { LayoutNode, SplitNode, PanelNode } from "@pihu/types";

interface LayoutRendererProps {
  layout: LayoutNode;
}

export function LayoutRenderer({ layout }: LayoutRendererProps) {
  if (layout.type === "split") {
    return <SplitRenderer node={layout} />;
  }
  if (layout.type === "panel") {
    return <PanelRenderer node={layout} />;
  }
  return null;
}

function SplitRenderer({ node }: { node: SplitNode }) {
  return (
    <Group
      orientation={node.direction}
      id={node.id}
    >
      {node.children.map((child, index) => (
        <React.Fragment key={child.id}>
          {index > 0 && <Separator className="resize-handle" />}
          <Panel
            id={child.id}
            defaultSize={node.sizes[index] || 100 / node.children.length}
          >
            <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
              <LayoutRenderer layout={child} />
            </div>
          </Panel>
        </React.Fragment>
      ))}
    </Group>
  );
}

function PanelRenderer({ node }: { node: PanelNode }) {
  return (
    <div style={{ padding: "16px", height: "100%", background: "#1e1e2e", color: "#cdd6f4", border: "1px solid #313244", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <div style={{ borderBottom: "1px solid #313244", paddingBottom: "8px", marginBottom: "8px", fontWeight: "bold" }}>
        {node.activeTab || node.tabs[0] || "Empty Panel"}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.5 }}>
        Panel Content
      </div>
    </div>
  );
}
