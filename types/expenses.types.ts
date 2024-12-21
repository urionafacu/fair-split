import { ID } from './common.types'

export interface Expense {
  id: ID
  createdAt: string
  updatedAt: string
  name: string
  amount: string
  date: string
  group: ID
}
