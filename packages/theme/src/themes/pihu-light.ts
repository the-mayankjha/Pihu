import type { Theme } from "../types/theme";

export const pihuLightTheme: Theme = {
  id: "pihu-light",
  name: "Pihu Light",
  mode: "light",
  colors: {
    bg: "#f6f7fb",
    surface: "#ffffff",
    primary: "#ff4fa2",
    accent: "#ff8bc7",
    text: "#08060d",
    border: "rgba(255,255,255,0.7)",
    glass: "rgba(255,255,255,0.55)",
  },
  typography: {
    primary: "Inter, system-ui, sans-serif",
    display: "'SF Pro Display', system-ui, sans-serif",
    monospace: "'JetBrains Mono', monospace",
  },
  wallpaper: {
    id: "default-light",
    type: "gradient",
    source: "transparent",
  },
  glass: {
    style: 'frost',
    frost: {
      blur: 3,
      opacity: 0.17,
    },
    liquid: {
      blur: 10,
      opacity: 0.70,
    },
    saturation: 1.8,
    borderOpacity: 0.08,
    glowOpacity: 0.15,
    activePanelBorder: true,
    activePanelBorderOpacity: 1.0,
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
  },
  animation: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
};
