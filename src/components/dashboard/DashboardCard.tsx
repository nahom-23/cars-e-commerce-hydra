'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface DashboardCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  iconColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo'
  trend?: {
    value: string
    isPositive: boolean
  }
  children?: ReactNode
  className?: string
}

const iconColorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  red: 'bg-red-50 text-red-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  purple: 'bg-purple-50 text-purple-600',
  indigo: 'bg-indigo-50 text-indigo-600'
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'blue',
  trend,
  children,
  className = ''
}: DashboardCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
          <div className="flex items-baseline space-x-2 mb-1">
            <p className="text-2xl font-bold text-gray-900 truncate">{value}</p>
            {trend && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                trend.isPositive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                <span className="mr-1">{trend.isPositive ? '↗' : '↘'}</span>
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500 truncate">{subtitle}</p>
          )}
        </div>
        
        {Icon && (
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ml-4 ${iconColorClasses[iconColor]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  )
}