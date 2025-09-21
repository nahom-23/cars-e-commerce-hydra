'use client'

import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface SidebarItem {
  id: string
  name: string
  icon: LucideIcon
  href?: string
  badge?: string | number
  active?: boolean
}

interface SidebarSection {
  title?: string
  items: SidebarItem[]
}

interface SidebarProps {
  sections: SidebarSection[]
  onItemClick?: (itemId: string) => void
  user?: {
    name: string
    role: string
    avatar?: string
  }
}

export default function Sidebar({ sections, onItemClick, user }: SidebarProps) {
  const handleItemClick = (item: SidebarItem) => {
    if (onItemClick) {
      onItemClick(item.id)
    }
  }

  const renderItem = (item: SidebarItem) => {
    const content = (
      <div className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
        item.active
          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
      }`}>
        <div className="flex items-center space-x-3">
          <item.icon className={`w-5 h-5 ${
            item.active ? 'text-blue-600' : 'text-gray-500'
          }`} />
          <span className="font-medium">{item.name}</span>
        </div>
        {item.badge && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {item.badge}
          </span>
        )}
      </div>
    )

    if (item.href) {
      return (
        <Link key={item.id} href={item.href}>
          {content}
        </Link>
      )
    }

    return (
      <div key={item.id} onClick={() => handleItemClick(item)}>
        {content}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* User Profile Section */}
      {user && (
        <div className="p-6 border-b border-gray-200 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-8">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.title && (
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map(renderItem)}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}