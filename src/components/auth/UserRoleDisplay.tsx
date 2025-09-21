'use client'

import { useSession } from "next-auth/react"
import { Shield, ShieldCheck, User } from "lucide-react"
import { UserRole } from "@prisma/client"

export default function UserRoleDisplay() {
  const { data: session } = useSession()
  
  if (!session?.user) return null
  
  const role = session.user.role
  
  const getRoleInfo = () => {
    switch(role) {
      case UserRole.SUPER_ADMIN:
        return {
          label: "Super Admin",
          icon: <ShieldCheck className="w-4 h-4" />,
          color: "text-purple-600 bg-purple-100"
        }
      case UserRole.ADMIN:
        return {
          label: "Admin",
          icon: <Shield className="w-4 h-4" />,
          color: "text-blue-600 bg-blue-100"
        }
      case UserRole.USER:
      default:
        return {
          label: "User",
          icon: <User className="w-4 h-4" />,
          color: "text-gray-600 bg-gray-100"
        }
    }
  }
  
  const roleInfo = getRoleInfo()
  
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roleInfo.color}`}>
      {roleInfo.icon}
      <span>{roleInfo.label}</span>
    </div>
  )
}