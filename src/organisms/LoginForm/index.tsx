'use client'

import { useTransition } from 'react'
import { loginUserAction } from '@/app/actions/auth'
import { Input } from '@/molecules'
import { Props } from './types'
import { Button } from '../../components/ui/button'
import { cn } from '@/lib/utils'
import { Switch } from '../../components/ui/switch'
import { Label } from '../../components/ui/label'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { LoginSchemaType, loginSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

const LoginForm = ({ className }: Props) => {
  const [isPending, startTransition] = useTransition()

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

  const onSubmit = (data: LoginSchemaType) => {
    startTransition(async () => {
      const { success, message } = await loginUserAction(data)

      console.log({ success, message })
    })
  }

  return (
    <form className={cn(className)} onSubmit={handleSubmit(onSubmit)}>
      <section className='flex flex-col gap-5'>
        <Input
          {...register('email')}
          id='email'
          type='email'
          name='email'
          placeholder='Email'
          error={errors.email?.message}
        />
        <Input
          {...register('password')}
          id='password'
          type='password'
          name='password'
          placeholder='Ingresar contraseña'
          error={errors.password?.message}
        />
      </section>
      <section className='flex flex-row justify-between mt-5'>
        <div className='flex items-center space-x-2'>
          <Switch id='remember-me' />
          <Label htmlFor='remember-me'>Recordarme</Label>
        </div>
        <Link href='/' className='text-[#176474] text-sm self-center'>
          ¿Olvidaste tu contraseña?
        </Link>
      </section>

      <Button type='submit' className='w-full mt-12' disabled={isPending}>
        {isPending ? <Loader2 className='animate-spin' /> : 'Iniciar sesión'}
      </Button>

      <footer className='w-full flex justify-center gap-2 mt-12'>
        <label className='text-sm'>¿No tienes cuenta?</label>
        <Link href='/register' className='text-[#176474] text-sm'>
          Registrarse
        </Link>
      </footer>
    </form>
  )
}

export default LoginForm
