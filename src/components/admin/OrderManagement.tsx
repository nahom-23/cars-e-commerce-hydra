'use client'

import { ShoppingCart } from 'lucide-react'

export default function OrderManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
      </div>

      {/* Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
        <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Order Management</h3>
        <p className="text-gray-500">
          Order management functionality will be implemented here.
          <br />
          This will include order tracking, status updates, and customer communication.
        </p>
      </div>
    </div>
  )
}