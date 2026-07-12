import { create } from 'zustand'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem('transitops-theme')
  if (stored) return stored === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useUIStore = create((set, get) => ({
  isDarkMode: getInitialTheme(),
  isSidebarOpen: true,

  toggleDarkMode: () => {
    const newValue = !get().isDarkMode
    localStorage.setItem('transitops-theme', newValue ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newValue)
    set({ isDarkMode: newValue })
  },

  initTheme: () => {
    const isDark = get().isDarkMode
    document.documentElement.classList.toggle('dark', isDark)
  },

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}))