'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [countdown, setCountdown] = useState(5)

  const downloadLinks = [
    { name: 'Toyota Hilux Catalog 2024', url: '/downloads/toyota-hilux-2024.zip', size: '2.4 GB' },
    { name: 'Installation Guide', url: '/downloads/installation-guide.pdf', size: '1.2 MB' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          // Auto redirect to dashboard
          window.location.href = '/dashboard'
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Completed Successfully!
          </h1>
          
          <p className="text-gray-600 mb-2">
            Thank you for your purchase. Your order has been processed successfully.
          </p>
          
          <p className="text-sm text-gray-500 mb-8">
            Order ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{orderId}</span>
          </p>

          {/* Download Section */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Downloads Are Ready</h2>
            <p className="text-gray-600 mb-6">
              Click the links below to download your purchased items. These links will expire in 30 days.
            </p>
            
            <div className="space-y-3">
              {downloadLinks.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    </div>
                  </div>
                  <a
                    href={item.url}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-yellow-800 mb-2">📋 Important Information</h3>
            <ul className="text-left text-sm text-yellow-700 space-y-1">
              <li>• Download links are valid for 30 days from purchase date</li>
              <li>• Please backup your files after download</li>
              <li>• Installation support available via TeamViewer ($50-100)</li>
              <li>• Check your email for detailed instructions</li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">💬</span>
              </div>
              <p className="font-medium">Need Help?</p>
              <p className="text-sm text-gray-600">24/7 Live Support</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🛠️</span>
              </div>
              <p className="font-medium">Installation</p>
              <p className="text-sm text-gray-600">Remote Assistance</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">📧</span>
              </div>
              <p className="font-medium">Email Support</p>
              <p className="text-sm text-gray-600">support@autoepcrepair.com</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Go to Dashboard
            </a>
            <a
              href="/catalog"
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50"
            >
              Browse More Products
            </a>
            <a
              href="/contact"
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50"
            >
              Contact Support
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Redirecting to dashboard in {countdown} seconds...
          </p>
        </div>

        {/* Email Confirmation */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">📧 Confirmation Email Sent</h3>
          <p className="text-gray-600 mb-4">
            We've sent a confirmation email with your download links and receipt to your email address.
            If you don't see it in your inbox, please check your spam/junk folder.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong>Email includes:</strong>
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>• Download links with expiration dates</li>
              <li>• Installation instructions</li>
              <li>• Order receipt and invoice</li>
              <li>• Technical support information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}