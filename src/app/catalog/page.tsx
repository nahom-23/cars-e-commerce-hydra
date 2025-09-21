'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import CatalogSidebar from '@/components/CatalogSidebar'
import ProductGrid from '@/components/ProductGrid'

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
  category: {
    id: string
    name: string
    slug: string
  }
  productType: string
  featured: boolean
}

interface Category {
  id: string
  name: string
  slug: string
  _count: {
    products: number
  }
}

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [totalPages, setTotalPages] = useState(1)

  // Get search query from URL params
  useEffect(() => {
    const search = searchParams.get('search')
    const categorySlug = searchParams.get('category')
    
    if (search) {
      setSearchTerm(search)
    }
    
    if (categorySlug) {
      setSelectedCategory(categorySlug)
    }
  }, [searchParams])

  // Fetch categories
  useEffect(() => {
    fetchCategories()
  }, [])

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, searchTerm, sortBy, currentPage, itemsPerPage])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory !== 'all' && { categoryId: selectedCategory }),
        ...(sortBy !== 'default' && { sortBy })
      })
      
      const response = await fetch(`/api/products?${params}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
        setTotalPages(data.pagination.pages)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const priceRanges = [
    { id: 'all', name: 'All Prices', min: 0, max: Infinity },
    { id: 'under-50', name: 'Under $50', min: 0, max: 50 },
    { id: '50-100', name: '$50 - $100', min: 50, max: 100 },
    { id: '100-250', name: '$100 - $250', min: 100, max: 250 },
    { id: '250-500', name: '$250 - $500', min: 250, max: 500 },
    { id: 'over-500', name: 'Over $500', min: 500, max: Infinity }
  ]

  const [selectedBrand, setSelectedBrand] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [minRating, setMinRating] = useState(0)

  // Get unique brands from products
  const brands = Array.from(new Set(
    products.map(p => p.make).filter(Boolean)
  )).sort()

  // Generate category options including database categories
  const categoryOptions = [
    { id: 'all', name: 'All Categories' },
    ...categories.map(cat => ({
      id: cat.id,
      name: `${cat.name} (${cat._count.products})`
    }))
  ]

  // Additional client-side filtering (for filters not handled by API)
  const filteredProducts = products.filter(product => {
    const matchesBrand = selectedBrand === 'all' ||
      (product.make && product.make.toLowerCase().includes(selectedBrand.toLowerCase()))
    
    const selectedRange = priceRanges.find(range => range.id === selectedPriceRange)
    const matchesPrice = !selectedRange || selectedRange.id === 'all' ||
      (product.price >= selectedRange.min && product.price <= selectedRange.max)
    
    const matchesRating = product.rating >= minRating
    
    return matchesBrand && matchesPrice && matchesRating
  })

  // Products are already sorted by API, but we can override client-side
  const displayProducts = [...filteredProducts]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex">
            {/* Sidebar */}
            <CatalogSidebar
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              selectedPriceRange={selectedPriceRange}
              minRating={minRating}
              onCategoryChange={(categoryId) => {
                setSelectedCategory(categoryId)
                setCurrentPage(1)
              }}
              onBrandChange={(brand) => {
                setSelectedBrand(brand)
                setCurrentPage(1)
              }}
              onPriceRangeChange={(priceRange) => {
                setSelectedPriceRange(priceRange)
                setCurrentPage(1)
              }}
              onRatingChange={(rating) => {
                setMinRating(rating)
                setCurrentPage(1)
              }}
              onClearFilters={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedBrand('all')
                setSelectedPriceRange('all')
                setMinRating(0)
                setCurrentPage(1)
              }}
              brands={brands}
            />
            
            {/* Main Content */}
            <div className="flex-1 ml-8">
              {/* Page Title and Search Info */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 text-center">
                  {searchTerm ? `Search Results for "${searchTerm}"` : 'Shop'}
                </h1>
                {selectedCategory !== 'all' && (
                  <p className="text-center text-gray-600 mt-2">
                    Category: {selectedCategory}
                  </p>
                )}
              </div>
              
              {/* Results and Sorting */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Showing {filteredProducts.length} results</span>
                  {(selectedCategory !== 'all' || selectedBrand !== 'all' || selectedPriceRange !== 'all' || minRating > 0 || searchTerm) && (
                    <button 
                      onClick={() => {
                        setSearchTerm('')
                        setSelectedCategory('all')
                        setSelectedBrand('all')
                        setSelectedPriceRange('all')
                        setMinRating(0)
                        setCurrentPage(1)
                      }}
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Sort By */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1 text-sm"
                    >
                      <option value="default">Default</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name A-Z</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                  
                  {/* Items Per Page */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Show:</span>
                    <select 
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value))
                        setCurrentPage(1)
                      }}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="12">12</option>
                      <option value="24">24</option>
                      <option value="36">36</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <ProductGrid products={displayProducts} />
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-4">
                    No products found with current filters
                    {searchTerm && (
                      <><br />Search: "{searchTerm}"</>
                    )}
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('all')
                      setSelectedBrand('all')
                      setSelectedPriceRange('all')
                      setMinRating(0)
                      setCurrentPage(1)
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(6, totalPages) }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-2 border rounded text-sm ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}