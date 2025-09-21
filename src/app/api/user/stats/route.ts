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

    // Get current date and date ranges
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()
    const lastMonth = new Date(currentYear, currentMonth - 1)
    const currentYearStart = new Date(currentYear, 0, 1)

    // Fetch total orders count
    const totalOrdersCount = await prisma.order.count({
      where: { userId }
    })

    // Fetch orders from last month for trend calculation
    const lastMonthOrdersCount = await prisma.order.count({
      where: {
        userId,
        createdAt: {
          gte: lastMonth,
          lt: new Date(currentYear, currentMonth, 1)
        }
      }
    })

    // Fetch total spent this year
    const totalSpentResult = await prisma.order.aggregate({
      where: {
        userId,
        createdAt: {
          gte: currentYearStart
        },
        status: {
          not: 'CANCELLED'
        }
      },
      _sum: {
        totalAmount: true
      }
    })

    // Fetch total spent last year for trend calculation
    const lastYearStart = new Date(currentYear - 1, 0, 1)
    const lastYearEnd = new Date(currentYear, 0, 1)
    
    const lastYearSpentResult = await prisma.order.aggregate({
      where: {
        userId,
        createdAt: {
          gte: lastYearStart,
          lt: lastYearEnd
        },
        status: {
          not: 'CANCELLED'
        }
      },
      _sum: {
        totalAmount: true
      }
    })

    // Fetch wishlist count
    const wishlistCount = await prisma.wishlistItem.count({
      where: { userId }
    })

    // Calculate trends
    const currentYearSpent = totalSpentResult._sum.totalAmount || 0
    const lastYearSpent = lastYearSpentResult._sum.totalAmount || 0
    const spentTrend = lastYearSpent > 0 
      ? ((currentYearSpent - lastYearSpent) / lastYearSpent * 100).toFixed(0)
      : currentYearSpent > 0 ? '100' : '0'

    // For orders trend, we'll use current month vs last month
    const ordersTrend = lastMonthOrdersCount > 0 
      ? ((totalOrdersCount - lastMonthOrdersCount) / lastMonthOrdersCount * 100).toFixed(0)
      : totalOrdersCount > 0 ? '100' : '0'

    const stats = {
      totalOrders: {
        value: totalOrdersCount.toString(),
        trend: {
          value: `${ordersTrend >= 0 ? '+' : ''}${ordersTrend}%`,
          isPositive: parseInt(ordersTrend) >= 0
        },
        subtitle: 'Since last month'
      },
      totalSpent: {
        value: `$${currentYearSpent.toFixed(0)}`,
        trend: {
          value: `${spentTrend >= 0 ? '+' : ''}${spentTrend}%`,
          isPositive: parseInt(spentTrend) >= 0
        },
        subtitle: 'This year'
      },
      wishlistItems: {
        value: wishlistCount.toString(),
        subtitle: 'Saved products'
      }
    }

    return NextResponse.json(stats)

  } catch (error) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user stats' },
      { status: 500 }
    )
  }
}