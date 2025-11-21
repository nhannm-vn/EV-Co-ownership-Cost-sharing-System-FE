import { CloseCircleOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router'

export default function RejectedComponent() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(`/dashboard/viewGroups/${groupId}/check-in`)
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center p-6'>
      <div className='max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden'>
        <div className='bg-gradient-to-r from-red-500 to-rose-600 px-8 py-10 text-white text-center'>
          <CloseCircleOutlined className='text-7xl mb-4' />
          <h1 className='text-4xl font-bold mb-2'>Kiểm Tra Thất Bại</h1>
          <p className='text-red-100 text-lg'>Xe của bạn chưa đạt yêu cầu</p>
        </div>

        <div className='p-8 space-y-6'>
          <div className='bg-red-50 border-l-4 border-red-500 p-6 rounded-lg'>
            <div className='flex items-start gap-3'>
              <CloseCircleOutlined className='text-red-600 text-2xl flex-shrink-0 mt-1' />
              <div>
                <p className='font-bold text-red-800 text-lg mb-2'>Xe chưa đạt yêu cầu kiểm tra</p>
                <p className='text-red-700'>Vui lòng liên hệ với kỹ thuật viên để được hỗ trợ khắc phục các vấn đề.</p>
              </div>
            </div>
          </div>
          <div className='flex gap-4'>
            <button
              onClick={handleBack}
              className='flex-1 bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all'
            >
              Về trang kiểm tra
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
