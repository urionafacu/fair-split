'use client'

import { useState, useTransition } from 'react'
import { loginUserAction } from '@/app/actions/auth'
import { Input } from '@/components/primitives/input'
import { Props } from './login-form.types'
import { Button } from '@/components/primitives/button'
import { cn } from '@/utils/cn.utils'
import { Switch } from '@/components/primitives/switch'
import { Label } from '@/components/primitives/label'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { LoginSchemaType, loginSchema } from './login-form.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const LoginForm = ({ className }: Props) => {
  const [isPending, startTransition] = useTransition()
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginSchemaType) => {
    if (isPending) return

    startTransition(async () => {
      try {
        const { success } = await loginUserAction(data)

        if (!success) {
          toast.error('Ups!', {
            description: 'Las credenciales no son las correctas',
          })
          return
        }

        router.replace('/')
      } catch {
        toast.error('Error', {
          description: 'Ocurrió un error al iniciar sesión',
        })
      }
    })
  }

  return (
    <form className={cn(className)} onSubmit={handleSubmit(onSubmit)} noValidate>
      <section className="flex flex-col gap-5">
        <Input
          {...register('email')}
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          error={errors.email?.message}
          autoComplete={rememberMe ? 'username' : undefined}
        />
        <Input
          {...register('password')}
          id="password"
          type="password"
          name="password"
          placeholder="Ingresar contraseña"
          error={errors.password?.message}
          autoComplete={rememberMe ? 'current-password' : undefined}
        />
      </section>
      <section className="flex flex-row justify-between mt-5">
        <div className="flex items-center space-x-2">
          <Switch id="remember-me" onClick={() => setRememberMe(!rememberMe)} />
          <Label htmlFor="remember-me">Recordarme</Label>
        </div>
        <Link href="/" className="text-primary text-sm self-center">
          ¿Olvidaste tu contraseña?
        </Link>
      </section>

      <Button type="submit" className="w-full mt-12" disabled={isPending}>
        {isPending ? <Loader2 className="animate-spin" /> : 'Iniciar sesión'}
      </Button>

      <footer className="w-full flex justify-center gap-2 mt-12">
        <label className="text-sm">¿No tienes cuenta?</label>
        <Link href="/register" className="text-primary text-sm">
          Registrarse
        </Link>
      </footer>
    </form>
  )
}
