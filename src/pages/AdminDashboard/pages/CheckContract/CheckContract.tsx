import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import adminApi from '../../../../apis/admin.api'
import Skeleton from '../../../../components/Skeleton'
import type { ContractResponse } from '../../../../types/api/admin.type'
import { formatToVND } from '../../../../utils/formatPrice'
import { formatVnTime } from '../../../../utils/helper'
import EmptyState from '../EmptyState'

function CheckContract() {
  const queryClient = useQueryClient()

  const { data: contracts = [], isLoading } = useQuery<ContractResponse[]>({
    queryKey: ['contracts'],
    queryFn: () => adminApi.getAllContracts().then((res) => res.data)
  })
  console.log(contracts)

  const approveMutation = useMutation({
    mutationFn: (id: number) => adminApi.approveContract(id, 'APPROVE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
      toast.success('Aprrove contract successful!', {
        autoClose: 1500
      })
    },
    onError: () => {
      toast.error('Aprrove contract fail!', {
        autoClose: 1500
      })
    }
  })

  const rejectMutation = useMutation({
    mutationFn: (id: number) => adminApi.approveContract(id, 'REJECT'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
      toast.success('Reject contract successful!', {
        autoClose: 1500
      })
    },
    onError: () => {
      toast.error('Reject contract fail!', {
        autoClose: 1500
      })
    }
  })

  const handleApprove = (id: number) => {
    if (window.confirm('Xác nhận duyệt hợp đồng này?')) {
      approveMutation.mutate(id)
    }
  }

  const handleReject = (id: number) => {
    if (window.confirm('Xác nhận từ chối hợp đồng này?')) {
      rejectMutation.mutate(id)
    }
  }

  if (contracts.length === 0) {
    return <EmptyState />
  }

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className='p-8 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <h1 className='text-2xl  font-bold mb-6'>Duyệt Hợp Đồng</h1>

      <div className='bg-white rounded-lg shadow overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>ID</th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Group</th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Ngày bắt đầu</th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Ngày kết thúc</th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Tiền đặt cọc</th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Trạng thái</th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Hành động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {contracts.map((contract) => (
              <tr key={contract.id} className='hover:bg-gray-50'>
                <td className='px-4 py-3'>#{contract.id}</td>
                <td className='px-4 py-3'>Group {contract.groupId}</td>
                <td className='px-4 py-3'>{formatVnTime(contract.startDate)}</td>
                <td className='px-4 py-3'>{formatVnTime(contract.endDate)}</td>
                <td className='px-4 py-3 font-semibold'>{formatToVND(contract.requiredDepositAmount)}</td>
                <td className='px-4 py-3'>
                  {contract.approvalStatus === 'SIGNED' && (
                    <span className='px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full'>
                      Chờ duyệt
                    </span>
                  )}
                  {contract.approvalStatus === 'APPROVED' && (
                    <span className='px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full'>
                      Đã duyệt
                    </span>
                  )}
                  {contract.approvalStatus === 'REJECTED' && (
                    <span className='px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full'>
                      Từ chối
                    </span>
                  )}
                </td>
                <td className='px-4 py-3'>
                  {contract.approvalStatus === 'SIGNED' ? (
                    <div className='flex gap-2'>
                      <button
                        onClick={() => handleApprove(contract.id)}
                        disabled={approveMutation.isPending}
                        className='px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        {approveMutation.isPending ? 'Đang duyệt...' : 'Duyệt'}
                      </button>
                      <button
                        onClick={() => handleReject(contract.id)}
                        disabled={rejectMutation.isPending}
                        className='px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        {rejectMutation.isPending ? 'Đang xử lý...' : 'Từ chối'}
                      </button>
                    </div>
                  ) : (
                    <span className='text-sm text-gray-500'>
                      {contract.approvalStatus === 'APPROVED' ? 'Đã duyệt' : 'Đã từ chối'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {contracts.length === 0 && <div className='text-center py-8 text-gray-500'>Không có hợp đồng nào</div>}
      </div>
    </div>
  )
}

export default CheckContract
