'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  _count: {
    products: number
  }
}

interface CatalogSidebarProps {
  selectedCategory: string
  selectedBrand: string
  selectedPriceRange: string
  minRating: number
  onCategoryChange: (categoryId: string) => void
  onBrandChange: (brand: string) => void
  onPriceRangeChange: (priceRange: string) => void
  onRatingChange: (rating: number) => void
  onClearFilters: () => void
  brands: string[]
}

export default function CatalogSidebar({
  selectedCategory,
  selectedBrand,
  selectedPriceRange,
  minRating,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onRatingChange,
  onClearFilters,
  brands
}: CatalogSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['categories', 'brands', 'price', 'rating'])
  const [categories, setCategories] = useState<Category[]>([])
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  useEffect(() => {
    fetchCategories()
  }, [])

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

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'under-50', name: 'Under $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: '100-250', name: '$100 - $250' },
    { id: '250-500', name: '$250 - $500' },
    { id: 'over-500', name: 'Over $500' }
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      {/* Clear Filters */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onClearFilters}
          className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Clear All Filters
        </button>
      </div>

      {/* Categories */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
        >
          <span>Product Categories</span>
          {expandedSections.includes('categories') ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
        {expandedSections.includes('categories') && (
          <div className="pb-4">
            <label className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === 'all'}
                onChange={() => onCategoryChange('all')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">All Categories</span>
            </label>
            {categories.map((category) => (
              <label key={category.id} className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.id}
                    onChange={() => onCategoryChange(category.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">{category.name}</span>
                </div>
                <span className="text-xs text-gray-500">({category._count.products})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('brands')}
          className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
        >
          <span>Brands</span>
          {expandedSections.includes('brands') ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
        {expandedSections.includes('brands') && (
          <div className="pb-4">
            <label className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="brand"
                checked={selectedBrand === 'all'}
                onChange={() => onBrandChange('all')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">All Brands</span>
            </label>
            {brands.map((brand) => (
              <label key={brand} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  checked={selectedBrand === brand.toLowerCase()}
                  onChange={() => onBrandChange(brand.toLowerCase())}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Filter by price */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
        >
          <span>Filter by price</span>
          {expandedSections.includes('price') ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
        {expandedSections.includes('price') && (
          <div className="pb-4">
            {priceRanges.map((range) => (
              <label key={range.id} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange === range.id}
                  onChange={() => onPriceRangeChange(range.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{range.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
        >
          <span>Customer Rating</span>
          {expandedSections.includes('rating') ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
        {expandedSections.includes('rating') && (
          <div className="pb-4">
            {[
              { value: 0, label: 'All Ratings' },
              { value: 1, label: '1 Star & Up' },
              { value: 2, label: '2 Stars & Up' },
              { value: 3, label: '3 Stars & Up' },
              { value: 4, label: '4 Stars & Up' },
              { value: 5, label: '5 Stars Only' }
            ].map((rating) => (
              <label key={rating.value} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rating.value}
                  onChange={() => onRatingChange(rating.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{rating.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}