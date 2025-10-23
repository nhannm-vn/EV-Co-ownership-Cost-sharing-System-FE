export interface CreateGroupMember {
  groupId: number
  groupName?: string
  status?: 'PENDING' | 'ACTIVE' | 'REJECTED'
  description?: string
}
export interface GroupItem {
  groupId?: number //
  groupName?: string
  description?: string
  status?: string
}

export interface InvitationResponse {
  groupId?: string // id nhóm
}

// định nghĩa cho hiển thị member trong group

export interface Member {
  userEmail?: string
  userName?: string
  userId?: number
}

export interface groupSummary {
  groupSummary?: {
    members?: Member[]
  }
}
