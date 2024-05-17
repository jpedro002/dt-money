import AuthService from '@/modules/auth/actions/authService'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}

const publicRoutes = ['/auth', '/auth/register']

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  const session = await AuthService.isSessionValid()

  const isAPIRoute = pathname.startsWith('/api')

  if (!session) {
    if (isAPIRoute) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    } else {
      return NextResponse.redirect(new URL('/auth', req.url))
    }
  } else if (pathname === '/auth' || pathname === '/auth/register') {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
}
