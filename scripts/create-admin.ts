import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const prisma = new PrismaClient()

async function createAdminUser() {
  const email = 'admin@example.com'
  const password = 'admin123' // Change this to a secure password
  const hashedPassword = await bcrypt.hash(password, 10)
  
  try {
    // Check if admin user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      // Update existing user to admin
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { role: UserRole.ADMIN }
      })
      console.log('✅ Updated existing user to admin:', updatedUser.email)
    } else {
      // Create new admin user
      const adminUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: 'Admin User',
          role: UserRole.ADMIN
        }
      })
      console.log('✅ Created admin user:', adminUser.email)
    }
    
    console.log('\n📧 Login credentials:')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('\n🔐 You can now login at /auth/signin')
    
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()