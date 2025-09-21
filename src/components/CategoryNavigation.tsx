'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface SubCategory {
  id: string
  name: string
  link?: string
}

interface Category {
  id: string
  name: string
  icon?: string
  subCategories?: SubCategory[]
}

interface CategoryNavigationProps {
  onCategorySelect?: (categoryId: string, subCategoryId?: string) => void
}

export default function CategoryNavigation({ onCategorySelect }: CategoryNavigationProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories: Category[] = [
    {
      id: 'electronic-catalogs',
      name: 'ELECTRONIC PARTS CATALOGS',
      subCategories: [
        { id: 'agriculture', name: 'Electronic Parts Catalog : AGRICULTURE' },
        { id: 'construction', name: 'Electronic Parts Catalog : CONSTRUCTION' },
        { id: 'cars-trucks', name: 'Electronic Parts Catalog : CARS & TRUCKS' },
        { id: 'buses-lorry', name: 'Electronic Parts Catalog : BUSES & LORRY' },
        { id: 'forklifts', name: 'Electronic Parts Catalog : FORKLIFTS' },
      ]
    },
    {
      id: 'service-repair',
      name: 'SERVICE & REPAIR',
      subCategories: [
        { id: 'workshop-manuals', name: 'Workshop Manuals' },
        { id: 'wiring-diagrams', name: 'Wiring Diagrams' },
        { id: 'service-bulletins', name: 'Service Bulletins' },
        { id: 'repair-procedures', name: 'Repair Procedures' },
        { id: 'maintenance-schedules', name: 'Maintenance Schedules' },
      ]
    },
    {
      id: 'diagnostic',
      name: 'DIAGNOSTIC',
      subCategories: [
        { id: 'diagnostic-software', name: 'Diagnostic Software' },
        { id: 'trouble-codes', name: 'Trouble Codes Database' },
        { id: 'calibration-tools', name: 'Calibration Tools' },
        { id: 'scanner-updates', name: 'Scanner Updates' },
        { id: 'diagnostic-procedures', name: 'Diagnostic Procedures' },
      ]
    },
    {
      id: 'specials',
      name: 'SPECIALS',
      subCategories: [
        { id: 'new-releases', name: 'New Releases' },
        { id: 'best-sellers', name: 'Best Sellers' },
        { id: 'bundle-deals', name: 'Bundle Deals' },
        { id: 'clearance', name: 'Clearance Items' },
        { id: 'limited-offers', name: 'Limited Time Offers' },
      ]
    }
  ]

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId)
  }

  const handleSubCategoryClick = (categoryId: string, subCategoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId, subCategoryId)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-200">
        {categories.map((category) => (
          <div key={category.id} className="relative">
            <button
              onClick={() => handleCategoryClick(category.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100"
            >
              <span className="font-medium text-gray-700 text-sm uppercase tracking-wide">
                {category.name}
              </span>
              <ChevronRight 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  activeCategory === category.id ? 'rotate-90' : ''
                }`}
              />
            </button>
            
            {activeCategory === category.id && category.subCategories && (
              <div className="absolute left-full top-0 ml-1 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                <div className="py-2">
                  {category.subCategories.map((subCategory) => (
                    <button
                      key={subCategory.id}
                      onClick={() => handleSubCategoryClick(category.id, subCategory.id)}
                      className="w-full px-6 py-3 text-left hover:bg-blue-50 transition-colors duration-150 flex items-center justify-between group"
                    >
                      <span className="text-gray-700 group-hover:text-blue-600 text-sm">
                        {subCategory.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}