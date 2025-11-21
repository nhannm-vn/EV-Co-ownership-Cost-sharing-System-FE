import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import adminApi from '../../../../apis/admin.api'
import Skeleton from '../../../../components/Skeleton'
import type { ContractResponse, ContractDetail } from '../../../../types/api/admin.type'
import { formatToVND } from '../../../../utils/formatPrice'
import { formatVnTime } from '../../../../utils/helper'
import EmptyState from '../EmptyState'

// Lấy message từ axios error (bắt luôn kiểu message là array như NestJS)
const getServerMessage = (error: unknown): string | null => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = error as any
  const data = err?.response?.data

  if (!data) {
    return typeof err?.message === 'string' ? err.message : null
  }

  // NestJS / class-validator: { message: string[] }
  if (Array.isArray(data.message) && data.message.length > 0) {
    const first = data.message[0]
    return typeof first === 'string' ? first : JSON.stringify(first)
  }

  const msg = (typeof data === 'string' && data) || data?.message || data?.error || err?.message

  return typeof msg === 'string' && msg.trim() ? msg : null
}

function CheckContract() {
  const queryClient = useQueryClient()
  const [selectedContract, setSelectedContract] = useState<ContractResponse | null>(null)

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [rejectingContractId, setRejectingContractId] = useState<number | null>(null)
  const [rejectReasonError, setRejectReasonError] = useState<string | null>(null)

  // List contracts
  const { data: contracts = [], isLoading } = useQuery<ContractResponse[]>({
    queryKey: ['contracts'],
    queryFn: () => adminApi.getAllContracts().then((res) => res.data)
  })

  // Contract detail
  const {
    data: contractDetail,
    isLoading: isLoadingDetail,
    error: detailError
  } = useQuery<ContractDetail>({
    queryKey: ['contractDetail', selectedContract?.groupId],
    queryFn: () => adminApi.getContractDetailByGroupId(selectedContract!.groupId).then((res) => res.data),
    enabled: !!selectedContract,
    staleTime: 30000
  })

  // APPROVE
  const approveMutation = useMutation({
    mutationFn: (id: number) => adminApi.approveContract(id, 'APPROVE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
      toast.success('Approve contract successfully!', { autoClose: 1500 })
    },
    onError: (error) => {
      toast.error(getServerMessage(error) ?? 'Approve contract failed!', { autoClose: 2000 })
    }
  })

  // REJECT
  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) => adminApi.approveContract(id, 'REJECT', reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] })
      toast.success('Reject contract successfully!', { autoClose: 1500 })
      setIsRejectModalOpen(false)
      setRejectReason('')
      setRejectingContractId(null)
      setRejectReasonError(null)
    },
    onError: (error) => {
      const msg = getServerMessage(error)
      if (msg) setRejectReasonError(msg)
      toast.error(msg ?? 'Reject contract failed!', { autoClose: 2000 })
    }
  })

  const handleAction = (id: number, type: 'APPROVE' | 'REJECT') => {
    if (type === 'APPROVE') {
      if (!window.confirm('Confirm approving this contract?')) return
      approveMutation.mutate(id)
      return
    }

    // REJECT
    setRejectingContractId(id)
    setIsRejectModalOpen(true)
    setRejectReasonError(null)
  }

  const handleConfirmReject = () => {
    if (!rejectingContractId) return
    const trimmed = rejectReason.trim()

    // client-side validate
    if (!trimmed) {
      setRejectReasonError('Reject reason is required.')
      toast.warn('Please enter a reject reason', { autoClose: 1800 })
      return
    }

    setRejectReasonError(null)
    rejectMutation.mutate({ id: rejectingContractId, reason: trimmed })
  }

  const handleCloseRejectModal = () => {
    if (rejectMutation.isPending) return
    setIsRejectModalOpen(false)
    setRejectReason('')
    setRejectingContractId(null)
    setRejectReasonError(null)
  }

  useEffect(() => {
    void (approveMutation.isPending || rejectMutation.isPending)
  }, [approveMutation.isPending, rejectMutation.isPending])

  if (isLoading) return <Skeleton />
  if (contracts.length === 0) return <EmptyState />

  const getStatusBadge = (status: string) => {
    const style =
      status === 'SIGNED'
        ? 'bg-yellow-100 text-yellow-800'
        : status === 'APPROVED'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'

    const label = status === 'SIGNED' ? 'Pending' : status === 'APPROVED' ? 'Approved' : 'Rejected'
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${style}`}>{label}</span>
  }

  const getDepositStatusBadge = (status: string) => {
    const style =
      status === 'PAID'
        ? 'bg-green-100 text-green-800'
        : status === 'UNPAID'
          ? 'bg-red-100 text-red-800'
          : 'bg-yellow-100 text-yellow-800'

    const label = status === 'PAID' ? 'Paid' : status === 'UNPAID' ? 'Unpaid' : 'Pending'
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${style}`}>{label}</span>
  }

  return (
    <div className='p-8 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800'>Contract Approval</h1>

      {/* TABLE */}
      <div className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'>
        <table className='w-full text-sm text-gray-700'>
          <thead className='bg-gray-100 text-gray-700 uppercase text-xs'>
            <tr>
              {['ID', 'Group', 'Start date', 'End date', 'Deposit amount', 'Status', 'Actions'].map((header) => (
                <th key={header} className='px-4 py-3 text-left font-semibold'>
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {contracts.map((c) => (
              <tr key={c.id} className='hover:bg-gray-50 transition-colors'>
                <td className='px-4 py-3 font-medium'>#{c.id}</td>
                <td className='px-4 py-3'>Group {c.groupId}</td>
                <td className='px-4 py-3'>{formatVnTime(c.startDate)}</td>
                <td className='px-4 py-3'>{formatVnTime(c.endDate)}</td>
                <td className='px-4 py-3 font-semibold'>{formatToVND(c.requiredDepositAmount)}</td>
                <td className='px-4 py-3'>{getStatusBadge(c.approvalStatus)}</td>
                <td className='px-4 py-3'>
                  <div className='flex gap-2 items-center'>
                    <button
                      onClick={() => setSelectedContract(c)}
                      className='px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all text-xs font-medium shadow-sm'
                    >
                      Details
                    </button>
                    {c.approvalStatus === 'SIGNED' && (
                      <>
                        <button
                          onClick={() => handleAction(c.id, 'APPROVE')}
                          disabled={approveMutation.isPending}
                          className='px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all text-xs font-medium shadow-sm disabled:opacity-50'
                        >
                          {approveMutation.isPending ? 'Approving...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleAction(c.id, 'REJECT')}
                          disabled={rejectMutation.isPending}
                          className='px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all text-xs font-medium shadow-sm disabled:opacity-50'
                        >
                          {rejectMutation.isPending ? 'Processing...' : 'Reject'}
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

      {/* Detail Modal */}
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
                <h2 className='text-2xl font-bold'>Contract details #{selectedContract.id}</h2>
                <button
                  onClick={() => setSelectedContract(null)}
                  className='text-white hover:bg-white/20 rounded-full p-2 transition-colors'
                >
                  ✕
                </button>
              </div>
            </div>

            <div className='p-6'>
              {isLoadingDetail ? (
                <div className='flex justify-center items-center py-12'>
                  <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600' />
                </div>
              ) : detailError ? (
                <div className='text-center py-12'>
                  <p className='text-red-600 font-semibold'>Failed to load contract details</p>
                </div>
              ) : contractDetail ? (
                <div className='space-y-6'>
                  {/* Contract info */}
                  <div>
                    <h3 className='text-lg font-bold text-gray-800 mb-3'>Contract information</h3>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Contract ID</p>
                        <p className='text-lg font-semibold text-gray-800'>#{contractDetail.contract.contractId}</p>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Status</p>
                        {getStatusBadge(contractDetail.contract.approvalStatus)}
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Start date</p>
                        <p className='text-base font-semibold text-gray-800'>
                          {formatVnTime(contractDetail.contract.startDate)}
                        </p>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>End date</p>
                        <p className='text-base font-semibold text-gray-800'>
                          {formatVnTime(contractDetail.contract.endDate)}
                        </p>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Deposit deadline</p>
                        <p className='text-base font-semibold text-orange-600'>
                          {formatVnTime(contractDetail.contract.depositDeadline)}
                        </p>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Required deposit amount</p>
                        <p className='text-xl font-bold text-green-600'>
                          {formatToVND(contractDetail.contract.requiredDepositAmount)}
                        </p>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg col-span-2'>
                        <p className='text-xs text-gray-500 mb-1'>Terms</p>
                        <p className='text-sm text-gray-700 whitespace-pre-wrap'>{contractDetail.contract.terms}</p>
                      </div>
                    </div>
                  </div>

                  {/* Group info */}
                  <div>
                    <h3 className='text-lg font-bold text-gray-800 mb-3'>Group information</h3>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Group name</p>
                        <p className='text-lg font-semibold text-gray-800'>{contractDetail.group.groupName}</p>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-xs text-gray-500 mb-1'>Group status</p>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            contractDetail.group.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {contractDetail.group.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Members list */}
                  <div>
                    <h3 className='text-lg font-bold text-gray-800 mb-3'>Members ({contractDetail.members.length})</h3>
                    <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
                      <table className='w-full text-sm'>
                        <thead className='bg-gray-50 text-gray-700 text-xs'>
                          <tr>
                            <th className='px-4 py-3 text-left font-semibold'>Full name</th>
                            <th className='px-4 py-3 text-left font-semibold'>Email</th>
                            <th className='px-4 py-3 text-left font-semibold'>Role</th>
                            <th className='px-4 py-3 text-left font-semibold'>Ownership</th>
                            <th className='px-4 py-3 text-left font-semibold'>Deposit status</th>
                          </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                          {contractDetail.members.map((m) => (
                            <tr key={m.userId} className='hover:bg-gray-50'>
                              <td className='px-4 py-3 font-medium text-gray-800'>{m.fullName}</td>
                              <td className='px-4 py-3 text-gray-600'>{m.email}</td>
                              <td className='px-4 py-3'>
                                <span
                                  className={`px-2 py-1 text-xs font-semibold rounded ${
                                    m.userRole === 'ADMIN'
                                      ? 'bg-purple-100 text-purple-800'
                                      : m.userRole === 'CO_OWNER'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {m.userRole === 'ADMIN' ? 'Admin' : m.userRole === 'CO_OWNER' ? 'Co-owner' : 'Member'}
                                </span>
                              </td>
                              <td className='px-4 py-3 font-semibold text-gray-800'>{m.ownershipPercentage}%</td>
                              <td className='px-4 py-3'>{getDepositStatusBadge(m.depositStatus)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Actions in detail modal */}
                  {contractDetail.contract.approvalStatus === 'PENDING' && (
                    <div className='flex gap-3 pt-4 border-t'>
                      <button
                        onClick={() => {
                          handleAction(contractDetail.contract.contractId, 'APPROVE')
                          setSelectedContract(null)
                        }}
                        className='flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all shadow-md'
                      >
                        Approve contract
                      </button>
                      <button
                        onClick={() => {
                          handleAction(contractDetail.contract.contractId, 'REJECT')
                          setSelectedContract(null)
                        }}
                        className='flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all shadow-md'
                      >
                        Reject contract
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Reject reason modal */}
      {isRejectModalOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
          onClick={handleCloseRejectModal}
        >
          <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full p-6' onClick={(e) => e.stopPropagation()}>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>Enter reject reason</h3>
            <textarea
              className={`w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 ${
                rejectReasonError ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-red-400'
              }`}
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder='For example: Contract information is incomplete, missing documents...'
              disabled={rejectMutation.isPending}
            />
            {rejectReasonError && <p className='mt-1 text-xs text-red-600'>{rejectReasonError}</p>}
            <div className='flex justify-end gap-3 mt-4'>
              <button
                type='button'
                onClick={handleCloseRejectModal}
                className='px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50'
                disabled={rejectMutation.isPending}
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={handleConfirmReject}
                className='px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold disabled:opacity-50'
                disabled={rejectMutation.isPending}
              >
                {rejectMutation.isPending ? 'Processing...' : 'Confirm reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckContract
