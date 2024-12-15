import { Expense } from '@/types/expenses'

export async function fetchExpenses(): Promise<Expense[]> {
  return []
}

export async function saveExpense(_: string, _1: number): Promise<Expense> {
  return {
    amount: '',
    created_at: '',
    id: 1,
    name: '',
    date: '',
    group: 1,
    updated_at: '',
  }
}

export async function deleteExpense(_: number): Promise<void> {}
