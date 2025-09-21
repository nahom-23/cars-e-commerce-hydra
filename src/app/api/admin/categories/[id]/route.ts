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
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            isActive: true
          }
        },
        _count: {
          select: {
            products: true,
            children: true
          }
        }
      }
    })
    
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch category" },
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
    const { name, slug, description, image, parentId } = body
    
    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description,
        image,
        parentId: parentId || null
      },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        _count: {
          select: {
            products: true,
            children: true
          }
        }
      }
    })
    
    return NextResponse.json(category)
  } catch (error: any) {
    console.error('Error updating category:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Category slug must be unique" },
        { status: 400 }
      )
    }
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to update category" },
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
    // Check if category has products or subcategories
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            products: true,
            children: true
          }
        }
      }
    })
    
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }
    
    if (category._count.products > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with products. Move or delete products first." },
        { status: 400 }
      )
    }
    
    if (category._count.children > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with subcategories. Delete subcategories first." },
        { status: 400 }
      )
    }
    
    await prisma.category.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: "Category deleted successfully" })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    )
  }
}