import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Fetch recent orders
    const recentOrders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    // Fetch recent wishlist additions
    const recentWishlistItems = await prisma.wishlistItem.findMany({
      where: { userId },
      include: {
        product: true
      },
      orderBy: { createdAt: 'desc' },
      take: 3
    })

    // Create activity timeline
    const activities = []

    // Add order activities
    for (const order of recentOrders) {
      const productName = order.items[0]?.product?.name || 'Multiple items'
      
      activities.push({
        id: `order-${order.id}`,
        type: 'order',
        title: `Order #${order.orderNumber} ${order.status.toLowerCase()}`,
        description: `${productName}${order.items.length > 1 ? ` and ${order.items.length - 1} more` : ''}`,
        date: order.createdAt,
        status: order.status,
        icon: 'order'
      })
    }

    // Add wishlist activities
    for (const wishlistItem of recentWishlistItems) {
      activities.push({
        id: `wishlist-${wishlistItem.id}`,
        type: 'wishlist',
        title: 'Added item to wishlist',
        description: wishlistItem.product.name,
        date: wishlistItem.createdAt,
        icon: 'wishlist'
      })
    }

    // Sort all activities by date (most recent first)
    activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Return the most recent 5 activities
    return NextResponse.json(activities.slice(0, 5))

  } catch (error) {
    console.error('Error fetching user activity:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user activity' },
      { status: 500 }
    )
  }
}