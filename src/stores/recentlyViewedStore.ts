import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ViewedItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: string
  image?: string
  rating?: number
  reviewCount?: number
  viewedAt: Date
}

interface RecentlyViewedStore {
  items: ViewedItem[]
  addItem: (item: Omit<ViewedItem, 'viewedAt'>) => void
  removeItem: (id: string) => void
  clearViewed: () => void
  getTotalItems: () => number
  getRecentItems: (limit?: number) => ViewedItem[]
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const items = get().items.filter(i => i.id !== item.id)
        const newItem = { ...item, viewedAt: new Date() }
        
        // Keep only last 20 items
        const updatedItems = [newItem, ...items].slice(0, 20)
        set({ items: updatedItems })
      },
      
      removeItem: (id) => {
        set({
          items: get().items.filter(item => item.id !== id)
        })
      },
      
      clearViewed: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.length
      },
      
      getRecentItems: (limit = 10) => {
        return get().items.slice(0, limit)
      }
    }),
    {
      name: 'recently-viewed-storage'
    }
  )
)