import { LayoutRenderer } from '@pihu/ui';
import type { LayoutNode } from '@pihu/types';
import './App.css';

const initialLayout: LayoutNode = {
  type: "split",
  id: "root-split",
  direction: "horizontal",
  sizes: [70, 30],
  children: [
    {
      type: "panel",
      id: "editor",
      tabs: ["fkvim"],
      activeTab: "fkvim"
    },
    {
      type: "panel",
      id: "terminal",
      tabs: ["fkterm"],
      activeTab: "fkterm"
    }
  ]
};

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0, background: "#11111b" }}>
      <LayoutRenderer layout={initialLayout} />
    </div>
  );
}

export default App;
