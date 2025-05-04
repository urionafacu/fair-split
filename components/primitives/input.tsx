'use client'

import { Label } from '@/components/primitives/label'
import { cn } from '@/utils/cn.utils'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  error?: string
}

export const Input = ({ className, label, id, error, ...props }: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = props.type === 'password'

  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : props.type

  return (
    <div className="flex flex-col gap-1">
      {Boolean(label) && (
        <Label htmlFor={id} className="font-semibold text-dark text-sm">
          {label}
        </Label>
      )}
      <div className="relative">
        <input
          {...props}
          id={id}
          type={effectiveType}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:ring-offset-0 focus-visible:ring-primary',
            className,
            {
              'border-red-500 focus:ring-red-500 focus-visible:ring-red-500': error,
              'pr-10': isPassword,
            },
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        )}
      </div>
      {Boolean(error) && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
