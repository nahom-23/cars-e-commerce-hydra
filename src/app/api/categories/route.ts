import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
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
            where: {
              isActive: true // Only include active products
            },
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              featured: true
            }
          }
        }),
        _count: {
          select: {
            products: {
              where: {
                isActive: true // Only count active products
              }
            },
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