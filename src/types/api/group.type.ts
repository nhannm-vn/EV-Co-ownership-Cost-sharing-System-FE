/* eslint-disable @typescript-eslint/no-explicit-any */
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
  userRole?: 'ADMIN' | 'MEMBER'
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
    memberCapacity?: number
  }
}

// 🧩 Thông tin quyền sở hữu của user trong group
export interface UserOwnership {
  userId: number
  groupId: number
  userName: string
  ownershipPercentage: number
  investmentAmount: number
  vehicleValue: number
  totalAllocatedPercentage: number
  canEdit: boolean
  status: 'LOCKED' | 'UNLOCKED' | string
  updatedAt: string
  message: string
}

// 👥 Thông tin từng thành viên trong group
export interface GroupMember {
  userId: number
  userName: string
  userEmail: string
  ownershipPercentage: number
  investmentAmount: number
  status: 'LOCKED' | 'UNLOCKED' | string
  currentUser: boolean
}

// 🧮 Tổng quan group
export interface GroupSummary {
  groupId: number
  groupName: string
  vehicleValue: number
  totalMembers: number
  memberCapacity: number | null
  totalAllocatedPercentage: number
  remainingPercentage: number
  members: GroupMember[]
  fullyAllocated: boolean
}

// 🚗 Thông tin xe
export interface VehicleInfo {
  vehicleId: number
  brand: string
  model: string
  licensePlate: string
  chassisNumber: string
  qrCode: string | null
  groupId: number
  vehicleValue: number
  createdAt: string
  updatedAt: string
}

// 📦 Kiểu dữ liệu tổng cho API response
export interface OwnershipResponse {
  userOwnership: UserOwnership
  groupSummary: GroupSummary
  suggestions: any[] // nếu backend có gợi ý cụ thể, có thể tạo type riêng sau
  vehicleInfo: VehicleInfo
}

// contract
export interface ContractResponse {
  contract?: {
    effectiveDate?: string
    endDate?: string
    location?: string
    signDate?: string // "24/10/2025"
    status?: string
    termLabel?: string // "1 năm"
  }
  contractNumber?: string // "EVS-16-1761307580054"

  finance: {
    depositAmount?: number
    targetAmount?: number
    vehiclePrice?: number
  }
  generatedAt?: string
  group: {
    name: string // "nhóm xe rồng"
  }

  owners?: Array<{
    idType?: string
    phone?: string
    name?: string
    share?: number
    idNo?: string
  }>
  savedToDatabase: boolean // false
  status: string // "GENERATED"
  terms: string // Nội dung hợp đồng dạng text

  vehicle: {
    model: string // "Unknown Unknown"
    plate: string // "66B-123.99"
    vin: string // "SALWR2VF7FA123456"
  }
}
