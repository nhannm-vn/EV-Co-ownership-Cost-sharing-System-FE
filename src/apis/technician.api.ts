import type { BookingReviewResponse } from '../types/api/technician.type'
import http from '../utils/http'

const technicianApi = {
  getAllVehicleCheck() {
    return http.get<BookingReviewResponse>('/api/vehicle-checks')
  },
  checkReport(checkId: string, status: 'APPROVED' | 'REJECTED') {
    return http.put(`/api/vehicle-checks/${checkId}/status`, {
      status: status
    })
  }
}

export default technicianApi
