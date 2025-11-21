/* eslint-disable @typescript-eslint/no-explicit-any */
export interface VehicleCheck {
  id: number
  bookingId: number
  checkType: 'PRE_USE' | 'POST_USE' // hoặc string nếu bạn không chắc
  odometer: number
  batteryLevel: number
  cleanliness: string | null
  notes: string | null
  issues: string | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED' // tùy hệ thống bạn dùng
  createdAt: string
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  sorted: boolean
  empty: boolean
  unsorted: boolean
}

// maintainance report
export interface Maintenance {
  id: number
  vehicleId: number
  vehicleModel: string
  requestedByName: string
  approvedByName: string
  liableUserName: string
  coverageType: 'PERSONAL' | 'COMPANY' | string
  description: string
  actualCost: number
  status: 'PENDING' | 'FUNDED' | 'COMPLETED' | string
  requestDate: string // ISO datetime
  approvalDate: string | null
  nextDueDate: string | null
  estimatedDurationDays: number
  maintenanceStartAt: string | null
  expectedFinishAt: string | null
  maintenanceCompletedAt: string | null
  createdAt: string
  updatedAt: string
  payerShares: PayerShare[] | null
}

export interface PayerShare {
  userId: number
  userName: string
  amount: number
}
