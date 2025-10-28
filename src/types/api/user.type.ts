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
  // 👥 Group related
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
