import { Expense } from '@/types/expenses.types'
import { Group } from '@/types/group.types'
import { User } from '@/types/user.types'

export interface Props {
  user: User | null
  groups: Group[] | null
  expenses: Expense[] | null
}
