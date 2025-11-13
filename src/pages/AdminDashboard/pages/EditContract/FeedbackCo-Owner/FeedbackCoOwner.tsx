import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, LeftOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import adminApi from '../../../../../apis/admin.api'
import type { FeedbackCoOwnerResponse } from '../../../../../types/api/admin.type'
import MainContent from './components/MainContent'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function FeedbackCoOwner() {
  const queryClient = useQueryClient()
  const { contractId, groupName, groupId } = useParams()
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
    if (!isProcessed) toast.error('cần xử lý  hợp đồng trước khi chấp nhận feedback')
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

  const handleRejectFeedback = (feedbackId: string, reason: string) => {
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
  const feedbacks: FeedbackCoOwnerResponse = feedContractQuery?.data?.data
  const allFeedbacks = feedbacks?.feedbacks || []

  const handleEditContract = ({ contractId, groupId }: { contractId: string; groupId: string }) => {
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
      <MainContent feedBacks={feedbacks} />
      {/* Content Grid */}
      {allFeedbacks.map((feedback) => (
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6' key={feedback?.userId}>
          {/* Feedback List */}
          <div className='lg:col-span-3'>
            <div
              className='max-h-[calc(100vh-480px)] overflow-y-auto space-y-3 pr-2 scroll-smooth
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-track]:rounded-lg
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:rounded-lg
            [&::-webkit-scrollbar-thumb]:hover:bg-gray-400'
            >
              <div className='bg-white rounded-lg border-2 border-blue-500 shadow-md hover:shadow-lg transition-all cursor-pointer'>
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

                      {feedback?.lastAdminAction === null && (
                        <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200'>
                          <ClockCircleOutlined className='text-sm' />
                          Chờ xử lý
                        </span>
                      )}
                      {feedback?.lastAdminAction === 'APPROVE' && (
                        <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200'>
                          <CheckCircleOutlined className='text-sm' />
                          Đã chấp nhận
                        </span>
                      )}
                      {feedback?.lastAdminAction === 'REJECT' && (
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
                    <span className='text-gray-500'>{new Date(feedback?.submittedAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Detail */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg border border-gray-200 shadow-sm sticky top-24'>
              <div className='p-6 border-b border-gray-200'>
                <h2 className='text-lg font-bold text-gray-900'>Chi tiết Feedback</h2>
              </div>

              <div className='p-6'>
                {/* User Info */}
                <div className='mb-6'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                      N
                    </div>
                    <div>
                      <p className='font-semibold text-gray-900'>{feedback?.fullName}</p>
                      <p className='text-sm text-gray-600'>{feedback?.email}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-gray-500'>
                    <ClockCircleOutlined />
                    <span>Gửi lúc: {new Date(feedback?.submittedAt).toLocaleString('vi-VN')}</span>
                  </div>
                </div>

                {/* Content */}
                <div className='mb-6 pb-6 border-b border-gray-100'>
                  <h3 className='font-semibold text-gray-900 mb-3'>Lý do phản hồi</h3>
                  <p className='text-sm text-gray-700 leading-relaxed'>{feedback?.reason}</p>
                </div>

                {/* Action Buttons */}
                <div className='space-y-2.5'>
                  {feedback?.lastAdminAction === null ? (
                    <>
                      <button
                        className='w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium text-sm flex items-center justify-center gap-2'
                        onClick={() =>
                          handleEditContract({
                            contractId: feedbacks?.contractId.toString(),
                            groupId: groupId as string
                          })
                        }
                      >
                        <CheckCircleOutlined />
                        Sửa Hợp Đồng
                      </button>

                      <button
                        className='w-full bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors font-medium text-sm flex items-center justify-center gap-2'
                        onClick={() =>
                          handleAcceptFeedback(feedback?.feedbackId.toString(), feedback?.isProcessed, adminNote)
                        }
                      >
                        <CheckCircleOutlined />
                        Chấp nhận Feedback
                      </button>

                      <button
                        className='w-full border-2 border-red-200 text-red-600 py-2.5 px-4 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm flex items-center justify-center gap-2'
                        onClick={() => handleRejectFeedback(feedback?.feedbackId.toString(), adminNote)}
                      >
                        <CloseCircleOutlined />
                        Từ chối Feedback
                      </button>
                    </>
                  ) : (
                    <div className='mb-3'>
                      <h3 className='font-semibold text-gray-900 mb-1'>Ghi chú của Admin</h3>
                      <div className='text-sm text-gray-700 leading-relaxed'>
                        {feedback?.reason.split('\n').map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
