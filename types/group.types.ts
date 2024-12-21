import { ID } from './common.types'
import { User } from './user.types'

export enum GroupType {
  COUPLE = 'Couple',
  FAMILY = 'Family',
  FRIENDS = 'Friends',
}

export enum MemberType {
  ADMIN = 'Admin',
  MEMBER = 'Member',
}

export interface Group {
  id: number
  type: GroupType
  createdAt: string
  members: GroupMember[]
}

interface GroupMember {
  id: ID
  user: Omit<User, 'dateJoined'>
  role: MemberType
  joinedAt: string
}
