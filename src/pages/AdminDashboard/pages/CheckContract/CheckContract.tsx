import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import adminApi from '../../../../apis/admin.api'
import Skeleton from '../../../../components/Skeleton'
import type { ContractResponse } from '../../../../types/api/admin.type'
import { formatToVND } from '../../../../utils/formatPrice'
import { formatVnTime } from '../../../../utils/helper'
import EmptyState from '../EmptyState'

function CheckContract() {
  const queryClient = useQueryClient()

  // Tạo useQuery để tiến hành fetch api
  const { data: contracts = [], isLoading } = useQuery<ContractResponse[]>({
    queryKey: ['contracts'],
    queryFn: () => adminApi.getAllContracts().then((res) => res.data)
  })

  //  Tạo mutation trực tiếp, không bọc trong function
  const approveMutation = useMutation({
    mutationFn: (id: number) => adminApi.approveContract(id, 'APPROVE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
      toast.success('Duyệt hợp đồng thành công!', { autoClose: 1500 })
    },
    onError: () => {
      toast.error('Duyệt hợp đồng thất bại!', { autoClose: 1500 })
    }
  })

  // Tạo hàm giúp reject từ chối
  const rejectMutation = useMutation({
    mutationFn: (id: number) => adminApi.approveContract(id, 'REJECT'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
      toast.success('Từ chối hợp đồng thành công!', { autoClose: 1500 })
    },
    onError: () => {
      toast.error('Từ chối hợp đồng thất bại!', { autoClose: 1500 })
    }
  })

  // Hàm để xác nhận coi là xác nhận hay từ chối hợp đồng
  const handleAction = (id: number, type: 'APPROVE' | 'REJECT') => {
    const confirmText = type === 'APPROVE' ? 'Xác nhận duyệt hợp đồng này?' : 'Xác nhận từ chối hợp đồng này?'
    const isConfirmed = window.confirm(confirmText)
    if (!isConfirmed) return

    if (type === 'APPROVE') {
      approveMutation.mutate(id)
    } else {
      rejectMutation.mutate(id)
    }
  }

  //  Tránh “unused expressions” khi cần xử lý mutation side effect (nếu có thêm sau)
  useEffect(() => {
    // Có thể thêm side effect tại đây nếu cần quan sát trạng thái mutation
  }, [approveMutation.isPending, rejectMutation.isPending])

  if (isLoading) return <Skeleton />
  if (contracts.length === 0) return <EmptyState />

  const getStatusBadge = (status: string) => {
    const statusStyle =
      status === 'SIGNED'
        ? 'bg-yellow-100 text-yellow-800'
        : status === 'APPROVED'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'

    const label = status === 'SIGNED' ? 'Chờ duyệt' : status === 'APPROVED' ? 'Đã duyệt' : 'Từ chối'

    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyle}`}>{label}</span>
  }

  return (
    <div className='p-8 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800'>Duyệt Hợp Đồng</h1>

      <div className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'>
        <table className='w-full text-sm text-gray-700'>
          <thead className='bg-gray-100 text-gray-700 uppercase text-xs'>
            <tr>
              {['ID', 'Nhóm', 'Ngày bắt đầu', 'Ngày kết thúc', 'Tiền đặt cọc', 'Trạng thái', 'Hành động'].map(
                (header) => (
                  <th key={header} className='px-4 py-3 text-left font-semibold'>
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {contracts.map((c) => (
              <tr key={c.id} className='hover:bg-gray-50 transition-colors'>
                <td className='px-4 py-3 font-medium'>#{c.id}</td>
                <td className='px-4 py-3'>Nhóm {c.groupId}</td>
                <td className='px-4 py-3'>{formatVnTime(c.startDate)}</td>
                <td className='px-4 py-3'>{formatVnTime(c.endDate)}</td>
                <td className='px-4 py-3 font-semibold'>{formatToVND(c.requiredDepositAmount)}</td>
                <td className='px-4 py-3'>{getStatusBadge(c.approvalStatus)}</td>
                <td className='px-4 py-3'>
                  {c.approvalStatus === 'SIGNED' ? (
                    <div className='flex gap-2'>
                      <button
                        onClick={() => handleAction(c.id, 'APPROVE')}
                        disabled={approveMutation.isPending}
                        className='px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all text-xs font-medium shadow-sm disabled:opacity-50'
                      >
                        {approveMutation.isPending ? 'Đang duyệt...' : 'Duyệt'}
                      </button>
                      <button
                        onClick={() => handleAction(c.id, 'REJECT')}
                        disabled={rejectMutation.isPending}
                        className='px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all text-xs font-medium shadow-sm disabled:opacity-50'
                      >
                        {rejectMutation.isPending ? 'Đang xử lý...' : 'Từ chối'}
                      </button>
                    </div>
                  ) : (
                    <span className='text-xs text-gray-500'>
                      {c.approvalStatus === 'APPROVED' ? 'Đã duyệt' : 'Đã từ chối'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CheckContract
