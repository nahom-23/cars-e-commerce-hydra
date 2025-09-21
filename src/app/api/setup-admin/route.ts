import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { UserRole } from "@prisma/client"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Update the user role to admin
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: UserRole.ADMIN },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    })

    return NextResponse.json({ 
      message: "User role updated to admin",
      user: updatedUser 
    })

  } catch (error: any) {
    console.error('Setup admin error:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to setup admin user" },
      { status: 500 }
    )
  }
}