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
    const includeProducts = searchParams.get('includeProducts') === 'true'
    const parentId = searchParams.get('parentId')
    
    const where = parentId ? { parentId } : {}
    
    const categories = await prisma.category.findMany({
      where,
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
        ...(includeProducts && {
          products: {
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              isActive: true
            }
          }
        }),
        _count: {
          select: {
            products: true,
            children: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: "Failed to fetch categories" },
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
    const { name, slug, description, image, parentId } = body
    
    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      )
    }
    
    const category = await prisma.category.create({
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
    
    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    console.error('Error creating category:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Category slug must be unique" },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    )
  }
}