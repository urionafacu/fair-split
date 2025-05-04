'use client'

import React, { useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/primitives/card'
import { Button } from '@/components/primitives/button'
import { Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { expenseSchema, ExpenseSchemaType } from '@/components/expense-form/expense-form.schema'
import { addExpenseAction } from '@/app/actions/expenses'
import { Input } from '@/components/primitives/input'
import { toast } from 'sonner'
import { toISODateString } from '@/utils/date.utils'
import { selectGroups, useAuthStore } from '@/stores/auth.store'

export const ExpenseForm = () => {
  const [isPending, startTransition] = useTransition()
  const groups = useAuthStore(selectGroups)

  const onSubmit: SubmitHandler<ExpenseSchemaType> = async ({ name, amount }) => {
    startTransition(async () => {
      try {
        await addExpenseAction({
          name,
          amount: amount.toString(),
          group: groups[0].id,
          date: toISODateString(new Date()),
        })
        toast.success('Gasto agregado', {
          description: 'El gasto fue agregado correctamente',
        })
        reset()
      } catch {
        toast.error('Intentalo nuevamente', {
          description: 'No pudimos agregar tu gasto',
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
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            placeholder="Ingresa el nombre del gasto"
            label="Nombre del gasto"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            id="amount"
            placeholder="Ingresar el monto del gasto"
            label="Monto"
            error={errors.amount?.message}
            {...register('amount')}
          />
          <Button disabled={isPending} type="submit">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Agregar Gasto
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
