import type { ContractResponse } from '../types/api/admin.type'
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
  }
}

export default adminApi
