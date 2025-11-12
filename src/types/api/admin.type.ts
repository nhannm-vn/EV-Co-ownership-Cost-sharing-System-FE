export interface ContractResponse {
  id: number
  groupId: number
  startDate: string // ISO format: "YYYY-MM-DD"
  endDate: string // ISO format: "YYYY-MM-DD"
  requiredDepositAmount: number
  isActive: boolean
  approvalStatus: 'SIGNED' | 'APPROVED' | 'REJECTED'
  approvedById: number | null
  approvedAt: string | null // ISO datetime string
  rejectionReason: string | null
  createdAt: string // ISO datetime string
  updatedAt: string // ISO datetime string
}

// định nghĩa kiểu dữ cho các hợp đồng
export interface ContractsForEditResponse {
  approvalStatus: string
  endDate: string
  groupId: number
  groupName: string
  id: number
  startDate: string
}

// định nghĩa các kiểu cho feedback của co-owner

export interface FeedbackItem {
  email: string
  fullName: string
  reason: string
  status: 'REJECTED' | 'APPROVED' | 'PENDING'
  submittedAt: string
  userId: number
}
// export interface FeedbackCoOwnerResponse {
//   contraccontractIdtId: string
//   contractStatus: string
//   feedbacks: FeedbackItem[]
//   totalFeedbacks: number
//   totalMembers: number
//   pendingAgreeCount: 0
//   pendingDisagreeCount: 1

//   rejectedCount: 0
//   totalFeedbacks: 1
//   totalMembers: 1
// }
