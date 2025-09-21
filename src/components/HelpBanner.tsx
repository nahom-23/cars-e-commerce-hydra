'use client'

import { Phone } from 'lucide-react'

export default function HelpBanner() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-blue-600 rounded-2xl p-8 flex items-center justify-between">
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-2">Need Help Finding the Right Product?</h2>
            <p className="text-blue-100">Our Parts Experts Can Help. Call for immediate assistance.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Request a Call
            </button>
            
            <div className="text-white text-right">
              <div className="flex items-center space-x-2 mb-1">
                <Phone className="w-5 h-5" />
                <span className="text-2xl font-bold">+(800) 1234 5678 90</span>
              </div>
              <p className="text-blue-100 text-sm">You can contact us 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}