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

    // Fetch user orders with products
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Transform orders for frontend
    const transformedOrders = orders.map(order => ({
      id: order.orderNumber,
      product: order.items.length === 1 
        ? order.items[0].product.name 
        : `${order.items[0].product.name} + ${order.items.length - 1} more`,
      date: order.createdAt.toISOString().split('T')[0],
      status: order.status,
      amount: `$${order.totalAmount.toFixed(2)}`,
      downloadLink: order.status === 'COMPLETED' ? order.downloadLinks[0] || '/downloads/order-' + order.id : null,
      items: order.items.map(item => ({
        id: item.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.price,
        downloadUrl: item.product.downloadUrl
      }))
    }))

    return NextResponse.json(transformedOrders)

  } catch (error) {
    console.error('Error fetching user orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user orders' },
      { status: 500 }
    )
  }
}