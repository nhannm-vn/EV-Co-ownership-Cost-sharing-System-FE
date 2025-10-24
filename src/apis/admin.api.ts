import http from '../utils/http'

// Gom thành obj cho tiện dễ xài
const adminApi = {
  getAllContracts: () => {
    return http.get('api/admin/contracts')
  },

  getAllContractPending: () => {
    return http.get('api/admin/contracts/pending')
  },

  approveContract: (contractId: number, action: string) => {
    return http.post(`api/admin/contracts/approve`, {
      contractId: contractId,
      action: action
    })
  }
}

export default adminApi
