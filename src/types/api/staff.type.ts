export interface DocumentImage {
  documentId?: number
  imageUrl?: string
  status?: 'PENDING' | 'APPROVED' | 'REJECTED'
  uploadedAt?: string
}

export interface CitizenIdImages {
  front?: DocumentImage
  back?: DocumentImage
}

export interface DriverLicenseImages {
  front?: DocumentImage
  back?: DocumentImage
}

export interface Documents {
  citizenIdImages?: CitizenIdImages
  driverLicenseImages?: DriverLicenseImages
}

export interface Statistics {
  groupsJoined?: number
  accountStatus?: 'ACTIVE' | 'INACTIVE' | 'BANNED'
  memberSince?: string
}

export interface UserOfStaff {
  userId?: number
  fullName?: string
  email?: string
  phoneNumber?: string
  avatarUrl?: string | null
  roleName?: 'CO_OWNER' | 'ADMIN' | 'STAFF' | 'MEMBER'
  status?: 'ACTIVE' | 'INACTIVE' | 'BANNED'
  createdAt?: string
  documents?: Documents
  statistics?: Statistics
}

export interface groupStaffItem {
  groupId: number
  groupName: string
  status: 'PENDING' | 'ACTIVE' | 'UNACTIVE'
}

export interface GroupStaffList {
  content: groupStaffItem[]
}
