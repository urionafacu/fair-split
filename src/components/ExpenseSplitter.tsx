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
import Image from 'next/image'
import Logo from '@/app/images/FairSplitLogo.png'
import { Button } from './ui/button'
import { Expense } from '@/types/expenses'

type Props = {
  incomes: Income[]
  expenses: Expense[]
}

export default function ExpenseSplitter({ incomes, expenses }: Props) {
  const router = useRouter()
  const [localIncomes, setLocalIncomes] = useState(incomes)
  const [localExpenses, setLocalExpenses] = useState(expenses)

  const addExpense = (newExpense: Expense) => {
    setLocalExpenses([...expenses, newExpense])
  }

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
    <div className='container mx-auto p-4'>
      <header className='flex w-full mb-12 mt-12'>
        <div className='flex flex-row items-center justify-between w-full gap-12 px-12 lg:px-20'>
          <div className='flex flex-row gap-12'>
            <Image src={Logo} alt='logo' className='w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40' />
            <div className='flex flex-col justify-evenly gap-2'>
              <h1 className='text-4xl font-bold text-dark-green'>Fair Split</h1>
              <h4 className='text-lg font-normal text-primary'>
                Ingresa tus gastos mensuales y divídelos proporcionalmente con tu acompañante.
              </h4>
            </div>
          </div>
          <Button onClick={() => router.push('/login')}>Ingresar</Button>
        </div>
      </header>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <IncomeForm incomes={localIncomes} setIncomes={setLocalIncomes} />
        <ExpenseForm addExpense={addExpense} />
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
