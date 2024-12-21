import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthTokens } from '@/constants/auth'
import { obtainNewAccessToken } from './utils/jwt.utils'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/',
  // , '/dashboard',
  // '/profile'
] as const

// Routes that are only accessible without authentication
const AUTH_ROUTES = ['/login', '/register'] as const

type ProtectedRoute = (typeof PROTECTED_ROUTES)[number]
type AuthRoute = (typeof AUTH_ROUTES)[number]

const isProtectedRoute = (path: string): path is ProtectedRoute => {
  return PROTECTED_ROUTES.includes(path as ProtectedRoute)
}

const isAuthRoute = (path: string): path is AuthRoute => {
  return AUTH_ROUTES.includes(path as AuthRoute)
}

const setAccessTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set(AuthTokens.ACCESS, token, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'lax',
    path: '/',
    maxAge: 330, // 4.5 minutes
  })
  return response
}

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url)
  const accessToken = request.cookies.get(AuthTokens.ACCESS)?.value
  const refreshToken = request.cookies.get(AuthTokens.REFRESH)?.value

  // If the user is authenticated (has a refresh token) and tries to access auth routes
  if (isAuthRoute(pathname) && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If the user has a valid access token, allow access
  if (accessToken) {
    return NextResponse.next()
  }

  // If it's a protected route and there's no refresh token, redirect to login
  if (isProtectedRoute(pathname) && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If there's a refresh token, try to obtain a new access token
  if (refreshToken) {
    try {
      const newAccessToken = await obtainNewAccessToken(refreshToken)
      return setAccessTokenCookie(NextResponse.next(), newAccessToken)
    } catch (_) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // For any other route not specified, allow access
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/register'],
}
