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

//Đ/n kiểu contract detail

export interface Contract {
  contractId: number
  startDate: string // ISO date, e.g. "2025-11-04"
  endDate: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  terms: string
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
  depositDeadline: string
  requiredDepositAmount: number
}

export interface Group {
  groupId: number
  groupName: string
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  updatedAt: string
}

export interface Member {
  userId: number
  fullName: string
  email: string
  userRole: 'ADMIN' | 'MEMBER' | 'CO_OWNER'
  ownershipPercentage: number
  depositStatus: 'PAID' | 'UNPAID' | 'PENDING'
  joinDate: string
}

export interface ContractDetail {
  contract: Contract
  group: Group
  members: Member[]
}
// định nghĩa các kiểu cho feedback của co-owner

export interface FeedbackItem {
  adminNote: string
  email: string
  feedbackId: number
  fullName: string
  isProcessed: boolean
  lastAdminAction: string | null
  lastAdminActionAt: string | null
  reactionType: string
  reason: string
  status: string
  submittedAt: string
  userId: number
}
export interface FeedbackCoOwnerResponse {
  acceptedCount: number
  approvedFeedbacksCount: number

  contractStatus: string
  contractId: number
  feedbacks: FeedbackItem[]
  pendingDisagreeCount: number
  rejectedFeedbacksCount: number
  totalEntries: number
  totalFeedbacks: number
}
