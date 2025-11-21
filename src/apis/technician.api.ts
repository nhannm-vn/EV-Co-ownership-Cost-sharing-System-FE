import type { MaintenanceReport, MaintenanceRequest, VehicleCheck } from '../types/api/technician.type'
import http from '../utils/http'

const technicianApi = {
  getAllVehicleCheck() {
    return http.get<VehicleCheck[]>('/api/vehicle-checks')
  },
  checkReport(checkId: string, status: 'APPROVED' | 'REJECTED') {
    return http.put(`/api/vehicle-checks/${checkId}/status`, {
      status: status
    })
  },
  //lấy tất cả user report
  getAllUserReport() {
    return http.get<MaintenanceReport[]>('api/after-checkout/maintenances/rejected-users')
  },
  //Complete Mantainance: chỉ complete khi mà co-owner đã đóng tiền(funded)
  completeMantainance(maintainanceId: string) {
    return http.put(`api/after-checkout/maintenances/${maintainanceId}/complete`)
  },
  //Create Mantainance
  createMantainance(
    data: { userId: number; vehicleId: number; description: string; cost: number; estimatedDurationDays: number }, // CHỈNH: phải có vehicleId
    vehicleId: number
  ) {
    return http.post<MaintenanceRequest>(`api/after-checkout/maintenances/vehicles/${vehicleId}`, data)
  },
  //get all maintance
  getAllMaintance() {
    return http.get<MaintenanceRequest[]>('api/after-checkout/maintenances/my-requests')
  }
}

export default technicianApi
