import { cookies } from 'next/headers'
import { AuthTokens } from '@/constants/auth'
import { TokenResponse } from '@/types/auth'

export async function refreshAccessToken(): Promise<TokenResponse | null> {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get(AuthTokens.REFRESH)?.value

  if (!refreshToken) return null

  try {
    const response = await fetch(`${AuthTokens}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) {
      cookieStore.delete(AuthTokens.ACCESS)
      cookieStore.delete(AuthTokens.REFRESH)
      return null
    }

    const data: TokenResponse = await response.json()
    return data
  } catch (_) {
    return null
  }
}
