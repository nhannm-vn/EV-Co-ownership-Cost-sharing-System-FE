import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons'
import type { FeedbackCoOwnerResponse } from '../../../../../../../types/api/admin.type'

export default function MainContent({ feedBacks }: { feedBacks: FeedbackCoOwnerResponse }) {
  return (
    <div className='max-w-7xl mx-auto p-6'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-5'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Tổng thành viên</p>
              <p className='text-2xl font-bold text-gray-900 mt-1'>{feedBacks?.totalMembers}</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
              <UserOutlined className='text-2xl text-blue-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-5'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-600'>Tổng feedback</p>
              <p className='text-2xl font-bold text-gray-900 mt-1'>{feedBacks?.totalFeedbacks}</p>
            </div>
            <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center'>
              <ExclamationCircleOutlined className='text-2xl text-purple-600' />
            </div>
          </div>
        </div>

        <div>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-5'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Đã chấp nhận</p>
                <p className='text-2xl font-bold text-green-600 mt-1'>{feedBacks?.approvedFeedbacksCount}</p>
              </div>
              <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                <CheckCircleOutlined className='text-2xl text-green-600' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-5'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Đã từ chối</p>
                <p className='text-2xl font-bold text-red-600 mt-1'>{feedBacks?.rejectedFeedbacksCount}</p>
              </div>
              <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center'>
                <CloseCircleOutlined className='text-2xl text-red-600' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-6 flex items-center gap-2'>
        <span className='text-sm font-medium text-gray-600'>Trạng thái hợp đồng:</span>
        <span className='px-3 py-1.5 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800'>
          {feedBacks?.contractStatus}
        </span>
      </div>
    </div>
  )
}
