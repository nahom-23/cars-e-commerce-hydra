'use client'

import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useRecentlyViewedStore } from '@/stores/recentlyViewedStore'
import { Heart, Star, Eye, ShoppingCart, Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface Product {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: string
  badge?: string
  rating?: number
  reviewCount?: number
  image?: string
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { addItem: addToViewed } = useRecentlyViewedStore()
  const [addedToCart, setAddedToCart] = useState<string[]>([])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image
    })
    
    // Show success feedback
    setAddedToCart([...addedToCart, product.id])
    setTimeout(() => {
      setAddedToCart(prev => prev.filter(id => id !== product.id))
    }, 2000)
  }

  const handleToggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        image: product.image,
        rating: product.rating,
        reviewCount: product.reviewCount
      })
    }
  }

  const handleViewProduct = (product: Product) => {
    addToViewed({
      id: product.id,
      name: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      rating: product.rating,
      reviewCount: product.reviewCount
    })
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-orange-400 fill-orange-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
          <div className="relative">
            {/* Product Image - Clickable */}
            <Link 
              href={`/product/${product.id}`}
              onClick={() => handleViewProduct(product)}
            >
              <div className="h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden cursor-pointer">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">🛢️</span>
                  </div>
                )}
              </div>
            </Link>
              
            {/* Hover Icons - Top Right */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col space-y-2">
              <button 
                onClick={() => handleToggleWishlist(product)}
                className={`p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors ${
                  isInWishlist(product.id) ? 'bg-red-50' : ''
                }`}
                title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 ${
                  isInWishlist(product.id) 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-gray-600 hover:text-red-500'
                }`} />
              </button>
              <Link 
                href={`/product/${product.id}`}
                onClick={() => handleViewProduct(product)}
              >
                <button 
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  title="View product"
                >
                  <Eye className="w-4 h-4 text-gray-600 hover:text-blue-500" />
                </button>
              </Link>
            </div>
            
            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                  {product.discount}
                </span>
              </div>
            )}
          </div>
            
          {/* Product Info */}
          <div className="p-4">
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2 mb-2">
                {renderStars(product.rating)}
                <span className="text-sm font-medium text-gray-900">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
            )}
            
            {/* Product Title - Clickable */}
            <Link 
              href={`/product/${product.id}`}
              onClick={() => handleViewProduct(product)}
            >
              <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 min-h-[2.5rem] hover:text-blue-600 cursor-pointer transition-colors">
                {product.title}
              </h3>
            </Link>
            
            {/* Price */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Add to Cart Button */}
            <button 
              onClick={() => handleAddToCart(product)}
              className={`w-full py-2 px-4 rounded font-medium transition-all duration-300 text-sm flex items-center justify-center gap-2 ${
                addedToCart.includes(product.id)
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              disabled={addedToCart.includes(product.id)}
            >
              {addedToCart.includes(product.id) ? (
                <>
                  <Check className="w-4 h-4" />
                  Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add to cart
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </>
  )
}