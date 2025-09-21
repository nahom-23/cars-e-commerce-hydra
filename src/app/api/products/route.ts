import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const categoryId = searchParams.get('categoryId')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const featured = searchParams.get('featured')
    
    const skip = (page - 1) * limit
    
    // Build where clause
    const where: any = {
      isActive: true, // Only show active products to users
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
        { make: { contains: search, mode: 'insensitive' as const } },
        { model: { contains: search, mode: 'insensitive' as const } }
      ]
    }
    
    if (categoryId && categoryId !== 'all') {
      where.categoryId = categoryId
    }
    
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }
    
    if (featured === 'true') {
      where.featured = true
    }
    
    // Build orderBy clause
    let orderBy: any = {}
    switch (sortBy) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'name':
        orderBy = { name: 'asc' }
        break
      case 'featured':
        orderBy = [{ featured: 'desc' }, { createdAt: 'desc' }]
        break
      default:
        orderBy = { createdAt: sortOrder }
    }
    
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        },
        orderBy,
        skip,
        take: limit
      }),
      prisma.product.count({ where })
    ])
    
    // Transform products for frontend
    const transformedProducts = products.map(product => ({
      id: product.id,
      title: product.name,
      price: product.price,
      originalPrice: product.discount && product.discount > 0 
        ? product.price / (1 - product.discount / 100)
        : null,
      discount: product.discount > 0 ? `${Math.round(product.discount)}%` : null,
      rating: 4.5, // Default rating - you can implement real ratings later
      reviewCount: Math.floor(Math.random() * 50) + 1, // Random for now
      images: product.images,
      description: product.description,
      make: product.make,
      model: product.model,
      year: product.year,
      category: product.category,
      productType: product.productType,
      featured: product.featured,
      downloadUrl: product.downloadUrl,
      fileSize: product.fileSize,
      version: product.version
    }))
    
    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}