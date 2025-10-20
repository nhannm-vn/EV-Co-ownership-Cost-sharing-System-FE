export interface CreateGroupMember {
  groupId: number
  groupName: string
  status: 'PENDING' | 'ACTIVE' | 'REJECTED'
  description: string
}
export interface GroupItem {
  groupId: number //
  groupName: string
  description: string
  status: string
}
