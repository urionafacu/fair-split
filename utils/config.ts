import { z } from 'zod'

const envSchema = z.object({
  API_BASE_URL: z.string().url().min(1, 'API_BASE_URL is required'),
})

const { success, error, data } = envSchema.safeParse(process.env)

if (!success) {
  console.error(error.format())
  process.exit()
}

export const { API_BASE_URL } = data
