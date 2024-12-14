'use client'

import { type Props } from './types'
import { Input as InputComponent } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const Input = ({ className, label, id, error, ...props }: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = props.type === 'password'

  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : props.type

  return (
    <div className='flex flex-col gap-1'>
      {Boolean(label) && (
        <Label htmlFor={id} className='font-semibold text-dark text-sm'>
          {label}
        </Label>
      )}
      <div className='relative'>
        <InputComponent
          {...props}
          id={id}
          type={effectiveType}
          className={cn(className, {
            'border-red-500 focus:ring-red-500': error,
            'pr-10': isPassword,
          })}
        />
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
          >
            {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
          </button>
        )}
      </div>
      {Boolean(error) && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  )
}

export default Input
