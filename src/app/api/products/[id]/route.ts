import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { 
        id: params.id,
        isActive: true // Only show active products to users
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
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }
    
    // Transform product for frontend
    const transformedProduct = {
      id: product.id,
      title: product.name,
      price: product.price,
      originalPrice: product.discount && product.discount > 0 
        ? product.price / (1 - product.discount / 100)
        : null,
      discount: product.discount > 0 ? `${Math.round(product.discount)}%` : null,
      rating: 4.5, // Default rating - implement real ratings later
      reviewCount: Math.floor(Math.random() * 50) + 1, // Random for now
      images: product.images,
      description: product.description,
      make: product.make,
      model: product.model,
      year: product.year,
      engineType: product.engineType,
      fuelType: product.fuelType,
      transmission: product.transmission,
      category: product.category,
      productType: product.productType,
      featured: product.featured,
      downloadUrl: product.downloadUrl,
      fileSize: product.fileSize,
      version: product.version,
      slug: product.slug
    }
    
    return NextResponse.json(transformedProduct)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}