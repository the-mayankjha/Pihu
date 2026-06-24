import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsUIState {
  isSettingsOpen: boolean;
  activeTab: string;
  userName: string;
  setSettingsOpen: (isOpen: boolean) => void;
  setActiveTab: (tab: string) => void;
  setUserName: (name: string) => void;
}

export const useSettingsUIStore = create<SettingsUIState>()(
  persist(
    (set) => ({
      isSettingsOpen: false,
      activeTab: 'general',
      userName: 'User',
      setSettingsOpen: (isOpen) => set({ isSettingsOpen: isOpen }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setUserName: (name) => set({ userName: name }),
    }),
    {
      name: 'pihu-settings-ui-storage',
      partialize: (state) => ({ userName: state.userName, activeTab: state.activeTab }),
    }
  )
);
