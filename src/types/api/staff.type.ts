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
  status: 'PENDING' | 'ACTIVE' | 'INACTIVE'
  description: string
  memberCapacity: number
}

export interface GroupStaffList {
  content: groupStaffItem[]
  pageable: {
    pageNumber: number
  }
  totalElements: number
  totalPages: number
}

export interface imageElement {
  imageId: number
  imageUrl: string
  imageType: string
  approvalStatus: string
}

// ảnh
export interface GroupImage {
  brand: string
  model: string
  licensePlate: string
  chassisNumber: string
  vehicleValue: number
  vehicleCreatedAt: string
  vehicleUpdatedAt: string
  groupName: string
  images: imageElement[]
}

// định nghĩa resonse reject and approve
export interface ReviewResponse {
  approvedImages: number
  groupId: number
  groupStatus: string
  rejectedImages?: number
  totalImages: number
}

export interface Booking {
  bookingId: number
  qrCode: string // JSON string, chứa thông tin booking
  startDateTime: string // ISO DateTime string
  endDateTime: string // ISO DateTime string
}

export interface GetGroupById {
  groupId: number
  groupName: string
  bookings: Booking[]
}

export interface BookingResponse {
  content: BookingItem[]
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  first: boolean
  size: number
  number: number
  sort: SortInfo
  numberOfElements: number
  empty: boolean
}

export interface BookingItem {
  bookingId: number
  licensePlate: string
  brand: string
  model: string
  startDateTime: string
  endDateTime: string
  status: 'CONFIRMED' | 'CANCELLED' | string
  qrCodeCheckin: QrCodeData | null
  qrCodeCheckout: QrCodeData | null
  createdAt: string
}

export interface QrCodeData {
  bookingId: number
  userId: number
  vehicleId: number
  phase: 'CHECKIN' | 'CHECKOUT' | string
  startTime: string
  endTime: string
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: SortInfo
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface SortInfo {
  sorted: boolean
  empty: boolean
  unsorted: boolean
}
