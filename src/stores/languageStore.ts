import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LanguageStore {
  currentLanguage: string
  setLanguage: (language: string) => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      currentLanguage: 'en',
      setLanguage: (language: string) => set({ currentLanguage: language })
    }),
    {
      name: 'language-storage'
    }
  )
)