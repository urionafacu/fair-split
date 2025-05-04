'use client'

import { useTransition } from 'react'
import { Input } from '@/components/primitives/input'
import { Props } from './register-form.types'
import { cn } from '@/utils/cn.utils'
import { Button } from '@/components/primitives/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
// import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { registerSchema, RegisterSchemaType } from './register-form.schema'
import { zodResolver } from '@hookform/resolvers/zod'

export const RegisterForm = ({ className }: Props) => {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterSchemaType) => {
    if (isPending) return

    startTransition(async () => {
      try {
        // const { success } = await registerUserAction(data)
        // if (!success) {
        //   toast({
        //     title: 'Ups!',
        //     description: 'Las credenciales no son las correctas',
        //     variant: 'destructive',
        //   })
        //   return
        // }
        // router.replace('/')
      } catch {
        toast.error('Error', {
          description: 'Ocurrió un error al iniciar sesión',
        })
      }
    })
  }

  return (
    <form className={`${cn(className, 'flex flex-col gap-4')}`} onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="firstName"
        type="text"
        placeholder="Juan Carlos"
        label="Nombre completo"
        error={errors.email?.message}
        {...register('firstName')}
      />
      <Input
        id="lastName"
        type="text"
        placeholder="Pérez"
        label="Apellido"
        error={errors.lastName?.message}
        {...register('lastName')}
      />
      <Input
        id="email"
        type="email"
        placeholder="Ingresar e-mail"
        label="E-mail"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        id="password"
        type="password"
        placeholder="Ingresar contraseña"
        label="Contraseña"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        id="confirmPassword"
        type="password"
        placeholder="Ingresar contraseña"
        label="Contraseña"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button type="submit" className="w-full mt-4" disabled={isPending}>
        {isPending ? <Loader2 className="animate-spin" /> : 'Registrarse'}
      </Button>
    </form>
  )
}
