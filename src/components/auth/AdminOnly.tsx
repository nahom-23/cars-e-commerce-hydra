'use client'

import { useSession } from "next-auth/react"
import { UserRole } from "@prisma/client"
import { ReactNode } from "react"

interface AdminOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

export default function AdminOnly({ 
  children, 
  fallback = null 
}: AdminOnlyProps) {
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return null
  }
  
  if (!session?.user) {
    return <>{fallback}</>
  }
  
  const userRole = session.user.role
  
  if (userRole !== UserRole.ADMIN && userRole !== UserRole.SUPER_ADMIN) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}