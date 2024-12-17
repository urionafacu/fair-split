'use client'

import React, { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { expenseSchema, ExpenseSchemaType } from '@/validations/expenseSchema'
import { addExpense } from '@/app/actions/expenses'
import { Input } from '@/molecules'
import { useToast } from '@/hooks/use-toast'

export default function ExpenseForm() {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<ExpenseSchemaType> = async ({ name, amount }) => {
    startTransition(async () => {
      try {
        // addExpense({ name, amount: amount.toString(), group:  })
        reset()
      } catch {
        toast({
          title: 'Ups!',
          description: 'Lo sentimos, algo ocurrió mal',
          variant: 'destructive',
        })
      }
    })
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
          <Input
            id='name'
            placeholder='Ingresa el nombre del gasto'
            label='Nombre del gasto'
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            id='amount'
            placeholder='Ingresar el monto del gasto'
            label='Monto'
            error={errors.amount?.message}
            {...register('amount')}
          />
          <Button disabled={isPending} type='submit'>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Agregar Gasto
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
