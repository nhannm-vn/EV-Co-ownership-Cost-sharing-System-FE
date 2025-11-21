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
export interface MaintenanceReport {
  userId: number
  userName: string
  vehicleId: number
  vehicleModel: string
  licensePlate: string
}

export interface PayerShare {
  userId: number
  userName: string
  amount: number
}

export interface MaintenanceRequest {
  id: number
  vehicleId: number
  vehicleModel: string
  requestedByName: string
  approvedByName: string | null
  liableUserName: string
  coverageType: 'PERSONAL' | 'COMMERCIAL' | string // nếu có nhiều loại khác
  description: string
  actualCost: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | string
  requestDate: string // ISO date string
  approvalDate: string | null
  nextDueDate: string | null
  estimatedDurationDays: number
  maintenanceStartAt: string | null
  expectedFinishAt: string | null
  maintenanceCompletedAt: string | null
  createdAt: string
  updatedAt: string
  payerShares: number | null
}
