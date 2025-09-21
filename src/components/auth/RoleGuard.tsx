'use client'

import { useSession } from "next-auth/react"
import { UserRole } from "@prisma/client"
import { ReactNode } from "react"

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: UserRole[]
  fallback?: ReactNode
}

export default function RoleGuard({ 
  children, 
  allowedRoles, 
  fallback = null 
}: RoleGuardProps) {
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  }
  
  if (!session?.user) {
    return <>{fallback}</>
  }
  
  const userRole = session.user.role
  
  if (!allowedRoles.includes(userRole)) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}