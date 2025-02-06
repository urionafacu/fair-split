import React from 'react'
import ExpenseSplitter from '@/components/ExpenseSplitter'
import { getInitialData } from '@/lib/auth'
import HeaderHome from '@/organisms/HeaderHome'

export const revalidate = 0

export default async function Home() {
  const initialData = await getInitialData()

  return (
    <main className='page-container'>
      <HeaderHome {...initialData} />
      <ExpenseSplitter
        incomes={[
          {
            id: 1,
            name: 'Facu',
            amount: 2_450_000,
          },
          {
            id: 2,
            name: 'Mica',
            amount: 650_000,
          },
        ]}
        expenses={initialData.expenses!}
      />
    </main>
  )
}
