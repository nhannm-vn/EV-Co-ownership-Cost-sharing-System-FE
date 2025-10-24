export interface ContractResponse {
  id: number
  groupId: number
  startDate: string // ISO format: "YYYY-MM-DD"
  endDate: string // ISO format: "YYYY-MM-DD"
  requiredDepositAmount: number
  isActive: boolean
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
  approvedById: number | null
  approvedAt: string | null // ISO datetime string
  rejectionReason: string | null
  createdAt: string // ISO datetime string
  updatedAt: string // ISO datetime string
}
