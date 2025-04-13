'use client'

import React, { useEffect, useState } from 'react'
import IncomeForm from './IncomeForm'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import ExpenseSummary from './ExpenseSummary'
import ExpenseChart from './ExpenseChart'
import { Expense } from '@/types/expenses.types'
import { deleteExpenseAction } from '@/app/actions/expenses'
import { useToast } from '@/hooks/use-toast'
import { Group } from '@/types/group.types'

type Props = {
  group: Group
  expenses: Expense[]
}

export default function ExpenseSplitter({ group, expenses }: Props) {
  const [localIncomes, setLocalIncomes] = useState(group)
  const [localExpenses, setLocalExpenses] = useState(expenses)
  const { toast } = useToast()

  useEffect(() => {
    setLocalExpenses(expenses)
  }, [expenses])

  const deleteExpense = async (id: Expense['id']) => {
    try {
      setLocalExpenses(expenses.filter((e) => e.id !== id))
      await deleteExpenseAction(id!)
      toast({
        title: 'Gasto eliminado',
        description: 'El gasto fue eliminado correctamente',
      })
    } catch {
      toast({
        title: 'Ups!',
        description: 'Lo sentimos, algo ocurrió mal',
        variant: 'destructive',
      })
      setLocalExpenses(expenses)
    }
  }

  const totalExpenses = localExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  const totalIncome = localIncomes.members.reduce(
    (prev, current) => prev + Number(current.income),
    0,
  )
  const percentageFacu = localIncomes.members[0]
    ? Number(localIncomes.members![0].income) / totalIncome
    : 0
  const percentageMica = localIncomes.members[1]
    ? Number(localIncomes.members![1].income) / totalIncome
    : 0
  const partFacu = percentageFacu * totalExpenses
  const partMica = percentageMica * totalExpenses

  return (
    <div className=''>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <IncomeForm group={localIncomes} />
        <ExpenseForm />
      </div>
      <div className='mt-6'>
        <ExpenseList expenses={localExpenses} onDeleteExpense={deleteExpense} />
      </div>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ExpenseSummary totalExpenses={totalExpenses} partFacu={partFacu} partMica={partMica} />
        <ExpenseChart partFacu={partFacu} partMica={partMica} />
      </div>
    </div>
  )
}
