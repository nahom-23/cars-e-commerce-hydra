import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '8')

    const latestProducts = await prisma.product.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit,
      include: {
        category: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })

    const formattedProducts = latestProducts.map(product => {
      const hasDiscount = product.discount && product.discount > 0
      const discountedPrice = hasDiscount 
        ? product.price * (1 - product.discount / 100)
        : product.price

      return {
        id: product.id,
        title: product.name,
        slug: product.slug,
        price: discountedPrice,
        originalPrice: hasDiscount ? product.price : undefined,
        discount: hasDiscount ? `${Math.round(product.discount)}%` : undefined,
        images: product.images,
        category: product.category,
        make: product.make,
        model: product.model,
        year: product.year,
        productType: product.productType,
        rating: 4.33,
        reviewCount: Math.floor(Math.random() * 50) + 1
      }
    })

    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error('Error fetching latest products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch latest products' },
      { status: 500 }
    )
  }
}