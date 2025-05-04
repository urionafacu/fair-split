'use server'

import { loginSchema, LoginSchemaType } from '@/components/login-form/login-form.schema'
import { API_BASE_URL } from '@/utils/config'
import { cookies } from 'next/headers'
import { AuthTokens } from '@/constants/auth'
import { RegisterSchemaType } from '@/components/register-form/register-form.schema'

export type Result = {
  message?: string
  success: boolean
  issues?: string[]
}

export const loginUserAction = async (formData: LoginSchemaType): Promise<Result> => {
  const parsed = loginSchema.safeParse(formData)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid form data',
    }
  }

  const response = await fetch(`${API_BASE_URL}/token/`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  if (!response.ok) {
    return {
      success: false,
      message: 'Authentication failed',
    }
  }

  const cookieStore = await cookies()

  cookieStore.set(AuthTokens.ACCESS, data.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 330, // 4.5 minutes
  })

  cookieStore.set(AuthTokens.REFRESH, data.refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  })

  return {
    message: 'Success',
    success: true,
  }
}

export const logoutAction = async (): Promise<Result> => {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get(AuthTokens.REFRESH)?.value

  if (!refreshToken) {
    return {
      success: false,
      message: 'User does not have session',
    }
  }

  cookieStore.delete(AuthTokens.ACCESS)
  cookieStore.delete(AuthTokens.REFRESH)

  return {
    success: true,
    message: 'Success',
  }
}

// export const registerUserAction = async (formData: RegisterSchemaType): Promise<Result> => {}
