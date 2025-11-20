import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import groupApi from '../../../../apis/group.api'
import Skeleton from '../../../../components/Skeleton'
import { ClockCircleOutlined } from '@ant-design/icons'

const CreateContract: React.FC = () => {
  const queryClient = useQueryClient()
  const { groupId } = useParams()
  // trạng thái thi khi addmin ký
  const [showCancelModal, setShowCancelModal] = useState(false)
  // trạng thái xác nhận các tành viên trong group
  const [showRejectModal, setShowRejectModal] = useState(false)

  // lý do từ chối khi member từ chối hợp đồng
  const [rejectReason, setRejectReason] = useState('')
  const [openTerm, setOpenTerm] = useState<number | null>(null)

  // sign contract
  const signContractMutation = useMutation({
    mutationFn: (id: string) => groupApi.signContract(id),
    onSuccess: () => {
      console.log('Contract signed successfully')
      toast.success('Contract signed successfully')
    },
    onError: (error) => {
      console.log('Error signing contract', error.message)
      toast.error('An error occurred while signing the contract.')
      queryClient.invalidateQueries({ queryKey: ['contractData', groupId] })
    }
  })

  const approveMemberMutation = useMutation({
    mutationFn: ({
      contractId,
      reactionType,
      reason
    }: {
      contractId: string
      reactionType: 'DISAGREE' | 'AGREE'
      reason?: string
    }) => groupApi.approveMemberContract(contractId, { reactionType: reactionType, reason }),
    onSuccess: (_, variables) => {
      if (variables.reactionType === 'AGREE') toast.success('Contract confirmed!')
      else toast.success('Rejection reason sent!')
      queryClient.invalidateQueries({ queryKey: ['contractData', groupId] })
      setShowRejectModal(false)
      setShowCancelModal(false)
      setRejectReason('')
    }
  })

  const contractQuery = useQuery({
    queryKey: ['contractData', groupId],
    queryFn: () => groupApi.generateContract(groupId as string),
    enabled: !!groupId
  })
  // Hàm tách chuỗi terms thành mảng
  const parseTerms = (termsText: string) => {
    // Tách theo số thứ tự 1. 2. 3. ...
    const parts = termsText.split(/(?=\d+\.\s+[A-Z])/)
    return parts.filter((p) => p.trim())
  }

  console.log(contractQuery.data?.data)
  const dataContract = contractQuery.data?.data
  const idContract = dataContract?.contractId as string
  // const idContract
  const termsList = dataContract?.terms ? parseTerms(dataContract.terms) : []
  // checkAdmin mới có nút ký và hủy
  const isAdmin = dataContract?.owners?.some(
    (owner) => owner.userRole === 'ADMIN' && owner.userId === dataContract.userId
  )
  const isPendingMemberApproval = dataContract?.contract?.status === 'PENDING_MEMBER_APPROVAL'

  const onSubmit = () => {
    if (!groupId) {
      return
    }
    signContractMutation.mutate(groupId as string)
  }

  const onApproveMember = () => {
    if (!idContract) {
      return
    }
    approveMemberMutation.mutate({ contractId: idContract, reactionType: 'AGREE' })
  }

  const onRejectMember = () => {
    if (!idContract) {
      return
    }
    approveMemberMutation.mutate({ contractId: idContract, reactionType: 'DISAGREE', reason: rejectReason })
  }

  if (contractQuery.isLoading) {
    return <Skeleton />
  }

  return (
    <>
      {/* Cancel Modal */}
      {showCancelModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          onClick={() => setShowCancelModal(false)}
        >
          <div className='bg-white rounded-xl p-6 w-[500px]' onClick={(e) => e.stopPropagation()}>
            <h3 className='text-lg font-bold mb-4'>Reason for contract cancellation</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder='Nhập lý do...'
              rows={4}
              className='w-full border rounded-lg p-3 mb-4'
            />
            <div className='flex gap-3'>
              <button onClick={() => setShowCancelModal(false)} className='flex-1 border rounded-lg py-2'>
                Go back
              </button>
              <button
                onClick={onRejectMember}
                disabled={!rejectReason.trim()}
                className='flex-1 bg-red-500 text-white rounded-lg py-2 disabled:opacity-50'
              >
                Confirm rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/*  THÊM: Reject Modal (Member) */}
      {showRejectModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
          onClick={() => setShowRejectModal(false)}
        >
          <div className='bg-white rounded-2xl p-6 w-[500px] shadow-2xl' onClick={(e) => e.stopPropagation()}>
            <h3 className='text-xl font-bold mb-4 text-orange-600'> Lý do từ chối hợp đồng</h3>
            <p className='text-sm text-gray-600 mb-3'>
              Vui lòng nêu rõ lý do từ chối để hệ thống có thể xem xét và điều chỉnh hợp đồng.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder='Ví dụ: thời hạn hợp đồng chưa phù hợp, điều khoản chưa rõ ràng...'
              rows={4}
              className='w-full border-2 border-gray-200 rounded-xl p-3 mb-4 focus:border-orange-500 focus:outline-none'
            />
            {rejectReason.trim().length > 0 && rejectReason.trim().length < 10 && (
              <p className='text-red-500 text-sm mb-2'>Rejection reason must be at least 10 characters long.</p>
            )}
            <div className='flex gap-3'>
              <button
                onClick={() => setShowRejectModal(false)}
                className='flex-1 border-2 border-gray-300 rounded-xl py-2.5 font-semibold hover:bg-gray-50'
              >
                Quay lại
              </button>
              <button
                onClick={onRejectMember}
                // nếu form lý do từ chối chưa đủ 10 ký tự thì disable
                disabled={rejectReason.trim().length < 10 || approveMemberMutation.isPending}
                className='flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl py-2.5 font-semibold disabled:brightness-90 disabled:cursor-not-allowed hover:bg-orange-600'
              >
                {approveMemberMutation.isPending ? 'Sending...' : 'Send Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contract Display */}
      <div className='max-w-4xl mx-auto py-8 px-4'>
        <div className='bg-white rounded-2xl shadow-lg'>
          <div className='p-8'>
            {/* Header */}
            <div className='flex justify-between items-center mb-6 pb-6 border-b'>
              <div>
                <h2 className='text-xl font-bold'>EVShare</h2>
                <p className='text-sm text-gray-600'>Electric Vehicle Co-ownership System</p>
              </div>
              <div>
                <span className='bg-cyan-100 text-cyan-700 text-xs px-3 py-1 rounded-lg'>
                  Contract Status: {dataContract?.contract?.status}
                </span>
                <p className='text-xs text-gray-500 mt-3 ml-2'>Contract Number: {dataContract?.contractNumber}</p>
              </div>
            </div>

            {/* Title */}
            <h1 className='text-2xl font-bold mb-2'>SHARED VEHICLE OWNERSHIP CONTRACT</h1>
            <p className='text-sm text-gray-600 mb-6'>
              Based on the agreement among the Parties belonging to the Ownership Group{' '}
              <span className='font-bold text-cyan-600'>EVShare – {dataContract?.group.name}</span>
            </p>

            {/* Vehicle Info */}
            <div className='grid grid-cols-2 gap-6 mb-6 p-4 bg-cyan-50 rounded-xl'>
              <div>
                <h3 className='font-bold mb-2'>Vehicle information</h3>
                <div className='space-y-1 text-sm'>
                  <div className='flex justify-between'>
                    <span>License plate</span>
                    <span className='font-bold'>{dataContract?.vehicle?.plate}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Vehicle Identification Number</span>
                    <span className='font-bold text-xs'>{dataContract?.vehicle?.vin}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>brand</span>
                    <span className='font-bold text-xs'>{dataContract?.vehicle?.model}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className='font-bold mb-2'>Contract Duration</h3>
                <div className='space-y-1 text-sm'>
                  <div className='flex justify-between'>
                    <span>Effective Date</span>
                    <span className='font-bold'>{dataContract?.contract?.effectiveDate}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>End Date</span>
                    <span className='font-bold'>{dataContract?.contract?.endDate}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Term</span>
                    <span className='font-bold'>{dataContract?.contract?.termLabel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shareholders Table */}
            <div className='mb-6'>
              <h3 className='font-bold mb-3'>1. Shareholders</h3>
              <table className='w-full text-sm border rounded-xl overflow-hidden'>
                <thead className='bg-cyan-100'>
                  <tr>
                    <th className='border-b px-3 py-2 text-left'>#</th>
                    <th className='border-b px-3 py-2 text-left'>Full Name</th>
                    <th className='border-b px-3 py-2 text-left'>Contact</th>
                    <th className='border-b px-3 py-2 text-left'>Share (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataContract?.owners?.map((item, index) => (
                    <tr key={index}>
                      <td className='border-b px-3 py-2'>{index + 1}</td>
                      <td className='border-b px-3 py-2 font-bold'>
                        {item?.name}{' '}
                        <>
                          <span className='text-xs text-gray-500'>{item?.userRole}</span>
                        </>
                      </td>
                      <td className='border-b px-3 py-2 text-xs'>{item?.phone}</td>
                      <td className='border-b px-3 py-2 font-bold text-cyan-600'>{item?.share}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Fund Info */}
            <div className='mb-6 p-4 bg-cyan-50 rounded-xl'>
              <h3 className='font-bold mb-3'>2. Fund Info</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span>Vehicle Price</span>
                  <span className='font-bold'>{dataContract?.finance?.vehiclePrice?.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className='flex justify-between'>
                  <span>Deposit Amount</span>
                  <span className='font-bold'>{dataContract?.finance?.depositAmount?.toLocaleString('vi-VN')} đ</span>
                </div>

                <div className='flex justify-between'>
                  <span>Contribution Principle</span>
                  <span className='font-bold'>According to Ownership Percentage</span>
                </div>
              </div>
            </div>

            {/* Terms - Accordion */}
            {termsList.length > 0 && (
              <div className='mb-6'>
                <h3 className='font-bold mb-3'>3. Contract Terms</h3>
                <div className='space-y-2'>
                  {termsList.map((term, idx) => {
                    const lines = term.split('\n')
                    const title = lines[0]
                    const content = lines.slice(1).join('\n')

                    return (
                      <div key={idx} className='border rounded-lg overflow-hidden'>
                        <button
                          onClick={() => setOpenTerm(openTerm === idx ? null : idx)}
                          className='w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 text-left'
                        >
                          <span className='font-medium text-sm'>{title}</span>
                          <span className={`transition-transform ${openTerm === idx ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {openTerm === idx && (
                          <div className='p-4 bg-white text-sm text-gray-700 whitespace-pre-line'>{content}</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Admin Notice */}
            <div className='mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl'>
              <div className='flex items-start gap-3'>
                <div>
                  <h4 className='font-bold text-amber-900 mb-1'> Contract Signing Notice:</h4>
                  <p className='text-sm text-amber-800'>
                    <span className='font-bold'>Only the Group Leader (Admin Group)</span> {''}
                    has the right to sign and approve the contract. Other members can only view the contract and confirm
                    after the Admin Group has signed. If any member has questions or feels their rights are unclear,
                    leave a note in the comments. The system will review and adjust the contract if reasonable. Once all
                    members confirm and pay the deposit, the system will approve the contract. After approval, the group
                    can start using the system’s features.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {/*  nếu là admin và trạng thái là pending  */}
            {isAdmin && dataContract?.contract?.status === 'PENDING' && (
              <div className='flex gap-4 mt-6 pt-6 border-t'>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className='flex-1 px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600'
                >
                  Cancel Contract
                </button>
                <button
                  onClick={onSubmit}
                  disabled={signContractMutation.isPending}
                  className='flex-1 px-6 py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 disabled:opacity-50'
                >
                  {signContractMutation.isPending ? 'Processing...' : 'Sign Contract'}
                </button>
              </div>
            )}

            {/* sau khi admin kí thì trang thái Pending Member Approval  để cho co-owner xác nhận và đóng góp sửa hợp đồng */}
            {isPendingMemberApproval && !isAdmin && (
              <div className='flex gap-4 mt-6 pt-6 border-t'>
                <button
                  onClick={() => setShowRejectModal(true)}
                  disabled={approveMemberMutation.isPending}
                  className='flex-1 px-6 py-3 bg-orange text-white font-bold rounded-xl border-2 border-orange-500 hover:bg-orange-50 disabled:opacity-50 transition-colors'
                >
                  {approveMemberMutation.isPending ? ' Đang gửi...' : 'Từ chối'}
                </button>
                <button
                  onClick={onApproveMember}
                  disabled={approveMemberMutation.isPending}
                  className='flex-1 px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 disabled:opacity-50 transition-colors'
                >
                  {approveMemberMutation.isPending ? ' Đang xử lý...' : ' Xác nhận'}
                </button>
              </div>
            )}
            {dataContract?.contract?.status === 'SIGNED' && (
              <div className='inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl border border-yellow-200'>
                <ClockCircleOutlined className='text-yellow-500 text-lg' />
                <span className='font-medium'>Đang chờ hệ thống phê duyệt hợp đồng</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateContract
