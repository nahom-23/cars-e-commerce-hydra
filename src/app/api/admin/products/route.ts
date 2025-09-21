import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-auth"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const authResult = await requireAdmin()
  
  if (authResult instanceof NextResponse) {
    return authResult
  }
  
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    
    const skip = (page - 1) * limit
    
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
        { make: { contains: search, mode: 'insensitive' as const } },
        { model: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {}
    
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
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.product.count({ where })
    ])
    
    return NextResponse.json({
      products,
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

export async function POST(request: NextRequest) {
  const authResult = await requireAdmin()
  
  if (authResult instanceof NextResponse) {
    return authResult
  }
  
  try {
    const body = await request.json()
    const {
      name,
      slug,
      description,
      price,
      discount,
      images,
      downloadUrl,
      fileSize,
      version,
      make,
      model,
      year,
      engineType,
      fuelType,
      transmission,
      productType,
      categoryId,
      isActive,
      featured
    } = body
    
    if (!name || !slug || !price || !categoryId || !productType) {
      return NextResponse.json(
        { error: "Name, slug, price, category, and product type are required" },
        { status: 400 }
      )
    }
    
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : 0,
        images: images || [],
        downloadUrl,
        fileSize,
        version,
        make,
        model,
        year,
        engineType,
        fuelType,
        transmission,
        productType,
        categoryId,
        isActive: isActive ?? true,
        featured: featured ?? false
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })
    
    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error('Error creating product:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Product slug must be unique" },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}