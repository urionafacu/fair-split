'use client'

import { FormEvent, useTransition } from 'react'
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
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const LoginForm = ({ className }: Props) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleFormSubmit = async (data: LoginSchemaType) => {
    const { success } = await loginUserAction(data)

    if (!success) {
      toast({
        title: 'Ups!',
        description: 'Las credenciales no son las correctas',
        variant: 'destructive',
      })
      return
    }

    router.push('/')
  }

  const onSubmit = (data: LoginSchemaType) => {
    startTransition(() => handleFormSubmit(data))
  }

  const handleNativeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = getValues()

    if (!formData.email || !formData.password) {
      return
    }

    const validationResult = loginSchema.safeParse(formData)
    if (!validationResult.success) {
      return
    }

    startTransition(() => handleFormSubmit(formData))
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      onSubmitCapture={handleNativeSubmit}
    >
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
        <Link href='/' className='text-primary text-sm self-center'>
          ¿Olvidaste tu contraseña?
        </Link>
      </section>

      <Button type='submit' className='w-full mt-12' disabled={isPending}>
        {isPending ? <Loader2 className='animate-spin' /> : 'Iniciar sesión'}
      </Button>

      <footer className='w-full flex justify-center gap-2 mt-12'>
        <label className='text-sm'>¿No tienes cuenta?</label>
        <Link href='/register' className='text-primary text-sm'>
          Registrarse
        </Link>
      </footer>
    </form>
  )
}

export default LoginForm
