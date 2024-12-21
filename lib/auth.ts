import { getUserAction } from '@/app/actions/user'
import { getGroupsAction } from '@/app/actions/group'
import { getExpensesAction } from '@/app/actions/expenses'
import resolvePromiseSettled from '@/utils/resolvePromiseSettled'

export const getInitialData = async () => {
  const [userPromiseSettled, groupsPromiseSettled, expensesPromiseSettled] =
    await Promise.allSettled([getUserAction(), getGroupsAction(), getExpensesAction()])

  const user = resolvePromiseSettled(userPromiseSettled)
  const groups = resolvePromiseSettled(groupsPromiseSettled)
  const expenses = resolvePromiseSettled(expensesPromiseSettled)
  return { user, groups, expenses }
}
