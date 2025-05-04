import React from 'react'
import ExpenseSplitter from '@/components/expense-splitter'
import { getInitialData } from '@/utils/auth'
import { Header } from '@/components/header'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const initialData = await getInitialData()

  return (
    <main className="page-container container mx-auto">
      <Header {...initialData} />
      <ExpenseSplitter group={initialData!.groups![0]} expenses={initialData.expenses!} />
    </main>
  )
}
