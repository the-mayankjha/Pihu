export interface ThemeColors {
  bg: string;
  surface: string;
  primary: string;
  accent: string;
  text: string;
  border: string;
  glass: string;
}

export interface Typography {
  primary: string;
  display: string;
  monospace: string;
}

export interface GlassStyleConfig {
  blur: number;
  opacity: number;
}

export interface GlassConfig {
  style?: 'frost' | 'liquid';
  frost: GlassStyleConfig;
  liquid: GlassStyleConfig;
  saturation: number;
  borderOpacity: number;
  glowOpacity: number;
  activePanelBorder?: boolean;
  activePanelBorderOpacity?: number;
}

export interface Wallpaper {
  id: string;
  type: "image" | "video" | "gradient";
  source: string;
}

export interface RadiusConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ShadowConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  glass: string;
}

export interface AnimationConfig {
  fast: string;
  normal: string;
  slow: string;
  enabled?: boolean;
}

export interface Theme {
  id: string;
  name: string;
  mode: "light" | "dark";
  colors: ThemeColors;
  typography: Typography;
  wallpaper?: Wallpaper;
  glass: GlassConfig;
  radius: RadiusConfig;
  shadow: ShadowConfig;
  animation: AnimationConfig;
}
