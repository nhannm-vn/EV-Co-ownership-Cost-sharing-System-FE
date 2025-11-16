import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, LeftOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import adminApi from '../../../../../apis/admin.api'
import type { FeedbackItem } from '../../../../../types/api/admin.type'
import MainContent from './components/MainContent'

export default function FeedbackCoOwner() {
  const queryClient = useQueryClient()
  const { contractId, groupName, groupId } = useParams()

  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null)
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null)
  const [adminNote, setAdminNote] = useState('')
  const navigate = useNavigate()

  // chấp nhận feedback
  const accepctFeedback = useMutation({
    mutationFn: ({ feedbackId, adminNote }: { feedbackId: string; adminNote: string }) =>
      adminApi.acceptFeedback({ feedbackId, adminNote })
  })

  const rejectFeedback = useMutation({
    mutationFn: ({ feedbackId, adminNote }: { feedbackId: string; adminNote: string }) =>
      adminApi.rejectFeedback({ feedbackId, adminNote })
  })

  const handleAcceptFeedback = (feedbackId: string, isProcessed: boolean, adminNote: string) => {
    if (!isProcessed) {
      toast.error('cần xử lý hợp đồng trước khi chấp nhận feedback')
      return
    }
    if (adminNote.trim().length === 0) {
      toast.error('vui lòng nhập thông tin hợp đồng sửa đổi trước khi chấp nhận feedback')
      return
    }
    accepctFeedback.mutate(
      { feedbackId, adminNote },
      {
        onSuccess: () => {
          toast.success('đã chấp nhận feedback thành công')
          setAdminNote('')
          queryClient.invalidateQueries({ queryKey: ['feedback-by-contract-id', contractId] })
        }
      }
    )
  }

  const handleRejectFeedback = ({ feedbackId, reason }: { feedbackId: string; reason: string }) => {
    if (reason.trim().length === 0) {
      toast.error('vui lòng nhập lý do trước khi từ chối feedback')
      return
    }
    rejectFeedback.mutate(
      { feedbackId, adminNote: reason },
      {
        onSuccess: () => {
          toast.success('đã từ chối feedback thành công')
          setAdminNote('')
          queryClient.invalidateQueries({ queryKey: ['feedback-by-contract-id', contractId] })
        }
      }
    )
  }

  const feedContractQuery = useQuery({
    queryKey: ['feedback-by-contract-id', contractId],
    queryFn: () => adminApi.getFeedbackByContractId(contractId ?? ''),
    enabled: !!contractId
  })

  console.log(feedContractQuery?.data)

  const feedbacks = feedContractQuery?.data?.data

  const groupedFeedbacks = useMemo(() => {
    const allFeedbacks = feedbacks?.feedbacks || []
    const grouped: Record<string, FeedbackItem[]> = {}

    allFeedbacks.forEach((feedback) => {
      if (!grouped[feedback.email]) {
        grouped[feedback.email] = []
      }
      grouped[feedback.email].push(feedback)
    })

    return grouped
  }, [feedbacks?.feedbacks])

  const users = useMemo(() => {
    return Object.keys(groupedFeedbacks).map((email) => {
      const userFeedbacks = groupedFeedbacks[email]
      const firstFeedback = userFeedbacks[0]
      return {
        email,
        fullName: firstFeedback.fullName,
        feedbackCount: userFeedbacks.length,
        groupRole: userFeedbacks[0].groupRole,
        pendingCount: userFeedbacks.filter((f) => f.status === 'PENDING' && f.reactionType === 'DISAGREE').length,
        approvedCount: userFeedbacks.filter((f) => f.status === 'APPROVED' && f.reactionType === 'DISAGREE').length,
        rejectedCount: userFeedbacks.filter((f) => f.status === 'REJECTED' && f.reactionType === 'DISAGREE').length,
        approveAgree: userFeedbacks.filter((f) => f.reactionType === 'AGREE').length
      }
    })
  }, [groupedFeedbacks])

  const selectedUserFeedbacks = useMemo(() => {
    if (!selectedUserEmail) return []
    return groupedFeedbacks[selectedUserEmail] || []
  }, [selectedUserEmail, groupedFeedbacks])

  const handleUserClick = (email: string) => {
    setSelectedUserEmail(email)
    setSelectedFeedback(null)
    setAdminNote('')
  }

  const handleFeedbackClick = (feedback: FeedbackItem) => {
    setSelectedFeedback(feedback)
    setAdminNote('')
  }

  const handleEditContract = ({ contractId, groupId }: { contractId: string; groupId: string }) => {
    if (!feedbacks?.contractId || !groupId) return
    navigate(`/manager/editContractDetail/${contractId}/${groupId}`)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200 sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors'
            >
              <LeftOutlined className='text-lg' />
              <span className='font-medium'>Quay lại</span>
            </button>
            <div className='border-l border-gray-300 h-6'></div>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Quản Lý Feedback Hợp Đồng - {groupName}</h1>
              <p className='text-sm text-gray-600'>Xem và xử lý các phản hồi từ co-owner về hợp đồng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {feedbacks && <MainContent feedBacks={feedbacks} />}

      {/* Content Grid */}
      <div className='max-w-7xl mx-auto px-6 py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
          {/* Feedback List - Two Level: Users -> Feedbacks */}
          <div className='lg:col-span-3'>
            <div className='bg-white rounded-lg border border-gray-200 shadow-sm p-4'>
              {!selectedUserEmail ? (
                <>
                  {/* User List */}
                  <h2 className='text-lg font-bold text-gray-900 mb-4'>Danh sách người dùng</h2>
                  <div
                    className='max-h-[calc(100vh-380px)] overflow-y-auto space-y-3 pr-2 scroll-smooth
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-track]:rounded-lg
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    [&::-webkit-scrollbar-thumb]:rounded-lg
                    [&::-webkit-scrollbar-thumb]:hover:bg-gray-400'
                  >
                    {users.map((user) => (
                      <div
                        key={user.email}
                        onClick={() => handleUserClick(user.email)}
                        className='bg-white rounded-lg border-2 border-gray-200 hover:border-blue-300 shadow-md hover:shadow-lg transition-all cursor-pointer'
                      >
                        <div className='p-5'>
                          <div className='flex items-center gap-3 mb-3'>
                            <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md'>
                              {user.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div className='flex-1'>
                              <h3 className='font-semibold text-gray-900 text-base'>{user.fullName}</h3>
                              <p className='text-sm text-gray-500'>{user.email}</p>
                              <p className='inline-flex items-center px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full border border-purple-200 mt-1'>
                                {user.groupRole}
                              </p>
                            </div>
                            <div className='flex items-center gap-2'>
                              <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200'>
                                {user.feedbackCount} feedback
                              </span>
                            </div>
                          </div>
                          <div className='flex items-center gap-2 text-xs'>
                            {user.approveAgree > 0 && (
                              <span className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200'>
                                <ClockCircleOutlined />
                                {user.approveAgree} Đã xác nhận hợp đồng
                              </span>
                            )}
                            {user.pendingCount > 0 && (
                              <span className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200'>
                                <ClockCircleOutlined />
                                {user.pendingCount} chờ xử lý
                              </span>
                            )}
                            {user.approvedCount > 0 && (
                              <span className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800 border border-green-200'>
                                <CheckCircleOutlined />
                                {user.approvedCount} đã chấp nhận
                              </span>
                            )}
                            {user.rejectedCount > 0 && (
                              <span className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-800 border border-red-200'>
                                <CloseCircleOutlined />
                                {user.rejectedCount} đã từ chối
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* User's Feedbacks */}
                  <div className='flex items-center gap-3 mb-4'>
                    <button
                      onClick={() => setSelectedUserEmail(null)}
                      className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
                    >
                      <LeftOutlined />
                      Quay lại
                    </button>
                    <h2 className='text-lg font-bold text-gray-900'>
                      Feedback của {selectedUserFeedbacks[0]?.fullName}
                    </h2>
                  </div>
                  <div
                    className='max-h-[calc(100vh-380px)] overflow-y-auto space-y-3 pr-2 scroll-smooth
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-track]:rounded-lg
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    [&::-webkit-scrollbar-thumb]:rounded-lg
                    [&::-webkit-scrollbar-thumb]:hover:bg-gray-400'
                  >
                    {selectedUserFeedbacks.map((feedback, index) => (
                      <div
                        key={feedback?.feedbackId + '-' + index}
                        onClick={() => handleFeedbackClick(feedback)}
                        className={`bg-white rounded-lg border-2 shadow-md hover:shadow-lg transition-all cursor-pointer ${
                          selectedFeedback?.feedbackId === feedback?.feedbackId
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className='p-5'>
                          <div className='flex items-start justify-between mb-3'>
                            <div className='flex items-center gap-3 flex-1'>
                              <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold'>
                                {feedback?.fullName.charAt(0).toUpperCase()}
                              </div>

                              <div className='flex-1'>
                                <h3 className='font-semibold text-gray-900 text-base'>{feedback?.fullName}</h3>
                                <p className='text-sm text-gray-500'>{feedback?.email}</p>
                              </div>

                              {feedback?.reactionType === 'AGREE' && (
                                <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200'>
                                  <ClockCircleOutlined className='text-sm' />
                                  Đã xác nhận kí hợp đồng
                                </span>
                              )}

                              {feedback?.status === 'PENDING' && feedback?.reactionType === 'DISAGREE' && (
                                <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200'>
                                  <ClockCircleOutlined className='text-sm' />
                                  Chờ xử lý
                                </span>
                              )}
                              {feedback?.status === 'APPROVED' && feedback?.reactionType === 'DISAGREE' && (
                                <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200'>
                                  <CheckCircleOutlined className='text-sm' />
                                  Đã chấp nhận
                                </span>
                              )}
                              {feedback?.status === 'REJECTED' && feedback?.reactionType === 'DISAGREE' && (
                                <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200'>
                                  <CloseCircleOutlined className='text-sm' />
                                  Đã từ chối
                                </span>
                              )}
                            </div>
                          </div>
                          <div className='mb-3'>
                            <p className='text-sm text-gray-700 leading-relaxed line-clamp-2'>{feedback?.reason}</p>
                          </div>
                          <div className='flex items-center justify-between text-sm'>
                            <span className='text-gray-500'>
                              {new Date(feedback?.submittedAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Feedback Detail - Read Only */}
          <div className='lg:col-span-2'>
            {selectedFeedback ? (
              <div className='bg-white rounded-lg border border-gray-200 shadow-sm sticky top-24'>
                <div className='p-6 border-b border-gray-200'>
                  <h2 className='text-lg font-bold text-gray-900'>Chi tiết Feedback</h2>
                </div>

                <div className='p-6'>
                  {/* User Info */}
                  <div className='mb-6'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                        {selectedFeedback?.fullName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className='font-semibold text-gray-900'>{selectedFeedback?.fullName}</p>
                        <p className='text-sm text-gray-600'>{selectedFeedback?.email}</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 text-xs text-gray-500'>
                      <ClockCircleOutlined />
                      <span>Gửi lúc: {new Date(selectedFeedback?.submittedAt).toLocaleString('vi-VN')}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='mb-6 pb-6 border-b border-gray-100'>
                    <h3 className='font-semibold text-gray-900 mb-3'>Lý do phản hồi</h3>
                    <p className='text-sm text-gray-700 leading-relaxed'>{selectedFeedback?.reason}</p>
                  </div>

                  {/* Admin Note - Read Only */}
                  <div className='mb-6'>
                    <label className='block text-sm font-semibold text-gray-900 mb-2'>Ghi chú của Admin</label>
                    <textarea
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      rows={4}
                      disabled={selectedFeedback?.status !== 'PENDING'}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed'
                      placeholder={
                        selectedFeedback?.status === 'PENDING'
                          ? 'Feedback này đã được xử lý'
                          : 'Nhập ghi chú về cách xử lý feedback này...'
                      }
                    />
                  </div>

                  {/* Action Buttons or Admin Note Display */}
                  <div className='space-y-2.5'>
                    {selectedFeedback?.status === 'PENDING' && selectedFeedback?.reactionType === 'DISAGREE' ? (
                      <>
                        <button
                          className='w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium text-sm flex items-center justify-center gap-2'
                          onClick={() =>
                            handleEditContract({
                              contractId: feedbacks?.contractId.toString() as string,
                              groupId: groupId as string
                            })
                          }
                        >
                          <CheckCircleOutlined />
                          Sửa Hợp Đồng
                        </button>

                        <button
                          className='w-full bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors font-medium text-sm flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed'
                          onClick={() =>
                            handleAcceptFeedback(
                              selectedFeedback?.feedbackId.toString(),
                              selectedFeedback?.isProcessed,
                              adminNote
                            )
                          }
                          disabled={accepctFeedback.isPending}
                        >
                          <CheckCircleOutlined />
                          {accepctFeedback.isPending ? 'Đang xử lý...' : 'Chấp nhận Feedback'}
                        </button>

                        <button
                          className='w-full border-2 border-red-200 text-red-600 py-2.5 px-4 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm flex items-center justify-center gap-2 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed'
                          onClick={() =>
                            handleRejectFeedback({
                              feedbackId: selectedFeedback?.feedbackId.toString(),
                              reason: adminNote
                            })
                          }
                          disabled={rejectFeedback.isPending}
                        >
                          <CloseCircleOutlined />
                          {rejectFeedback.isPending ? 'Đang xử lý...' : 'Từ chối Feedback'}
                        </button>
                      </>
                    ) : (
                      <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                        <h3 className='font-semibold text-gray-900 mb-2 flex items-center gap-2'>
                          {selectedFeedback?.status === 'APPROVED' && selectedFeedback?.reactionType === 'DISAGREE' && (
                            <>
                              <CheckCircleOutlined className='text-green-600' />
                              <span className='text-green-700'>Đã chấp nhận</span>
                            </>
                          )}

                          {selectedFeedback?.status === 'REJECTED' && selectedFeedback?.reactionType === 'DISAGREE' && (
                            <>
                              <CloseCircleOutlined className='text-red-600' />
                              <span className='text-red-700'>Đã từ chối</span>
                            </>
                          )}
                        </h3>
                        <div className='text-sm text-gray-700 leading-relaxed bg-white p-3 rounded border border-gray-200'>
                          {selectedFeedback?.adminNote || 'Không có ghi chú'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className='bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center'>
                <p className='text-gray-600'>bấm vào feedback nào để xem chi tiết</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
