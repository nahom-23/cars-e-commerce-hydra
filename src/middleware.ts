import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token

    // Check if user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      // Redirect to signin if not authenticated
      if (!token) {
        const url = new URL('/auth/signin', req.url)
        url.searchParams.set('callbackUrl', req.nextUrl.pathname)
        return NextResponse.redirect(url)
      }
      
      // Redirect to 403 if authenticated but not admin
      if (token.role !== 'ADMIN' && token.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/403', req.url))
      }
    }

    // Check if user is trying to access super admin routes
    if (req.nextUrl.pathname.startsWith('/admin/super')) {
      if (!token || token.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow public routes
        const publicRoutes = ['/', '/catalog', '/product', '/contact', '/auth', '/403', '/setup-admin', '/test-db']
        const isPublicRoute = publicRoutes.some(route => 
          req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(route + '/')
        )
        
        // Allow routes that handle authentication with modals
        const modalAuthRoutes = ['/dashboard', '/wishlist', '/profile', '/cart', '/checkout', '/recently-viewed']
        const isModalAuthRoute = modalAuthRoutes.some(route => 
          req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith(route + '/')
        )
        
        if (isPublicRoute || isModalAuthRoute) {
          return true
        }

        // Admin routes require authentication (handled in middleware function above)
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return true // Let the middleware function handle the role check
        }

        // Other protected routes require authentication
        return !!token
      },
    },
    pages: {
      signIn: '/auth/signin',
      error: '/auth/error',
    }
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/orders/:path*'
  ]
}