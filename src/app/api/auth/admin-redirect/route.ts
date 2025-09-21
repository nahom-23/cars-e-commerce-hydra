import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ redirect: '/auth/signin' })
    }
    
    const userRole = session.user.role
    
    // Redirect admins to admin panel, others to dashboard
    if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
      return NextResponse.json({ redirect: '/admin' })
    } else {
      return NextResponse.json({ redirect: '/dashboard' })
    }
  } catch (error) {
    return NextResponse.json({ redirect: '/dashboard' })
  }
}