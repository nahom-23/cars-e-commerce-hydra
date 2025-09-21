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

    // Fetch user wishlist items with products
    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            category: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Transform wishlist items for frontend
    const transformedWishlist = wishlistItems.map(item => ({
      id: item.id,
      name: item.product.name,
      price: `$${item.product.price.toFixed(2)}`,
      category: item.product.category.name,
      productId: item.product.id,
      slug: item.product.slug,
      image: item.product.images[0] || null,
      discount: item.product.discount || 0,
      createdAt: item.createdAt
    }))

    return NextResponse.json(transformedWishlist)

  } catch (error) {
    console.error('Error fetching user wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user wishlist' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const itemId = searchParams.get('itemId')

    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      )
    }

    const userId = session.user.id

    // Delete wishlist item
    await prisma.wishlistItem.delete({
      where: {
        id: itemId,
        userId: userId // Ensure user can only delete their own items
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error removing wishlist item:', error)
    return NextResponse.json(
      { error: 'Failed to remove wishlist item' },
      { status: 500 }
    )
  }
}