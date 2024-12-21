'use server'

import { revalidateTag } from 'next/cache'
import { AuthTokens } from '@/constants/auth'
import { Expense } from '@/types/expenses.types'
import { API_BASE_URL } from '@/utils/config'
import camelcaseKeys from 'camelcase-keys'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

export const getExpensesAction = async (): Promise<Expense[]> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(AuthTokens.ACCESS)?.value

  if (!accessToken) {
    throw new Error('User does not have session')
  }

  const userId = (jwtDecode(accessToken) as { user_id: string })?.user_id

  if (!userId) {
    throw new Error('User does not have session')
  }

  const response = await fetch(`${API_BASE_URL}/expenses/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: {
      tags: ['expenses', userId.toString()],
    },
  })

  if (!response.ok) {
    throw new Error('Bad request')
  }

  const data = await response.json()

  return camelcaseKeys(data, { deep: true })
}

export const addExpenseAction = async (
  expense: Pick<Expense, 'name' | 'amount' | 'date' | 'group'>,
): Promise<Expense> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(AuthTokens.ACCESS)?.value

  if (!accessToken) {
    throw new Error('User does not have session')
  }

  const userId = (jwtDecode(accessToken) as { user_id: string })?.user_id

  if (!userId) {
    throw new Error('User does not have session')
  }

  const response = await fetch(`${API_BASE_URL}/expenses/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(expense),
  })

  if (!response.ok) {
    throw new Error('Bad request')
  }

  const data = await response.json()

  revalidateTag('expenses')
  revalidateTag(userId.toString())

  return camelcaseKeys(data, { deep: true })
}

export const deleteExpenseAction = async (id: Expense['id']): Promise<void> => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(AuthTokens.ACCESS)?.value

  if (!accessToken) {
    throw new Error('User does not have session')
  }

  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Bad request')
  }
}
