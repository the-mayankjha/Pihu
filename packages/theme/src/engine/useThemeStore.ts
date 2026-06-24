import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme } from "../types/theme";
import { pihuDarkTheme } from "../themes/pihu-dark";
import { pihuLightTheme } from "../themes/pihu-light";
import { ThemeEngine } from "./ThemeEngine";

export interface ThemeStore {
  activeThemeId: string;
  themes: Record<string, Theme>;

  // Actions
  init: () => void;
  setTheme: (id: string) => void;
  registerTheme: (theme: Theme) => void;
  updateThemeProperties: (updater: (theme: Theme) => Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      activeThemeId: "pihu-dark",
      themes: {
        "pihu-dark": pihuDarkTheme,
        "pihu-light": pihuLightTheme,
      },

      init: () => {
        const { activeThemeId, themes } = get();
        const theme = themes[activeThemeId] || pihuDarkTheme;
        ThemeEngine.applyTheme(theme);
      },

      setTheme: (id: string) => {
        set((state) => {
          const theme = state.themes[id];
          if (theme) {
            ThemeEngine.applyTheme(theme);
            return { activeThemeId: id };
          }
          return state;
        });
      },

      registerTheme: (theme: Theme) => {
        set((state) => ({
          themes: {
            ...state.themes,
            [theme.id]: theme,
          },
        }));
      },

      updateThemeProperties: (updater) => {
        set((state) => {
          const currentTheme = state.themes[state.activeThemeId];
          if (!currentTheme) return state;

          const updatedTheme = updater(currentTheme);
          
          ThemeEngine.applyTheme(updatedTheme);

          return {
            themes: {
              ...state.themes,
              [state.activeThemeId]: updatedTheme,
            },
          };
        });
      },
    }),
    {
      name: "pihu-theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme immediately after rehydration
          setTimeout(() => state.init(), 0);
        }
      },
    }
  )
);
