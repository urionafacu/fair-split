import { Input } from '@/molecules'
import { Props } from './types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const RegisterForm = ({ className }: Props) => {
  return (
    <form className={`${cn(className)} flex flex-col gap-4`}>
      <Input id='name' name='name' type='text' placeholder='Juan' label='Nombre completo' />
      <Input id='lastName' name='lastName' type='text' placeholder='Pérez' label='Apellido' />
      <Input
        id='email'
        name='email'
        type='email'
        placeholder='Ingresar contraseña'
        label='E-mail'
      />
      <Input
        id='password'
        name='password'
        type='password'
        placeholder='Ingresar contraseña'
        label='Contraseña'
      />
      <Input
        id='passwordConfirm'
        name='passwordConfirm'
        type='password'
        placeholder='Ingresar contraseña'
        label='Contraseña'
      />

      <Button type='submit' className='w-full mt-4' disabled={false}>
        {false ? <Loader2 className='animate-spin' /> : 'Iniciar sesión'}
      </Button>
    </form>
  )
}

export default RegisterForm
