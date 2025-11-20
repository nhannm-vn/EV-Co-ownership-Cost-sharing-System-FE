export interface User {
  userId: number
  fullName: string
  email: string
  password: string
  phoneNumber: string
  avatarUrl: string | null
  roleId: number
  status: string
  createdAt: string
  updatedAt: string
}

interface Documents {
  citizenIdImages: {
    front: {
      documentId: number
      imageUrl: string
      reviewNote: string
      status: string
      uploadedAt: string
    }
    back: {
      documentId: number
      imageUrl: string
      reviewNote: string
      status: string
      uploadedAt: string
    }
  }
  driverLicenseImages: {
    front: {
      documentId: number
      imageUrl: string
      reviewNote: string
      status: string
      uploadedAt: string
    }
    back: {
      documentId: number
      imageUrl: string
      reviewNote: string
      status: string
      uploadedAt: string
    }
  }
}

export interface UserGetProfile {
  userId: number
  fullName: string
  email: string
  phoneNumber: string
  avatarUrl?: string | null
  roleName: string
  status: string
  createdAt: string
  documents: Documents
  statistics: {
    groupsJoined: number
    accountStatus: string
    memberSince: string
  }
}

export interface UploadImage {
  message: string
  front: {
    imageUrl: string
    status: string
    documentId: number
  }
  back: {
    imageUrl: string
    status: string
    documentId: number
  }
}

export enum NotificationType {
  // ==============================
  //  Booking related
  // ==============================
  BOOKING_CREATED = 'BOOKING_CREATED',
  BOOKING_CONFLICT = 'BOOKING_CONFLICT',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  BOOKING_REMINDER = 'BOOKING_REMINDER',

  // ==============================
  //  Payment related
  // ==============================
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_REMINDER = 'PAYMENT_REMINDER',
  DEPOSIT_REQUIRED = 'DEPOSIT_REQUIRED',
  DEPOSIT_OVERDUE = 'DEPOSIT_OVERDUE',

  // ==============================
  //  Contract related
  // ==============================
  CONTRACT_CREATED = 'CONTRACT_CREATED',
  CONTRACT_APPROVAL_PENDING = 'CONTRACT_APPROVAL_PENDING',
  CONTRACT_APPROVED = 'CONTRACT_APPROVED',
  CONTRACT_REJECTED = 'CONTRACT_REJECTED',
  CONTRACT_EXPIRING = 'CONTRACT_EXPIRING',

  // ==============================
  // Group related
  // ==============================
  GROUP_CREATED = 'GROUP_CREATED',
  GROUP_INVITATION = 'GROUP_INVITATION',
  GROUP_MEMBER_JOINED = 'GROUP_MEMBER_JOINED',
  GROUP_MEMBER_LEFT = 'GROUP_MEMBER_LEFT',
  GROUP_STATUS_CHANGED = 'GROUP_STATUS_CHANGED',

  // ==============================
  // Maintenance related
  // ==============================
  MAINTENANCE_REQUESTED = 'MAINTENANCE_REQUESTED',
  MAINTENANCE_APPROVED = 'MAINTENANCE_APPROVED',
  MAINTENANCE_COMPLETED = 'MAINTENANCE_COMPLETED',
  MAINTENANCE_OVERDUE = 'MAINTENANCE_OVERDUE',

  // ==============================
  //  Vehicle related
  // ==============================
  VEHICLE_AVAILABLE = 'VEHICLE_AVAILABLE',
  VEHICLE_UNAVAILABLE = 'VEHICLE_UNAVAILABLE',
  VEHICLE_EMERGENCY = 'VEHICLE_EMERGENCY',

  // ==============================
  // Fund related
  // ==============================
  FUND_LOW_BALANCE = 'FUND_LOW_BALANCE',
  FUND_CONTRIBUTION_REQUIRED = 'FUND_CONTRIBUTION_REQUIRED',
  FUND_EXPENSE_APPROVED = 'FUND_EXPENSE_APPROVED',
  QUOTA_WARNING = 'QUOTA_WARNING',

  // ==============================
  //  System related
  // ==============================
  SYSTEM_MAINTENANCE = 'SYSTEM_MAINTENANCE',
  SECURITY_ALERT = 'SECURITY_ALERT',
  POLICY_UPDATE = 'POLICY_UPDATE'
}

