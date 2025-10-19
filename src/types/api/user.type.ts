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

export interface CreateGroupMember {
  groupId: number
  groupName: string
  status: 'PENDING' | 'ACTIVE' | 'REJECTED'
  description: string
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
