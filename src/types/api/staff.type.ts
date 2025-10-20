export interface groupStaffItem {
  groupId: number
  groupName: string
  status: 'PENDING' | 'ACTIVE' | 'UNACTIVE'
}

export interface GroupStaffList {
  content: groupStaffItem[]
}
