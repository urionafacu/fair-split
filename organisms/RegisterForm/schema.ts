import { z } from 'zod'

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, {
        message: 'El nombre es requerido',
      })
      .max(150, {
        message: 'El nombre no debe superar los 150 caracteres',
      }),
    lastName: z
      .string()
      .trim()
      .min(1, {
        message: 'El apellido es requerido',
      })
      .max(150, {
        message: 'El apellido no debe superar los 150 caracteres',
      }),
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
    confirmPassword: z
      .string()
      .trim()
      .min(1, {
        message: 'La confirmación de contraseña es requerida',
      })
      .min(8, {
        message: 'La confirmación de contraseña debe contener por lo menos 8 caracteres',
      })
      .max(128, {
        message: 'La confirmación de contraseña no debe superar los 128 caracteres',
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword'],
      })
    }
  })

export type RegisterSchemaType = z.infer<typeof registerSchema>
