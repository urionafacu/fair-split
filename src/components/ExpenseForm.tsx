'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Expense as SupabaseExpense } from '@/types/supabase'
import { Loader2 } from 'lucide-react'
import { saveExpense } from '@/lib/services/expenseService'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { expenseSchema, ExpenseSchemaType } from '@/validations/expenseSchema'

interface ExpenseFormProps {
  addExpense: (expense: SupabaseExpense) => void
}

export default function ExpenseForm({ addExpense }: ExpenseFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<ExpenseSchemaType> = async ({ name, amount }) => {
    setIsLoading(true)
    try {
      const data = await saveExpense(name, amount)
      addExpense(data)
      reset()
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseSchemaType>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: '',
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Gasto</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor='name'>Nombre del gasto</Label>
            <Input
              id='name'
              type='text'
              placeholder='Ingresa el nombre del gasto'
              {...register('name')}
            />
            {errors.name && <p className='text-sm text-red-600 p-1'>{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor='amount'>Monto</Label>
            <Input
              id='amount'
              type='text'
              placeholder='Ingresa el monto del gasto'
              {...register('amount')}
            />
            {errors.amount && <p className='text-sm text-red-600 p-1'>{errors.amount.message}</p>}
          </div>
          <Button disabled={isLoading} type='submit'>
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Agregar Gasto
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
