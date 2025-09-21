'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  ShoppingCart, 
  DollarSign, 
  Heart, 
  Download, 
  User, 
  MessageCircle, 
  BarChart3,
  Package,
  Settings,
  CheckCircle,
  Clock,
  Eye,
  Trash2,
  Plus
} from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DashboardCard from '@/components/dashboard/DashboardCard'
import Sidebar from '@/components/dashboard/Sidebar'
import DataTable from '@/components/dashboard/DataTable'
import LoginModal from '@/components/auth/LoginModal'
import SignupModal from '@/components/auth/SignupModal'

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [userActivity, setUserActivity] = useState([])
  const [activityLoading, setActivityLoading] = useState(true)
  const [userStats, setUserStats] = useState(null)
  const [userOrders, setUserOrders] = useState([])
  const [userWishlist, setUserWishlist] = useState([])
  const [statsLoading, setStatsLoading] = useState(true)
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [wishlistLoading, setWishlistLoading] = useState(true)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    language: 'en',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileMessage, setProfileMessage] = useState('')
  const [profileError, setProfileError] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      setShowLoginModal(true)
    } else {
      fetchUserData()
      setProfileData({
        name: session.user?.name || '',
        email: session.user?.email || '',
        language: 'en',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
  }, [session, status, router])

  const fetchUserData = async () => {
    await Promise.all([
      fetchUserActivity(),
      fetchUserStats(),
      fetchUserOrders(),
      fetchUserWishlist()
    ])
  }

  const fetchUserActivity = async () => {
    try {
      setActivityLoading(true)
      const response = await fetch('/api/user/activity')
      if (response.ok) {
        const data = await response.json()
        setUserActivity(data)
      }
    } catch (error) {
      console.error('Error fetching user activity:', error)
    } finally {
      setActivityLoading(false)
    }
  }

  const fetchUserStats = async () => {
    try {
      setStatsLoading(true)
      const response = await fetch('/api/user/stats')
      if (response.ok) {
        const data = await response.json()
        setUserStats(data)
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
    } finally {
      setStatsLoading(false)
    }
  }

  const fetchUserOrders = async () => {
    try {
      setOrdersLoading(true)
      const response = await fetch('/api/user/orders')
      if (response.ok) {
        const data = await response.json()
        setUserOrders(data)
      }
    } catch (error) {
      console.error('Error fetching user orders:', error)
    } finally {
      setOrdersLoading(false)
    }
  }

  const fetchUserWishlist = async () => {
    try {
      setWishlistLoading(true)
      const response = await fetch('/api/user/wishlist')
      if (response.ok) {
        const data = await response.json()
        setUserWishlist(data)
      }
    } catch (error) {
      console.error('Error fetching user wishlist:', error)
    } finally {
      setWishlistLoading(false)
    }
  }

  const removeFromWishlist = async (itemId: string) => {
    try {
      const response = await fetch(`/api/user/wishlist?itemId=${itemId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setUserWishlist(userWishlist.filter((item: any) => item.id !== itemId))
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error)
    }
  }

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
    setProfileError('')
    setProfileMessage('')
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!profileData.name.trim() || !profileData.email.trim()) {
      setProfileError('Name and email are required')
      return
    }

    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      setProfileError('New passwords do not match')
      return
    }

    if (profileData.newPassword && profileData.newPassword.length < 6) {
      setProfileError('New password must be at least 6 characters')
      return
    }

    try {
      setProfileLoading(true)
      setProfileError('')
      setProfileMessage('')

      const updateData: any = {
        name: profileData.name.trim(),
        email: profileData.email.trim(),
        language: profileData.language
      }

      if (profileData.newPassword) {
        updateData.currentPassword = profileData.currentPassword
        updateData.newPassword = profileData.newPassword
      }

      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })

      const data = await response.json()

      if (response.ok) {
        setProfileMessage('Profile updated successfully!')
        setProfileData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }))
        // Update session data would require session refresh
        window.location.reload()
      } else {
        setProfileError(data.error || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setProfileError('Failed to update profile')
    } finally {
      setProfileLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Dashboard</h1>
            <p className="text-gray-600 mb-8">Please sign in to access your dashboard</p>
            <div className="space-x-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>

        {/* Login/Signup Modals */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false)
            router.push('/')
          }}
          onSwitchToSignup={() => {
            setShowLoginModal(false)
            setShowSignupModal(true)
          }}
        />

        <SignupModal
          isOpen={showSignupModal}
          onClose={() => {
            setShowSignupModal(false)
            router.push('/')
          }}
          onSwitchToLogin={() => {
            setShowSignupModal(false)
            setShowLoginModal(true)
          }}
        />
      </>
    )
  }


  const sidebarSections = [
    {
      items: [
        { id: 'overview', name: 'Overview', icon: BarChart3, active: activeTab === 'overview' },
        { id: 'orders', name: 'My Orders', icon: ShoppingCart, active: activeTab === 'orders', badge: userOrders.length > 0 ? userOrders.length.toString() : undefined },
        { id: 'downloads', name: 'Downloads', icon: Download, active: activeTab === 'downloads' },
        { id: 'wishlist', name: 'Wishlist', icon: Heart, active: activeTab === 'wishlist', badge: userWishlist.length > 0 ? userWishlist.length.toString() : undefined },
      ]
    },
    {
      title: 'Account',
      items: [
        { id: 'profile', name: 'Profile', icon: User, active: activeTab === 'profile' },
        { id: 'settings', name: 'Settings', icon: Settings, active: activeTab === 'settings' },
        { id: 'support', name: 'Support', icon: MessageCircle, active: activeTab === 'support' },
        { id: 'logout', name: 'Logout', icon: User, active: false }
      ]
    }
  ]

  const user = {
    name: session.user?.name || 'User',
    role: (session.user as any)?.role || 'USER'
  }

  const orderColumns = [
    {
      key: 'id',
      title: 'Order ID',
      sortable: true,
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'product',
      title: 'Product',
      sortable: true
    },
    {
      key: 'date',
      title: 'Date',
      sortable: true
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (value: string) => (
        <span className="font-semibold text-gray-900">{value}</span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Completed' ? 'bg-green-100 text-green-800' :
          value === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
          {value === 'Processing' && <Clock className="w-3 h-3 mr-1" />}
          {value}
        </span>
      )
    },
    {
      key: 'downloadLink',
      title: 'Actions',
      render: (value: string | null, row: any) => (
        value ? (
          <a
            href={value}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </a>
        ) : (
          <span className="text-gray-400 text-sm">Pending</span>
        )
      )
    }
  ]

  return (
    <DashboardLayout
      title="My Dashboard"
      user={user}
      sidebar={
        <Sidebar
          sections={sidebarSections}
          onItemClick={(itemId) => {
            if (itemId === 'logout') {
              handleLogout()
            } else {
              setActiveTab(itemId)
            }
          }}
          user={user}
        />
      }
    >
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {statsLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              ))
            ) : userStats ? (
              <>
                <DashboardCard
                  title="Total Orders"
                  value={userStats.totalOrders.value}
                  icon={ShoppingCart}
                  iconColor="blue"
                  trend={userStats.totalOrders.trend}
                  subtitle={userStats.totalOrders.subtitle}
                />
                <DashboardCard
                  title="Total Spent"
                  value={userStats.totalSpent.value}
                  icon={DollarSign}
                  iconColor="green"
                  trend={userStats.totalSpent.trend}
                  subtitle={userStats.totalSpent.subtitle}
                />
                <DashboardCard
                  title="Wishlist Items"
                  value={userStats.wishlistItems.value}
                  icon={Heart}
                  iconColor="red"
                  subtitle={userStats.wishlistItems.subtitle}
                />
              </>
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">Unable to load statistics</p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              {activityLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-4 animate-pulse">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : userActivity.length > 0 ? (
                <div className="space-y-4">
                  {userActivity.map((activity: any) => {
                    const getActivityIcon = (type: string, status?: string) => {
                      if (type === 'order') {
                        if (status === 'COMPLETED') {
                          return { icon: CheckCircle, bgColor: 'bg-green-100', iconColor: 'text-green-600' }
                        }
                        return { icon: ShoppingCart, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' }
                      }
                      if (type === 'wishlist') {
                        return { icon: Heart, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' }
                      }
                      return { icon: Package, bgColor: 'bg-gray-100', iconColor: 'text-gray-600' }
                    }

                    const { icon: Icon, bgColor, iconColor } = getActivityIcon(activity.type, activity.status)
                    const timeAgo = new Date(activity.date).toLocaleDateString()

                    return (
                      <div key={activity.id} className="flex items-start space-x-4">
                        <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.description} - {timeAgo}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No recent activity</p>
                  <p className="text-sm text-gray-400">Your activity will appear here when you make orders or add items to your wishlist.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        ordersLoading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <DataTable
            columns={orderColumns}
            data={userOrders}
            title="My Orders"
            subtitle="Track your order history and downloads"
            searchable
            filterable
          />
        )
      )}

      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
              <p className="text-gray-600">Products you've saved for later</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Browse Catalog</span>
            </button>
          </div>
          
          {wishlistLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="flex space-x-2">
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        <div className="h-8 w-24 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : userWishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userWishlist.map((item: any) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-t-xl" />
                    ) : (
                      <Package className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">{item.price}</span>
                        {item.discount > 0 && (
                          <span className="text-sm text-green-600">-{item.discount}%</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-1">
                          <Plus className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">Start adding products you love to your wishlist!</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto">
                <Eye className="w-5 h-5" />
                <span>Browse Products</span>
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
              <p className="text-gray-600">Manage your account information and preferences</p>
            </div>
            <div className="p-6">
              {profileMessage && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700">{profileMessage}</p>
                </div>
              )}
              {profileError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{profileError}</p>
                </div>
              )}
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language Preference
                  </label>
                  <select 
                    value={profileData.language}
                    onChange={(e) => handleProfileChange('language', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="zh">Chinese</option>
                    <option value="ar">Arabic</option>
                    <option value="fr">French</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
                
                <div className="flex space-x-4">
                  <button 
                    type="submit"
                    disabled={profileLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    {profileLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setProfileData({
                        name: session.user?.name || '',
                        email: session.user?.email || '',
                        language: 'en',
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      })
                      setProfileError('')
                      setProfileMessage('')
                    }}
                    className="border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
              <p className="text-gray-600">Update your password to keep your account secure</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={profileData.currentPassword}
                    onChange={(e) => handleProfileChange('currentPassword', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your current password"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={profileData.newPassword}
                      onChange={(e) => handleProfileChange('newPassword', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) => handleProfileChange('confirmPassword', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Password must be at least 6 characters long
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}