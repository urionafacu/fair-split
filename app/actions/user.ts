'use server'

import { AuthTokens } from '@/constants/auth'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { API_BASE_URL } from '@/utils/config'
import camelcaseKeys from 'camelcase-keys'
import { User } from '@/types/user.types'

export const getUserAction = async (): Promise<User> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(AuthTokens.ACCESS)?.value

  if (!accessToken) {
    throw new Error('User does not have session')
  }

  const userId = (jwtDecode(accessToken) as { user_id: string })?.user_id

  if (!userId) {
    throw new Error('User does not have session')
  }

  const response = await fetch(`${API_BASE_URL}/users/${userId}/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Bad request')
  }

  const data = await response.json()

  return camelcaseKeys(data, { deep: true })
}
