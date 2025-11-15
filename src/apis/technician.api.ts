import type { BookingReviewResponse, Maintenance } from '../types/api/technician.type'
import http from '../utils/http'

const technicianApi = {
  getAllVehicleCheck() {
    return http.get<BookingReviewResponse>('/api/vehicle-checks')
  },
  checkReport(checkId: string, status: 'APPROVED' | 'REJECTED') {
    return http.put(`/api/vehicle-checks/${checkId}/status`, {
      status: status
    })
  },
  //mantainance report
  getAllMantainance() {
    return http.get<Maintenance[]>('api/after-checkout/maintenances/my-requests')
  },
  //Complete Mantainance: chỉ complete khi mà co-owner đã đóng tiền(funded)
  completeMantainance(maintainanceId: string) {
    return http.put(`api/after-checkout/maintenances/${maintainanceId}/complete`)
  },
  //Create Mantainance
  createMantainance(data: { description: string; cost: number; estimatedDurationDays: number }, vehicleId: number) {
    return http.post<Maintenance>(`api/after-checkout/maintenances/vehicles/${vehicleId}`, data)
  }
}

export default technicianApi
