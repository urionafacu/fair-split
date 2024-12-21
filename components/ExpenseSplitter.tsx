'use client'

import React, { useEffect, useState } from 'react'
import IncomeForm from './IncomeForm'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import ExpenseSummary from './ExpenseSummary'
import ExpenseChart from './ExpenseChart'
import { Income } from '@/types/supabase'
import { deleteExpense as supabaseDeleteExpense } from '@/lib/services/expenseService'
import { Expense } from '@/types/expenses.types'
import useAuthStore from '@/store'
import { selectUser } from '@/store/slices/auth.slice'
import { deleteExpenseAction } from '@/app/actions/expenses'
import { useToast } from '@/hooks/use-toast'

type Props = {
  incomes: Income[]
  expenses: Expense[]
}

export default function ExpenseSplitter({ incomes, expenses }: Props) {
  const [localIncomes, setLocalIncomes] = useState(incomes)
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
  const totalIncome = localIncomes.reduce((prev, current) => prev + current.amount, 0)
  const percentageFacu = localIncomes[0] ? localIncomes[0].amount / totalIncome : 0
  const percentageMica = localIncomes[1] ? localIncomes[1].amount / totalIncome : 0
  const partFacu = percentageFacu * totalExpenses
  const partMica = percentageMica * totalExpenses

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <IncomeForm incomes={localIncomes} setIncomes={setLocalIncomes} />
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
