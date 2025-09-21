import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-auth"
import prisma from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAdmin()
  
  if (authResult instanceof NextResponse) {
    return authResult
  }
  
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
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
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description,
        price: price ? parseFloat(price) : undefined,
        discount: discount !== undefined ? parseFloat(discount) : undefined,
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
    
    return NextResponse.json(product)
  } catch (error: any) {
    console.error('Error updating product:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Product slug must be unique" },
        { status: 400 }
      )
    }
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAdmin()
  
  if (authResult instanceof NextResponse) {
    return authResult
  }
  
  try {
    await prisma.product.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    )
  }
}