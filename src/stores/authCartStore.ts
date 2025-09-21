import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useSession } from 'next-auth/react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  productId: string
}

interface AuthCartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>
  removeItem: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getTotalItems: () => number
  getTotalPrice: () => number
  syncWithServer: () => Promise<void>
  loadFromServer: () => Promise<void>
}

export const useAuthCartStore = create<AuthCartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: async (item) => {
        const items = get().items
        const existingItem = items.find(i => i.id === item.id)
        
        if (existingItem) {
          await get().updateQuantity(item.id, existingItem.quantity + 1)
        } else {
          const newItem = { ...item, quantity: 1 }
          set({ items: [...items, newItem] })
          
          // Sync with server if user is authenticated
          await get().syncWithServer()
        }
      },
      
      removeItem: async (id) => {
        set({
          items: get().items.filter(item => item.id !== id)
        })
        
        // Sync with server
        await get().syncWithServer()
      },
      
      updateQuantity: async (id, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(id)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        })
        
        // Sync with server
        await get().syncWithServer()
      },
      
      clearCart: async () => {
        set({ items: [] })
        await get().syncWithServer()
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      syncWithServer: async () => {
        try {
          const response = await fetch('/api/cart/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              items: get().items
            })
          })
          
          if (!response.ok) {
            console.error('Failed to sync cart with server')
          }
        } catch (error) {
          console.error('Error syncing cart:', error)
        }
      },

      loadFromServer: async () => {
        try {
          const response = await fetch('/api/cart')
          if (response.ok) {
            const serverItems = await response.json()
            set({ items: serverItems })
          }
        } catch (error) {
          console.error('Error loading cart from server:', error)
        }
      }
    }),
    {
      name: 'auth-cart-storage'
    }
  )
)