import { CheckCircleOutlined, ClockCircleOutlined, ToolOutlined, WarningOutlined } from '@ant-design/icons'

export default function PendingComponent() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6'>
      <div className='max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden'>
        <div className='bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white text-center'>
          <ClockCircleOutlined className='text-6xl mb-4 animate-pulse' />
          <h1 className='text-3xl font-bold mb-2'>Đang Chờ Kiểm Tra Xe</h1>
          <p className='text-blue-100 text-lg'>Kỹ thuật viên sẽ kiểm tra xe của bạn</p>
        </div>

        <div className='p-8 space-y-6'>
          <div className='bg-blue-50 rounded-2xl p-6 border border-blue-200'>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>Tiến Trình Kiểm Tra</h3>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex flex-col items-center flex-1'>
                <div className='w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-2'>
                  <CheckCircleOutlined className='text-white text-xl' />
                </div>
                <span className='text-xs text-gray-600 text-center'>Trả xe</span>
              </div>

              <div className='flex-1 h-1 bg-blue-300 mx-2'></div>

              <div className='flex flex-col items-center flex-1'>
                <div className='w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2 animate-pulse'>
                  <ClockCircleOutlined className='text-white text-xl' />
                </div>
                <span className='text-xs text-gray-600 text-center font-semibold'>Đang chờ</span>
              </div>

              <div className='flex-1 h-1 bg-gray-300 mx-2'></div>

              <div className='flex flex-col items-center flex-1'>
                <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-2'>
                  <ToolOutlined className='text-white text-xl' />
                </div>
                <span className='text-xs text-gray-600 text-center'>Kiểm tra</span>
              </div>

              <div className='flex-1 h-1 bg-gray-300 mx-2'></div>

              <div className='flex flex-col items-center flex-1'>
                <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-2'>
                  <CheckCircleOutlined className='text-white text-xl' />
                </div>
                <span className='text-xs text-gray-600 text-center'>Hoàn thành</span>
              </div>
            </div>

            <div className='w-full bg-gray-200 rounded-full h-3 overflow-hidden'>
              <div className='bg-gradient-to-r from-green-500 via-blue-500 to-blue-500 h-full rounded-full animate-pulse w-1/2'></div>
            </div>
          </div>

          <div className='bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg'>
            <div className='flex items-start gap-3'>
              <WarningOutlined className='text-yellow-600 text-xl flex-shrink-0 mt-1' />
              <div>
                <p className='font-semibold text-yellow-800 mb-1'>Lưu ý</p>
                <p className='text-sm text-yellow-700'>
                  Vui lòng chờ kỹ thuật viên kiểm tra xe. Bạn sẽ nhận được thông báo khi quá trình kiểm tra hoàn tất.
                </p>
              </div>
            </div>
          </div>

          <div className='text-center py-4'>
            <p className='text-gray-600'>Cảm ơn bạn đã sử dụng dịch vụ!</p>
            <p className='text-gray-500 text-sm mt-2'>
              Thời gian kiểm tra dự kiến: <span className='font-semibold text-gray-700'>15-30 phút</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
