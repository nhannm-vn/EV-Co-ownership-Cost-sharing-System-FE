import type { ContractResponse, ContractsForEditResponse } from '../types/api/admin.type'
import type { BookingResponse } from '../types/api/staff.type'
import http from '../utils/http'

// Gom thành obj cho tiện dễ xài
const adminApi = {
  getAllContracts: () => {
    return http.get<ContractResponse[]>('api/admin/contracts')
  },

  getAllContractPending: () => {
    return http.get<ContractResponse[]>('api/admin/contracts/pending')
  },

  approveContract: (contractId: number, action: string) => {
    return http.put(`api/admin/contracts/approve`, {
      contractId: contractId,
      action: action
    })
  },

  //lấy all qr booking by userId và groupId
  getQrBookingByUserIdAndGroupId({ userId, groupId }: { userId: number; groupId: number }) {
    return http.get<BookingResponse>('api/bookings/admin/search', {
      params: {
        userId,
        groupId
      }
    })
  },
  // lấy danh sách contract để hiển thị trang edit
  getContractsForEdit: () => {
    return http.get<ContractsForEditResponse[]>('api/admin/contracts/pending-member-approval')
  },
  // lấy danh sách feedback của  từng hợp đồng
  getFeedbackByContractId: (contractId: string) => {
    return http.get(`api/contracts/${contractId}/member-feedbacks`)
  }
}

export default adminApi
