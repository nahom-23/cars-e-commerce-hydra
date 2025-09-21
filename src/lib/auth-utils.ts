import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth"
import { UserRole } from "@prisma/client"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN
}

export async function isSuperAdmin() {
  const user = await getCurrentUser()
  return user?.role === UserRole.SUPER_ADMIN
}

export async function hasRole(role: UserRole) {
  const user = await getCurrentUser()
  return user?.role === role
}

export async function canAccessAdminPanel() {
  return await isAdmin()
}

export function checkRole(userRole: UserRole | undefined, allowedRoles: UserRole[]) {
  if (!userRole) return false
  return allowedRoles.includes(userRole)
}