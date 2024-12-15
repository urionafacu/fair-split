import React from 'react'
import ExpenseSplitter from '@/components/ExpenseSplitter'
import { getExpenses } from '../actions/expenses'

export const revalidate = 0

export default async function Home() {
  const expenses = await getExpenses()

  return (
    <ExpenseSplitter
      incomes={[
        {
          id: 1,
          name: 'Facu',
          amount: 2000000,
        },
        {
          id: 2,
          name: 'Mica',
          amount: 1000000,
        },
      ]}
      expenses={expenses}
    />
  )
}
