import { ID } from './common'

export interface Expense {
  id: ID
  created_at: string
  updated_at: string
  name: string
  amount: string
  date: string
  group: ID
}
