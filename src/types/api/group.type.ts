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
  groupRole?: 'ADMIN' | 'MEMBER' | string
}

export interface groupSummary {
  groupSummary?: {
    members?: Member[]
    memberCapacity?: number
    currentUserRole: 'ADMIN' | 'MEMBER' | string
  }
  userOwnership?: {
    userId: number
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

// Tổng quan group
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

// Thông tin xe
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

// Kiểu dữ liệu tổng cho API response
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
    phone?: string
    name?: string
    share?: number
    userRole?: string
    userId?: string
  }>
  userId?: string
  terms: string // Nội dung hợp đồng dạng text

  vehicle: {
    model: string // "Unknown Unknown"
    plate: string // "66B-123.99"
    vin: string // "SALWR2VF7FA123456"
  }
}

export interface DepositForUser {
  contractSigned: boolean // Hợp đồng đã ký hay chưa
  canPay: boolean // Có thể thanh toán hay không
  contractStatus: 'SIGNED' | 'PENDING' | 'REJECTED' // Trạng thái hợp đồng
  requiredAmount: number // Số tiền yêu cầu nộp
  groupId: number // ID nhóm đồng sở hữu
  depositStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' // Trạng thái tiền ký quỹ
  userId: number // ID người dùng
  ownershipPercentage: number // Tỷ lệ sở hữu (%)
}

export interface DepositForGroup {
  joinDate: string
  contractStatus: 'SIGNED' | 'PENDING' | 'REJECTED'
  requiredDepositAmount: number
  depositStatus: 'PENDING' | 'PAID' | 'REFUNDED'
  userEmail: string
  userName: string
  userId: number
  ownershipPercentage: number
}

export interface CreateDepositSuccess {
  txnRef: string
  paymentId: number
  userId: number
  groupId: number
  amount: number
  requiredAmount: number
  paymentMethod: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' // tùy hệ thống bạn có thể thêm các trạng thái khác
  transactionCode: string
  createdAt: string
  paidAt: string
  vnpayUrl: string
  message: string
}
// kiểm tra trạng thái hợp đồng
export interface ContractStatus {
  approvalStatus: 'PENDING' | 'APPROVED' | 'SIGNED'
}

// response danh sách  lịch booking của group
export interface BookingResponse {
  weekStart?: string
  weekEnd?: string
  userQuota?: {
    totalSlots?: number
    usedSlots?: number
    remainingSlots?: number
  }
  dailySlots: {
    date?: string // "2025-10-27"
    dayOfWeek?: string // "MONDAY", "TUESDAY", ...
    slots?: {
      time?: string // "00:00-03:00"
      status?: 'AVAILABLE' | 'LOCKED' | 'CONFIRMED' | 'CANCELLED'
      bookedBy?: string | null
      bookable?: boolean
      type?: 'AVAILABLE' | 'MAINTENANCE' | 'BOOKED_SELF' | 'BOOKED_OTHER'
      bookingId?: number | null
    }[]
  }[]
  dashboardSummary: {
    groupId?: number
    vehicleId?: number
    brand?: string
    model?: string
    licensePlate?: string
    vehicleValue?: number
    vehicleStatus?: 'Good' | 'Under Maintenance' | 'Has Issues' | ''
    batteryPercent?: number | null
    odometer?: number | null
    lastMaintenanceDate?: string | null
    nextMaintenanceDate?: string | null
    maintenanceStatus?: 'NO_ISSUE' | 'NEEDS_MAINTENANCE' | ''
    totalBookings?: number
    userBookings?: number
    bookingRatio?: number
  }
}

// booking slot

export interface BookingSlotResponse {
  bookingId: number
  status: 'CONFIRMED'
  message: string
  totalHours: number
}
