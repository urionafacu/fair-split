import { Expense } from '@/types/supabase'

export async function fetchExpenses(): Promise<Expense[]> {
  return []
}

export async function saveExpense(_: string, _1: number): Promise<Expense> {
  return {
    amount: 1,
    created_at: '',
    id: 1,
    name: '',
  }
}

export async function deleteExpense(_: number): Promise<void> {}
