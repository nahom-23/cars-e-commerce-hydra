import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { items } = await request.json()

    // Clear existing cart items
    await prisma.cartItem.deleteMany({
      where: {
        userId: session.user.id
      }
    })

    // Add new cart items
    if (items.length > 0) {
      const cartItemsData = items.map((item: any) => ({
        userId: session.user.id,
        productId: item.productId,
        quantity: item.quantity
      }))

      await prisma.cartItem.createMany({
        data: cartItemsData
      })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error syncing cart:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}