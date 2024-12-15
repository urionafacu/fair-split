'use server'

import { AuthTokens } from '@/constants/auth'
import { Expense } from '@/types/expenses'
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

export const addExpense = async (
  expense: Omit<Expense, 'id' | 'created_at' | 'updated_at' | 'date'>,
) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(AuthTokens.ACCESS)?.value

  if (!accessToken) {
    throw new Error('User does not have session')
  }

  const response = await fetch(`${API_BASE_URL}/expenses/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify(expense),
  })

  if (!response.ok) {
    throw new Error('Bad request')
  }

  return response.json()
}
