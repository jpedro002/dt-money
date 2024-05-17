import AuthService from '@/modules/auth/actions/authService'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  const session = await AuthService.isSessionValid()

  if (!session && pathname !== '/auth' && pathname !== '/auth/register') {
    return NextResponse.redirect(new URL('/auth', req.url))
  } else if (
    session &&
    (pathname === '/auth' || pathname === '/auth/register')
  ) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
}
