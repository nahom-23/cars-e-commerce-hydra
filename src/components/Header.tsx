'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Heart, ShoppingCart, Phone, Search, Grid3X3, Mic, LogOut, Settings, Shield } from 'lucide-react'
import LoginModal from '@/components/auth/LoginModal'
import SignupModal from '@/components/auth/SignupModal'
import { UserRole } from '@prisma/client'

interface Category {
  id: string
  name: string
  slug: string
  _count: {
    products: number
  }
}

export default function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  const { getTotalItems } = useCartStore()
  const { getTotalItems: getWishlistItems } = useWishlistStore()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.slice(0, 12)) // Limit to first 12 categories for header
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const openLoginModal = () => {
    setShowLoginModal(true)
    setShowSignupModal(false)
  }

  const openSignupModal = () => {
    setShowSignupModal(true)
    setShowLoginModal(false)
  }

  const closeModals = () => {
    setShowLoginModal(false)
    setShowSignupModal(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.lang = 'en-US'
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setSearchQuery(transcript)
        router.push(`/catalog?search=${encodeURIComponent(transcript)}`)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
      }

      recognition.start()
    } else {
      alert('Voice search is not supported in your browser')
    }
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    setShowUserMenu(false)
    window.location.reload()
  }
  

  return (
    <>
      {/* Top Bar */}
     

      {/* Main Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-red-600 shrink-0">
              EPCDEPO<span className="text-gray-800">.com</span>
            </Link>
            
            {/* Catalog Button */}
            <Link href="/catalog" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Grid3X3 className="w-5 h-5 text-gray-600" />
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-700">Catalog</div>
              </div>
            </Link>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for parts, brands, or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-6 pr-20 py-3 bg-gray-50 border-0 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={handleVoiceSearch}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    title="Voice search"
                  >
                    <Mic className="w-4 h-4 text-gray-500" />
                  </button>
                  <button 
                    type="submit"
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    title="Search"
                  >
                    <Search className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-2 shrink-0">
              <Link href="/contact" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-gray-600" />
              </Link>
              
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <div className="hidden lg:block">
                      <div className="text-xs text-gray-500">Welcome</div>
                      <div className="text-sm font-medium text-gray-700">
                        {session.user?.name || session.user?.email}
                      </div>
                    </div>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-2">
                        <Link href="/dashboard" onClick={() => setShowUserMenu(false)}>
                          <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors">
                            <Settings className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">Dashboard</span>
                          </div>
                        </Link>
                        {(session?.user?.role === UserRole.ADMIN || session?.user?.role === UserRole.SUPER_ADMIN) && (
                          <Link href="/admin" onClick={() => setShowUserMenu(false)}>
                            <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors">
                              <Shield className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">Admin Panel</span>
                            </div>
                          </Link>
                        )}
                        <Link href="/profile" onClick={() => setShowUserMenu(false)}>
                          <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700">Profile</span>
                          </div>
                        </Link>
                        <hr className="my-1" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={openLoginModal}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <div className="hidden lg:block">
                    <div className="text-xs text-gray-500">Sign In</div>
                    <div className="text-sm font-medium text-gray-700">Account</div>
                  </div>
                </button>
              )}

              <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
                {getWishlistItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {getWishlistItems()}
                  </span>
                )}
              </Link>


              <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <div className="bg-gray-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-6 overflow-x-auto">
            <Link
              href="/catalog"
              className="whitespace-nowrap text-gray-700 hover:text-blue-600 font-medium"
            >
              All Products
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/catalog?category=${category.id}`}
                className="whitespace-nowrap text-gray-700 hover:text-blue-600 font-medium"
                title={`${category._count.products} products`}
              >
                {category.name}
              </Link>
            ))}
            {categories.length > 0 && (
              <Link
                href="/catalog"
                className="whitespace-nowrap text-blue-600 hover:text-blue-800 font-medium"
              >
                View All →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}

      {/* Login/Signup Modals */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={closeModals}
        onSwitchToSignup={openSignupModal}
      />
      <SignupModal 
        isOpen={showSignupModal} 
        onClose={closeModals}
        onSwitchToLogin={openLoginModal}
      />
    </>
  )
}