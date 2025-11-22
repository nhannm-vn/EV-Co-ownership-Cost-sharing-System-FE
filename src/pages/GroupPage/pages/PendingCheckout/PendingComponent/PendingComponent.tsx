import { CheckCircleOutlined, ClockCircleOutlined, ToolOutlined, WarningOutlined } from '@ant-design/icons'

export default function PendingComponent() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6'>
      <div className='max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden'>
        <div className='bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white text-center'>
          <ClockCircleOutlined className='text-6xl mb-4 animate-pulse' />
          <h1 className='text-3xl font-bold mb-2'>waiting check vehicle</h1>
          <p className='text-blue-100 text-lg'>Technician will check your vehicle</p>
        </div>

        <div className='p-8 space-y-6'>
          <div className='bg-blue-50 rounded-2xl p-6 border border-blue-200'>
            <h3 className='text-lg font-bold text-gray-800 mb-4'>Checking Process</h3>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex flex-col items-center flex-1'>
                <div className='w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-2'>
                  <CheckCircleOutlined className='text-white text-xl' />
                </div>
                <span className='text-xs text-gray-600 text-center'>checkout Vehicle</span>
              </div>

              <div className='flex-1 h-1 bg-blue-300 mx-2'></div>

              <div className='flex flex-col items-center flex-1'>
                <div className='w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2 animate-pulse'>
                  <ClockCircleOutlined className='text-white text-xl' />
                </div>
                <span className='text-xs text-gray-600 text-center font-semibold'>waiting</span>
              </div>

              <div className='flex-1 h-1 bg-gray-300 mx-2'></div>

              <div className='flex flex-col items-center flex-1'>
                <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-2'>
                  <ToolOutlined className='text-white text-xl' />
                </div>
                <span className='text-xs text-gray-600 text-center'>Checking</span>
              </div>

              <div className='flex-1 h-1 bg-gray-300 mx-2'></div>

              <div className='flex flex-col items-center flex-1'>
                <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-2'>
                  <CheckCircleOutlined className='text-white text-xl' />
                </div>
                <span className='text-xs text-gray-600 text-center'>Completed</span>
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
                <p className='font-semibold text-yellow-800 mb-1'>Note</p>
                <p className='text-sm text-yellow-700'>
                  Please wait for the technician to check the vehicle. You will be notified when the inspection is
                  complete.
                </p>
              </div>
            </div>
          </div>

          <div className='text-center py-4'>
            <p className='text-gray-600'>Thank you for using our service!</p>
            <p className='text-gray-500 text-sm mt-2'>
              Estimated inspection time: <span className='font-semibold text-gray-700'>15-30 minutes</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
