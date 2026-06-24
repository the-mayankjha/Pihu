import type { Theme } from "../types/theme";

export class ThemeEngine {
  /**
   * Applies a theme to the document.
   */
  static applyTheme(theme: Theme) {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    // Set a class for dark/light mode targeting if needed
    if (theme.mode === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    // Set glass style
    const glassStyle = theme.glass.style || 'frost';
    if (glassStyle === 'liquid') {
      root.classList.add('glass-style-liquid');
      root.classList.remove('glass-style-frost');
    } else {
      root.classList.add('glass-style-frost');
      root.classList.remove('glass-style-liquid');
    }

    // Flatten and apply CSS variables
    const variables = this.generateVariables(theme);
    for (const [key, value] of Object.entries(variables)) {
      root.style.setProperty(key, value);
    }
  }

  /**
   * Flattens the nested Theme object into CSS variable key-value pairs
   */
  private static generateVariables(theme: Theme): Record<string, string> {
    const vars: Record<string, string> = {};

    // Colors
    for (const [key, value] of Object.entries(theme.colors)) {
      vars[`--pihu-${key}`] = value;
    }

    // Typography
    for (const [key, value] of Object.entries(theme.typography)) {
      vars[`--pihu-font-${key}`] = value;
    }

    // Wallpaper
    if (theme.wallpaper) {
      if (theme.wallpaper.type === "image") {
        vars["--pihu-wallpaper"] = `url(${theme.wallpaper.source})`;
      } else {
        vars["--pihu-wallpaper"] = theme.wallpaper.source;
      }
    } else {
      vars["--pihu-wallpaper"] = "none";
    }

    // Glass Config
    const activeStyle = theme.glass.style || 'frost';
    const activeGlassConfig = theme.glass[activeStyle] || { blur: 24, opacity: 0.3 }; // Fallback for old state
    
    vars[`--pihu-glass-blur`] = `${activeGlassConfig.blur}px`;
    vars[`--pihu-glass-opacity`] = activeGlassConfig.opacity.toString();
    vars[`--pihu-glass-opacity-percent`] = `${activeGlassConfig.opacity * 100}%`;
    vars[`--pihu-glass-opacity-percent-40`] = `${activeGlassConfig.opacity * 40}%`;
    vars[`--pihu-glass-opacity-percent-15`] = `${activeGlassConfig.opacity * 15}%`;
    
    for (const [key, value] of Object.entries(theme.glass)) {
      if (key === 'frost' || key === 'liquid' || key === 'style') continue;
      vars[`--pihu-glass-${key}`] = value.toString();
    }

    // Radius
    for (const [key, value] of Object.entries(theme.radius)) {
      vars[`--pihu-radius-${key}`] = value;
    }

    // Shadow
    for (const [key, value] of Object.entries(theme.shadow)) {
      vars[`--pihu-shadow-${key}`] = value;
    }

    // Animation
    for (const [key, value] of Object.entries(theme.animation)) {
      vars[`--pihu-anim-${key}`] = value;
    }

    return vars;
  }
}
