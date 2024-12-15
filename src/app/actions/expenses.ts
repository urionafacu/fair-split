'use server'

import { AuthTokens } from '@/constants/auth'
import { API_BASE_URL } from '@/utils/config'
import { cookies } from 'next/headers'

export const getExpenses = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(AuthTokens.ACCESS)?.value

  if (!accessToken) {
    throw new Error('User does not have session')
  }

  const response = await fetch(`${API_BASE_URL}/expenses/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Bad request')
  }

  return response.json()
}
