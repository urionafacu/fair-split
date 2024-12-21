import { API_BASE_URL } from './config'

export const obtainNewAccessToken = async (refreshToken: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
    method: 'POST',
    body: JSON.stringify({ refresh: refreshToken }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Bad request')
  }

  const data = await response.json()

  return data.access
}
