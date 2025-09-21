'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/stores/cartStore'
import { Minus, Plus, X, Info, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import LoginModal from '@/components/auth/LoginModal'
import SignupModal from '@/components/auth/SignupModal'

export default function CartPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()
  const [couponCode, setCouponCode] = useState('')
  const [showCouponSuccess, setShowCouponSuccess] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      setShowLoginModal(true)
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <>
        <div className="min-h-screen bg-white">
          <Header />
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <div className="bg-gray-50 rounded-lg p-12">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Your Cart</h1>
              <p className="text-gray-600 mb-8">Please sign in to view and manage your cart items</p>
              <div className="space-x-4">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Sign In
                </button>
                <Link href="/">
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium">
                    Go Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Login/Signup Modals */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false)
            router.push('/')
          }}
          onSwitchToSignup={() => {
            setShowLoginModal(false)
            setShowSignupModal(true)
          }}
        />

        <SignupModal
          isOpen={showSignupModal}
          onClose={() => {
            setShowSignupModal(false)
            router.push('/')
          }}
          onSwitchToLogin={() => {
            setShowSignupModal(false)
            setShowLoginModal(true)
          }}
        />
      </>
    )
  }

  const subtotal = getTotalPrice()
  const flatRate = subtotal > 0 ? 15.00 : 0
  const discount = subtotal * couponDiscount
  const total = subtotal - discount + flatRate

  const applyCoupon = () => {
    if (couponCode.trim()) {
      // Mock coupon validation - in real app, validate with backend
      const validCoupons: Record<string, number> = {
        'SAVE10': 0.10,
        'SAVE20': 0.20,
        'FIRST': 0.15
      }
      
      const discountRate = validCoupons[couponCode.toUpperCase()]
      if (discountRate) {
        setCouponDiscount(discountRate)
        setShowCouponSuccess(true)
        setTimeout(() => setShowCouponSuccess(false), 3000)
      } else {
        alert('Invalid coupon code')
      }
    }
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-8">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <Link
            href="/catalog"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Cart</span>
        </nav>

        {/* Free Shipping Banner */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
          <div className="flex items-center">
            <Info className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">
              Add <strong>${(162.33 - subtotal).toFixed(2)}</strong> to cart and get free shipping!
            </span>
          </div>
          <div className="mt-2 bg-red-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((subtotal / 162.33) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Cart Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
              <div className="col-span-1"></div>
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Subtotal</div>
            </div>

            {/* Cart Items */}
            <div className="bg-white">
              {items.map((item) => (
                <div key={item.id} className="px-6 py-6 border-b border-gray-200 grid grid-cols-12 gap-4 items-center">
                  {/* Remove Button */}
                  <div className="col-span-1">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Product Info */}
                  <div className="col-span-5 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                      ) : (
                        <span className="text-2xl">🛢️</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm leading-tight">{item.name}</h3>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-2 text-center">
                    <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 text-center min-w-[40px]">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="col-span-2 text-center">
                    <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code */}
            <div className="bg-white p-6 border-t">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm"
                />
                <button 
                  onClick={applyCoupon}
                  className="bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-800 transition-colors"
                >
                  Apply coupon
                </button>
                <button 
                  onClick={clearCart}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
              {showCouponSuccess && (
                <div className="mt-3 text-green-600 text-sm">
                  Coupon applied successfully! {(couponDiscount * 100).toFixed(0)}% discount
                </div>
              )}
            </div>
          </div>

          {/* Cart Totals Sidebar */}
          <div className="bg-white border border-gray-200 rounded-lg h-fit">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Cart totals</h2>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              
              {/* Discount */}
              {couponDiscount > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <span>Discount ({(couponDiscount * 100).toFixed(0)}%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              {/* Shipping */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <div className="text-right">
                    <div className="text-sm text-gray-900">Flat rate: ${flatRate.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Local pickup</div>
                    <div className="text-sm text-gray-600">Shipping to <strong>CA</strong></div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm mt-1">
                      Change address
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Proceed to Checkout */}
              <div className="pt-4">
                <Link href="/checkout">
                  <button 
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={items.length === 0}
                  >
                    Proceed to checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}