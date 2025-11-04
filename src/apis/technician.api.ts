import type { BookingReviewResponse } from '../types/api/technician.type'
import http from '../utils/http'

const technicianApi = {
  getAllVehicleCheck() {
    return http.get<BookingReviewResponse>('/api/vehicle-checks')
  }
}

export default technicianApi
