import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthTokens } from '@/constants/auth'
import { API_BASE_URL } from '@/utils/config'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(AuthTokens.ACCESS)?.value

  if (!accessToken) {
    const refreshToken = request.cookies.get(AuthTokens.REFRESH)?.value

    if (refreshToken) {
      try {
        const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
        })

        if (response.ok) {
          const data = await response.json()

          const newResponse = NextResponse.next()

          newResponse.cookies.set(AuthTokens.ACCESS, data.access, {
            httpOnly: true,
            secure: IS_PRODUCTION,
            sameSite: 'lax',
            path: '/',
            maxAge: 300,
          })

          return newResponse
        }
      } catch (_) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }

    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
