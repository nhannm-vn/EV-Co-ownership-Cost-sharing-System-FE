import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import adminApi from '../../../../apis/admin.api'
import Skeleton from '../../../../components/Skeleton'
import type { ContractResponse, ContractDetail } from '../../../../types/api/admin.type'
import { formatToVND } from '../../../../utils/formatPrice'
import { formatVnTime } from '../../../../utils/helper'
import EmptyState from '../EmptyState'

function CheckContract() {
  const queryClient = useQueryClient()
  const [selectedContract, setSelectedContract] = useState<ContractResponse | null>(null)

  const { data: contracts = [], isLoading } = useQuery<ContractResponse[]>({
    queryKey: ['contracts'],
    queryFn: () => adminApi.getAllContracts().then((res) => res.data)
  })

  // Query chi tiết hợp đồng - chỉ fetch khi có selectedContract
  const {
    data: contractDetail,
    isLoading: isLoadingDetail,
    error: detailError
  } = useQuery<ContractDetail>({
    queryKey: ['contractDetail', selectedContract?.groupId],
    queryFn: () => adminApi.getContractDetailByGroupId(selectedContract!.groupId).then((res) => res.data),
    enabled: !!selectedContract, // Chỉ fetch khi selectedContract tồn tại
    staleTime: 30000 // Cache 30 giây
  })

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

  useEffect(() => {
    // Side effect handling if needed
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

  const getDepositStatusBadge = (status: string) => {
    const statusStyle =
      status === 'PAID'
        ? 'bg-green-100 text-green-800'
        : status === 'UNPAID'
          ? 'bg-red-100 text-red-800'
          : 'bg-yellow-100 text-yellow-800'

    const label = status === 'PAID' ? 'Đã thanh toán' : status === 'UNPAID' ? 'Chưa thanh toán' : 'Đang chờ'

    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusStyle}`}>{label}</span>
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
                  <div className='flex gap-2 items-center'>
                    <button
                      onClick={() => setSelectedContract(c)}
                      className='px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all text-xs font-medium shadow-sm flex items-center gap-1.5'
                    >
                      <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                      Chi tiết
                    </button>
                    {c.approvalStatus === 'SIGNED' && (
                      <>
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
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Chi tiết */}
      {selectedContract && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
          onClick={() => setSelectedContract(null)}
        >
          <div
            className='bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl z-10'>
              <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold'>Chi tiết Hợp đồng #{selectedContract.id}</h2>
                <button
                  onClick={() => setSelectedContract(null)}
                  className='text-white hover:bg-white/20 rounded-full p-2 transition-colors'
                >
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            </div>

            <div className='p-6'>
              {isLoadingDetail ? (
                <div className='flex justify-center items-center py-12'>
                  <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
                </div>
              ) : detailError ? (
                <div className='text-center py-12'>
                  <p className='text-red-600 font-semibold'>Không thể tải thông tin chi tiết</p>
                </div>
              ) : contractDetail ? (
                <div className='space-y-6'>
                  {/* Thông tin hợp đồng */}
                  <div>
                    <h3 className='text-lg font-bold text-gray-800 mb-3 flex items-center gap-2'>
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                        />
                      </svg>
                      Thông tin Hợp đồng
                    </h3>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>ID Hợp đồng</p>
                        <p className='text-lg font-semibold text-gray-800'>#{contractDetail.contract.contractId}</p>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Trạng thái</p>
                        {getStatusBadge(contractDetail.contract.approvalStatus)}
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Ngày bắt đầu</p>
                        <p className='text-base font-semibold text-gray-800'>
                          {formatVnTime(contractDetail.contract.startDate)}
                        </p>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Ngày kết thúc</p>
                        <p className='text-base font-semibold text-gray-800'>
                          {formatVnTime(contractDetail.contract.endDate)}
                        </p>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Hạn đặt cọc</p>
                        <p className='text-base font-semibold text-orange-600'>
                          {formatVnTime(contractDetail.contract.depositDeadline)}
                        </p>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Tiền đặt cọc yêu cầu</p>
                        <p className='text-xl font-bold text-green-600'>
                          {formatToVND(contractDetail.contract.requiredDepositAmount)}
                        </p>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg col-span-2'>
                        <p className='text-xs text-gray-500 mb-1'>Điều khoản</p>
                        <p className='text-sm text-gray-700 whitespace-pre-wrap'>{contractDetail.contract.terms}</p>
                      </div>
                    </div>
                  </div>

                  {/* Thông tin nhóm */}
                  <div>
                    <h3 className='text-lg font-bold text-gray-800 mb-3 flex items-center gap-2'>
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                        />
                      </svg>
                      Thông tin Nhóm
                    </h3>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Tên nhóm</p>
                        <p className='text-lg font-semibold text-gray-800'>{contractDetail.group.groupName}</p>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Trạng thái nhóm</p>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            contractDetail.group.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {contractDetail.group.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Danh sách thành viên */}
                  <div>
                    <h3 className='text-lg font-bold text-gray-800 mb-3 flex items-center gap-2'>
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                        />
                      </svg>
                      Danh sách Thành viên ({contractDetail.members.length})
                    </h3>
                    <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
                      <table className='w-full text-sm'>
                        <thead className='bg-gray-50 text-gray-700 text-xs'>
                          <tr>
                            <th className='px-4 py-3 text-left font-semibold'>Họ tên</th>
                            <th className='px-4 py-3 text-left font-semibold'>Email</th>
                            <th className='px-4 py-3 text-left font-semibold'>Vai trò</th>
                            <th className='px-4 py-3 text-left font-semibold'>Tỷ lệ sở hữu</th>
                            <th className='px-4 py-3 text-left font-semibold'>Trạng thái cọc</th>
                          </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                          {contractDetail.members.map((member) => (
                            <tr key={member.userId} className='hover:bg-gray-50'>
                              <td className='px-4 py-3 font-medium text-gray-800'>{member.fullName}</td>
                              <td className='px-4 py-3 text-gray-600'>{member.email}</td>
                              <td className='px-4 py-3'>
                                <span
                                  className={`px-2 py-1 text-xs font-semibold rounded ${
                                    member.userRole === 'ADMIN'
                                      ? 'bg-purple-100 text-purple-800'
                                      : member.userRole === 'CO_OWNER'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {member.userRole === 'ADMIN'
                                    ? 'Quản trị'
                                    : member.userRole === 'CO_OWNER'
                                      ? 'Đồng sở hữu'
                                      : 'Thành viên'}
                                </span>
                              </td>
                              <td className='px-4 py-3 font-semibold text-gray-800'>{member.ownershipPercentage}%</td>
                              <td className='px-4 py-3'>{getDepositStatusBadge(member.depositStatus)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Nút hành động */}
                  {contractDetail.contract.approvalStatus === 'PENDING' && (
                    <div className='flex gap-3 pt-4 border-t'>
                      <button
                        onClick={() => {
                          handleAction(contractDetail.contract.contractId, 'APPROVE')
                          setSelectedContract(null)
                        }}
                        className='flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all shadow-md'
                      >
                        Duyệt hợp đồng
                      </button>
                      <button
                        onClick={() => {
                          handleAction(contractDetail.contract.contractId, 'REJECT')
                          setSelectedContract(null)
                        }}
                        className='flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all shadow-md'
                      >
                        Từ chối hợp đồng
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckContract
