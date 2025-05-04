import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { User } from '@/types/user.types'
import { Group } from '@/types/group.types'

interface AuthState {
  user: User | null
  groups: Group[]
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  // Actions for user management
  setUser: (user: User | null) => void
  updateUser: (userData: Partial<User>) => void
  clearUser: () => void

  // Actions for group management
  setGroups: (groups: Group[]) => void
  addGroup: (group: Group) => void
  removeGroup: (groupId: number) => void
  updateGroup: (groupId: number, groupData: Partial<Group>) => void

  // Actions for loading and error state management
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void

  // Action to initialize the store
  initialize: (user: User | null, groups: Group[]) => void
}

type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  user: null,
  groups: [],
  isLoading: true,
  error: null,
}

const createActions = (set: (fn: (state: AuthState) => void) => void): AuthActions => ({
  setUser: (user) =>
    set((state) => {
      state.user = user
    }),

  updateUser: (userData) =>
    set((state) => {
      if (state.user) {
        Object.assign(state.user, userData)
      }
    }),

  clearUser: () =>
    set((state) => {
      state.user = null
      state.groups = []
    }),

  setGroups: (groups) =>
    set((state) => {
      state.groups = groups
    }),

  addGroup: (group) =>
    set((state) => {
      state.groups.push(group)
    }),

  removeGroup: (groupId) =>
    set((state) => {
      state.groups = state.groups.filter((g) => g.id !== groupId)
    }),

  updateGroup: (groupId, groupData) =>
    set((state) => {
      const group = state.groups.find((g) => g.id === groupId)
      if (group) {
        Object.assign(group, groupData)
      }
    }),

  setLoading: (isLoading) =>
    set((state) => {
      state.isLoading = isLoading
    }),

  setError: (error) =>
    set((state) => {
      state.error = error
    }),

  initialize: (user, groups) =>
    set((state) => {
      state.user = user
      state.groups = groups
      state.isLoading = false
      state.error = null
    }),
})

export const useAuthStore = create<AuthStore>()(immer(combine(initialState, createActions)))

export const selectUser = (state: AuthStore) => state.user
export const selectGroups = (state: AuthStore) => state.groups
export const selectIsLoading = (state: AuthStore) => state.isLoading
export const selectError = (state: AuthStore) => state.error
export const selectInitialize = (state: AuthStore) => state.initialize
