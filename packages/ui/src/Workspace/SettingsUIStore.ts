import { create } from 'zustand';

interface SettingsUIState {
  isSettingsOpen: boolean;
  activeTab: string;
  setSettingsOpen: (isOpen: boolean) => void;
  setActiveTab: (tab: string) => void;
}

export const useSettingsUIStore = create<SettingsUIState>((set) => ({
  isSettingsOpen: false,
  activeTab: 'appearance',
  setSettingsOpen: (isOpen) => set({ isSettingsOpen: isOpen }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
