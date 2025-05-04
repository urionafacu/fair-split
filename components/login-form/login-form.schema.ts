import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: 'Email es requerido',
    })
    .max(50, {
      message: 'El email no debe superar los 50 caracteres',
    })
    .email({
      message: 'El email no es válido',
    }),
  password: z
    .string()
    .trim()
    .min(1, {
      message: 'La contraseña es requerida',
    })
    .min(8, {
      message: 'La contraseña debe contener por lo menos 8 caracteres',
    })
    .max(128, {
      message: 'La contraseña no debe superar los 128 caracteres',
    }),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
