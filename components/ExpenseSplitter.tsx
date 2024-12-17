'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import IncomeForm from './IncomeForm'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import ExpenseSummary from './ExpenseSummary'
import ExpenseChart from './ExpenseChart'
import { Income } from '@/types/supabase'
import { deleteExpense as supabaseDeleteExpense } from '@/lib/services/expenseService'
import { Expense } from '@/types/expenses'
import HeaderHome from '@/organisms/HeaderHome'

type Props = {
  incomes: Income[]
  expenses: Expense[]
}

export default function ExpenseSplitter({ incomes, expenses }: Props) {
  const [localIncomes, setLocalIncomes] = useState(incomes)
  const [localExpenses, setLocalExpenses] = useState(expenses)

  const deleteExpense = (id: Expense['id']) => {
    setLocalExpenses(expenses.filter((e) => e.id !== id))
    supabaseDeleteExpense(id!)
  }

  const totalExpenses = localExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  const totalIncome = localIncomes.reduce((prev, current) => prev + current.amount, 0)
  const percentageFacu = localIncomes[0] ? localIncomes[0].amount / totalIncome : 0
  const percentageMica = localIncomes[1] ? localIncomes[1].amount / totalIncome : 0
  const partFacu = percentageFacu * totalExpenses
  const partMica = percentageMica * totalExpenses

  return (
    <div className='page-container'>
      <HeaderHome />

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
