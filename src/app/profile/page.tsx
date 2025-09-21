'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'
import { User, Mail, Calendar, Shield } from 'lucide-react'
import LoginModal from '@/components/auth/LoginModal'
import SignupModal from '@/components/auth/SignupModal'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  useEffect(() => {
    if (status === 'loading') return // Still loading
    if (!session) {
      setShowLoginModal(true)
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <>
        {/* Login/Signup Modals */}
        {showLoginModal && (
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onSwitchToSignup={() => {
              setShowLoginModal(false)
              setShowSignupModal(true)
            }}
          />
        )}

        {showSignupModal && (
          <SignupModal
            isOpen={showSignupModal}
            onClose={() => setShowSignupModal(false)}
            onSwitchToLogin={() => {
              setShowSignupModal(false)
              setShowLoginModal(true)
            }}
          />
        )}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Profile</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Account Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Full Name</div>
                    <div className="font-medium text-gray-900">{session.user?.name || 'Not provided'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email Address</div>
                    <div className="font-medium text-gray-900">{session.user?.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Account Role</div>
                    <div className="font-medium text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        (session.user as any)?.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                        (session.user as any)?.role === 'SUPER_ADMIN' ? 'bg-red-200 text-red-900' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {(session.user as any)?.role || 'USER'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/orders" className="block p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="font-medium text-gray-900">My Orders</div>
                  <div className="text-sm text-gray-500">View your order history</div>
                </Link>
                
                <Link href="/wishlist" className="block p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="font-medium text-gray-900">Wishlist</div>
                  <div className="text-sm text-gray-500">Manage saved items</div>
                </Link>
                
                <Link href="/dashboard" className="block p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="font-medium text-gray-900">Dashboard</div>
                  <div className="text-sm text-gray-500">Account overview</div>
                </Link>

                {((session.user as any)?.role === 'ADMIN' || (session.user as any)?.role === 'SUPER_ADMIN') && (
                  <Link href="/admin" className="block p-3 hover:bg-red-50 rounded-lg transition-colors">
                    <div className="font-medium text-red-900">Admin Panel</div>
                    <div className="text-sm text-red-600">Manage system</div>
                  </Link>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-sm text-blue-700 mb-4">
                Contact our support team for assistance with your account.
              </p>
              <Link href="/contact" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}