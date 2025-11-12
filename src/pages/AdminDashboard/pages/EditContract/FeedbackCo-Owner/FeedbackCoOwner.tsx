import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, LeftOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import adminApi from '../../../../../apis/admin.api'

export default function FeedbackCoOwner() {
  const { contractId, groupName } = useParams()
  const navigate = useNavigate()
  const feedContractQuery = useQuery({
    queryKey: ['feedback-by-contract-id', contractId],
    queryFn: () => adminApi.getFeedbackByContractId(contractId ?? ''),
    enabled: !!contractId
  })
  console.log(feedContractQuery?.data?.data)
  // const feedbacks: FeedbackCoOwnerResponse = feedContractQuery?.data?.data

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
      {/* <MainContent feedBacks={feedbacks} /> */}

      {/* Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
        {/* Feedback List */}
        <div className='lg:col-span-3'>
          <div className='max-h-[calc(100vh-480px)] overflow-y-auto space-y-3 pr-2'>
            {/* Feedback Card 1 - Selected */}
            <div className='bg-white rounded-lg border-2 border-blue-500 shadow-md hover:shadow-lg transition-all cursor-pointer'>
              <div className='p-5'>
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-center gap-3 flex-1'>
                    <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold'>
                      N
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-semibold text-gray-900 text-base'>Nguyễn Minh Nhân</h3>
                      <p className='text-sm text-gray-500'>dainamnguyen3@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div className='mb-3'>
                  <p className='text-sm text-gray-700 leading-relaxed line-clamp-2'>lý do là gì thế shop</p>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-500'>11/11/2025, 22:50</span>
                </div>
              </div>
            </div>

            {/* Feedback Card 2 */}
            <div className='bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-gray-300'>
              <div className='p-5'>
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-center gap-3 flex-1'>
                    <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold'>
                      T
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-semibold text-gray-900 text-base'>Trần Văn B</h3>
                      <p className='text-sm text-gray-500'>tranvanb@email.com</p>
                    </div>
                  </div>
                </div>
                <div className='mb-3'>
                  <p className='text-sm text-gray-700 leading-relaxed line-clamp-2'>
                    Cần cập nhật lại điều khoản về bảo hiểm xe
                  </p>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-500'>10/11/2025, 15:30</span>
                </div>
              </div>
            </div>

            {/* Feedback Card 3 */}
            <div className='bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-gray-300'>
              <div className='p-5'>
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-center gap-3 flex-1'>
                    <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold'>
                      L
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-semibold text-gray-900 text-base'>Lê Thị C</h3>
                      <p className='text-sm text-gray-500'>lethic@email.com</p>
                    </div>
                  </div>
                </div>
                <div className='mb-3'>
                  <p className='text-sm text-gray-700 leading-relaxed line-clamp-2'>
                    Đề nghị thêm quy định về sử dụng xe vào cuối tuần
                  </p>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-500'>09/11/2025, 10:00</span>
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
                    <p className='font-semibold text-gray-900'>Nguyễn Minh Nhân</p>
                    <p className='text-sm text-gray-600'>dainamnguyen3@gmail.com</p>
                  </div>
                </div>
                <div className='flex items-center gap-2 text-xs text-gray-500'>
                  <ClockCircleOutlined />
                  <span>Gửi lúc: 11/11/2025, 22:50</span>
                </div>
              </div>

              {/* Content */}
              <div className='mb-6 pb-6 border-b border-gray-100'>
                <h3 className='font-semibold text-gray-900 mb-3'>Lý do phản hồi</h3>
                <p className='text-sm text-gray-700 leading-relaxed'>lý do là gì thế shop</p>
              </div>

              {/* Admin Note */}
              <div className='mb-6'>
                <label className='block text-sm font-semibold text-gray-900 mb-2'>Ghi chú của Admin</label>
                <textarea
                  rows={4}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none'
                  placeholder='Nhập ghi chú về cách xử lý feedback này...'
                />
              </div>

              {/* Action Buttons */}
              <div className='space-y-2.5'>
                <button className='w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium text-sm flex items-center justify-center gap-2'>
                  Sửa Hợp Đồng
                </button>
                <button className='w-full bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors font-medium text-sm flex items-center justify-center gap-2'>
                  <CheckCircleOutlined />
                  Chấp nhận Feedback
                </button>

                <button className='w-full border-2 border-red-200 text-red-600 py-2.5 px-4 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm flex items-center justify-center gap-2'>
                  <CloseCircleOutlined />
                  Từ chối Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
