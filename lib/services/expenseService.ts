import { Expense } from '@/types/expenses.types'

export async function fetchExpenses(): Promise<Expense[]> {
  return []
}

export async function saveExpense(_: string, _1: number): Promise<Expense> {
  return {
    amount: '',
    createdAt: '',
    id: 1,
    name: '',
    date: '',
    group: 1,
    updatedAt: '',
  }
}

export async function deleteExpense(_: number): Promise<void> {}
