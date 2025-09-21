import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth"
import { UserRole } from "@prisma/client"
import { NextResponse } from "next/server"

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    )
  }
  
  return session
}

export async function requireRole(allowedRoles: UserRole[]) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    )
  }
  
  const userRole = session.user.role
  
  if (!allowedRoles.includes(userRole)) {
    return NextResponse.json(
      { error: "Insufficient permissions" },
      { status: 403 }
    )
  }
  
  return session
}

export async function requireAdmin() {
  return requireRole([UserRole.ADMIN, UserRole.SUPER_ADMIN])
}

export async function requireSuperAdmin() {
  return requireRole([UserRole.SUPER_ADMIN])
}