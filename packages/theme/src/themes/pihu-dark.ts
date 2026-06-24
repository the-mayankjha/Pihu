import type { Theme } from "../types/theme";

export const pihuDarkTheme: Theme = {
  id: "pihu-dark",
  name: "Pihu Dark",
  mode: "dark",
  colors: {
    bg: "#050816",
    surface: "#11111b",
    primary: "#ff4fa2",
    accent: "#ff69b4",
    text: "#bac2de",
    border: "rgba(255,255,255,0.08)",
    glass: "rgba(20,20,30,0.55)",
  },
  typography: {
    primary: "Inter, system-ui, sans-serif",
    display: "'SF Pro Display', system-ui, sans-serif",
    monospace: "'JetBrains Mono', monospace",
  },
  wallpaper: {
    id: "default-dark",
    type: "gradient",
    source: "transparent",
  },
  glass: {
    style: 'frost',
    frost: {
      blur: 24,
      opacity: 0.15,
    },
    liquid: {
      blur: 3,
      opacity: 0.15,
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
    glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  },
  animation: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
};
