/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BookingReviewResponse {
  content: BookingReviewItem[]
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  first: boolean
  size: number
  number: number
  sort: Sort
  numberOfElements: number
  empty: boolean
}

export interface BookingReviewItem {
  id: number
  booking: Booking
  checkType: 'POST_USE' | 'PRE_USE'
  odometer: number
  batteryLevel: number
  cleanliness: number | null
  notes: string | null
  issues: string | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

export interface Booking {
  id: number
  startDateTime: string
  endDateTime: string
  status: string
  totalDuration: number | null
  priority: number | null
  createdAt: string
  updatedAt: string
  qrCodeCheckin: string | null
  qrCodeCheckout: string | null
  checkinStatus: boolean
  checkoutStatus: boolean
  checkinTime: string | null
  checkoutTime: string | null
  incidents: any[] // nếu có cấu trúc cố định thì định nghĩa riêng
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
