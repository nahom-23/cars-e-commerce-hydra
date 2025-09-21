'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react'
import Header from '@/components/Header'
import ProductGrid from '@/components/ProductGrid'
import { useCartStore } from '@/stores/cartStore'

interface Product {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: string
  rating: number
  reviewCount: number
  images: string[]
  description?: string
  make?: string
  model?: string
  year?: string
  engineType?: string
  fuelType?: string
  transmission?: string
  category: {
    id: string
    name: string
    slug: string
  }
  productType: string
  featured: boolean
  downloadUrl?: string
  fileSize?: string
  version?: string
  slug: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string)
    }
  }, [params.id])

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/products/${productId}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Product not found')
        } else {
          setError('Failed to load product')
        }
        return
      }
      
      const data = await response.json()
      setProduct(data)
      
      // Fetch related products from the same category
      if (data.category?.id) {
        fetchRelatedProducts(data.category.id, productId)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      setError('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async (categoryId: string, currentProductId: string) => {
    try {
      // Fetch products from the same category
      const response = await fetch(`/api/products?categoryId=${categoryId}&limit=5`)
      
      if (response.ok) {
        const data = await response.json()
        // Filter out the current product and limit to 4 related products
        const filtered = data.products
          .filter((p: Product) => p.id !== currentProductId)
          .slice(0, 4)
        setRelatedProducts(filtered)
      }
    } catch (error) {
      console.error('Error fetching related products:', error)
      // Silently fail - related products are not critical
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || 'Product not found'}
            </h1>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <a 
              href="/catalog" 
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Browse Catalog
            </a>
          </div>
        </div>
      </div>
    )
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

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price
    })
  }

  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <span>Home</span> / <span>Catalog</span> / <span>{product.category.name}</span> / <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-gray-50 rounded-lg p-8 mb-4">
              <div className="aspect-square flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">{product.make || 'PART'}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 bg-gray-100 rounded border-2 flex items-center justify-center overflow-hidden ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              {renderStars(product.rating)}
              <span className="text-sm font-medium text-gray-900">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      {product.discount}
                    </span>
                  </>
                )}
              </div>
              <p className="text-green-600 text-sm font-medium">In Stock - Ready to Ship</p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button 
                    onClick={decreaseQuantity}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-600">Check if fits your vehicle</span>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to cart</span>
                </button>
                
                <div className="flex space-x-2">
                  <button className="flex-1 border border-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Add to wishlist</span>
                  </button>
                  <button className="flex-1 border border-gray-300 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center space-x-2">
                    <span>Compare</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Truck className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium">Fast Shipping</span>
                  <span className="text-xs text-gray-600">2-4 days delivery</span>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium">Easy Returns</span>
                  <span className="text-xs text-gray-600">30-day return policy</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium">Warranty Policy</span>
                  <span className="text-xs text-gray-600">1-year warranty</span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Share:</span>
                <button className="p-2 text-gray-400 hover:text-blue-600">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <p>Product Type: <span className="font-medium">{product.productType}</span></p>
                {product.make && <p>Make: <span className="font-medium">{product.make}</span></p>}
                {product.model && <p>Model: <span className="font-medium">{product.model}</span></p>}
                {product.year && <p>Year: <span className="font-medium">{product.year}</span></p>}
                {product.engineType && <p>Engine: <span className="font-medium">{product.engineType}</span></p>}
                {product.fuelType && <p>Fuel Type: <span className="font-medium">{product.fuelType}</span></p>}
                {product.transmission && <p>Transmission: <span className="font-medium">{product.transmission}</span></p>}
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
          <div className="prose max-w-none">
            {product.description ? (
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            ) : (
              <p className="text-gray-700 leading-relaxed">
                High-quality automotive part designed for optimal performance and reliability. 
                This {product.productType.toLowerCase()} is compatible with various vehicle makes and models, 
                ensuring you get the right fit for your vehicle.
              </p>
            )}
            
            {product.downloadUrl && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Digital Download</h3>
                <p className="text-blue-800 text-sm mb-3">
                  This is a digital product. After purchase, you'll receive a download link.
                </p>
                <div className="text-sm text-blue-700">
                  {product.fileSize && <p>File Size: {product.fileSize}</p>}
                  {product.version && <p>Version: {product.version}</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Related products in {product.category.name}
            </h2>
            <p className="text-gray-600 mb-8">
              Customers who viewed this item also viewed these products
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <ProductGrid products={relatedProducts} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}