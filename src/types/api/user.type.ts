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

export interface UserGetProfile {
  userId: number
  fullName: string
  email: string
  phoneNumber: string
  avatarUrl?: string | null
  roleName: string
  status: string
  createdAt: string
  documents: {
    citizenIdImages: string[]
    driverLicenseImages: string[]
  }
  statistics: {
    groupsJoined: number
    accountStatus: string
    memberSince: string
  }
}
