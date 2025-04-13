import React from 'react'
import ExpenseSplitter from '@/components/ExpenseSplitter'
import { getInitialData } from '@/lib/auth'
import HeaderHome from '@/organisms/HeaderHome'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const initialData = await getInitialData()

  return (
    <main className='page-container container mx-auto'>
      <HeaderHome {...initialData} />
      <ExpenseSplitter group={initialData!.groups![0]} expenses={initialData.expenses!} />
    </main>
  )
}