export interface GetAllNotifications {
  id: number
  userId: number
  title: string
  message: string
  notificationType: NotificationType // Loại thông báo
  isRead: boolean
  isDelivered: boolean
  createdAt: string
  relatedEntityId: number
  relatedEntityType: string
  actionUrl: string
  priority: null
}

export interface PaymentHistory {
  amount?: number
  groupId?: number
  paidAt?: string
  paymentId?: number
  paymentMethod?: 'VNPAY'
  status: 'COMPLETED'
  transactionCode: '67941305'
}
export interface CheckoutFormResponse {
  status: string
}

export interface Voting {
  votingId: number
  groupId: number
  title: string
  description: string
  votingType: string
  status: string
  deadline: string // ISO datetime string
  estimatedAmount: number
  relatedExpenseId: number
  options: Record<string, string> // hoặc { [key: string]: string }
  results: Record<string, string> // tương tự options
  createdBy: number
  createdByName: string
  createdAt: string // ISO datetime string
  hasVoted: boolean
  userVote: string
  totalVotes: number
  totalMembers: number
  votingProgress: string
  timeRemaining: string
}

export interface VotingOption {
  key: string
  label: string
}

export interface CreateVotingPayload {
  groupId: number
  title: string
  description: string
  votingType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE'
  options: VotingOption[]
  deadline: string // ISO 8601 format, e.g. "2025-11-13T23:59:59"
}

export interface CreateVotingResponse {
  votingId: number
  groupId: number
  title: string
  description: string
  votingType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE'
  status: 'ACTIVE' | 'CLOSED' | 'PENDING' | string
  deadline: string // ISO 8601 format, ví dụ "2025-11-13T23:59:59"
  estimatedAmount: number | null
  relatedExpenseId: number | null
  options: Record<string, string> // { "option1": "Kraken V3 SF", ... }
  results: Record<string, number> // có thể là { "option1": 10, "option2": 5 }
  createdBy: number
  createdByName: string
  createdAt: string // ISO datetime string
  hasVoted: boolean
  userVote: string | null // key của option mà user đã chọn
  totalVotes: number
  totalMembers: number
  votingProgress: string // ví dụ: "0.0%" hoặc "75%"
  timeRemaining: string // ví dụ: "2 days"
}

//Đ/n kiểu dữ liệu gửi lên submit voting
export interface VotingSubmitPayload {
  groupId: number
  votingId: number
  selectedOption: string // ví dụ: 'option1', 'option2', ...
}

//response after voting submit successful
export interface VotingSubmitResponse {
  votingId: number
  groupId: number
  title: string
  description: string
  votingType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE'
  status: 'ACTIVE' | 'CLOSED' | 'PENDING' | string
  deadline: string
  estimatedAmount: number | null
  relatedExpenseId: number | null
  options: Record<string, string>
  results: Record<string, number>
  createdBy: number
  createdByName: string
  createdAt: string
  hasVoted: boolean
  userVote: string | null
  totalVotes: number
  totalMembers: number
  votingProgress: string
  timeRemaining: string
}

//type for history payment
export interface PaymentHistory {
  userId: number
  totalCompletedAmount: number
  items: PaymentItem[]
}

export interface PaymentItem {
  paymentId: number
  fundId: number
  groupId: number
  groupName: string
  amount: number
  paymentMethod: 'VNPAY' | 'BANK_TRANSFER' | 'CASH' // có thể mở rộng nếu có thêm phương thức
  status: 'COMPLETED' | 'PENDING' | 'FAILED' // tùy theo hệ thống
  paymentType: 'DEPOSIT' | 'CONTRIBUTION'
  transactionCode: string
  paymentDate: string // dạng ISO hoặc "YYYY-MM-DD HH:mm:ss"
}

// payment maintenance
export interface MaintenancePaymentResponse {
  amount: number
  groupId: number
  message: string
  paidAt: string
  paymentId: number
  paymentMethod: string
  requiredAmount: number | null
  status: string

  transactionCode: string
  userId: number
  vnpayUrl: string | null
}
