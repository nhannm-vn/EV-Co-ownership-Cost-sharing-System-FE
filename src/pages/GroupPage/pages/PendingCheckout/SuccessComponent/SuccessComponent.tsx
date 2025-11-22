import { CheckCircleOutlined, ToolOutlined } from '@ant-design/icons'

interface SuccessComponentProps {
  bookingId?: string
  licensePlate?: string
  technicianName?: string
  notes?: string
  onComplete?: () => void
}

export default function SuccessComponent({
  bookingId,
  licensePlate,
  technicianName,
  notes,
  onComplete
}: SuccessComponentProps) {
  return (
    <>
      <div className='bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-10 text-white text-center'>
        <CheckCircleOutlined className='text-7xl mb-4 animate-bounce' />
        <h1 className='text-4xl font-bold mb-2'>Checking success!</h1>
        <p className='text-green-100 text-lg'>Your vehicle has passed the inspection and is ready for use</p>
      </div>

      <div className='p-8 space-y-6'>
        {/* Thông tin kiểm tra */}
        <div className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200'>
          <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
            <ToolOutlined className='text-blue-600' />
            Inspection Information
          </h2>
          <div className='space-y-3'>
            {bookingId && (
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>Booking ID:</span>
                <span className='font-bold text-gray-900'>#{bookingId}</span>
              </div>
            )}
            {licensePlate && (
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>License Plate:</span>
                <span className='font-semibold text-gray-900'>{licensePlate}</span>
              </div>
            )}
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Result:</span>
              <span className='font-bold text-green-600 flex items-center gap-2'>
                <CheckCircleOutlined />
                Passed
              </span>
            </div>
            {technicianName && (
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>Technician:</span>
                <span className='font-semibold text-gray-900'>{technicianName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Success Message */}
        <div className='bg-green-50 border-l-4 border-green-500 p-6 rounded-lg'>
          <div className='flex items-start gap-3'>
            <CheckCircleOutlined className='text-green-600 text-2xl flex-shrink-0 mt-1' />
            <div className='w-full'>
              <p className='font-bold text-green-800 text-lg mb-2'>Xe đạt yêu cầu kiểm tra</p>
              <p className='text-green-700'>
                Your vehicle has been thoroughly inspected and meets all safety standards. You can continue to use your
                vehicle with confidence.
              </p>
              {notes && (
                <div className='mt-3 pt-3 border-t border-green-200'>
                  <p className='text-sm text-green-700'>
                    <span className='font-semibold'>Notes:</span> {notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className='pt-4'>
          <button
            onClick={onComplete}
            className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl'
          >
            Complete
          </button>
        </div>

        {/* Footer Note */}
        <div className='text-center text-sm text-gray-500 pt-4 border-t border-gray-200'>
          <p>Thank you for using our service</p>
        </div>
      </div>
    </>
  )
}
