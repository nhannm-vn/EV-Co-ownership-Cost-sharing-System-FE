import { useNavigate } from 'react-router'
import path from '../../../../constants/path'
import { CloseCircleOutlined, HomeOutlined, ScanOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default function CheckQRFail() {
  const navigate = useNavigate()
  const handleRetry = () => {
    navigate(-1)
  }

  const handleGoHome = () => {
    navigate(path.dashBoard)
  }
  return (
    <div>
      {' '}
      <div className='max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center'>
        {/* Error Icon */}
        <div className='flex justify-center mb-6'>
          <div className='w-24 h-24 bg-red-100 rounded-full flex items-center justify-center'>
            <CloseCircleOutlined className='text-6xl text-red-500' />
          </div>
        </div>

        {/* Error Title */}
        <h1 className='text-2xl font-bold text-gray-800 mb-3'>Check-QR Failed</h1>

        {/* Error Message */}
        <p className='text-gray-600 mb-2'>Invalid QR code format</p>

        {/* Error Status */}
        <div className='inline-block bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-6'>
          <span className='text-sm text-red-700'>
            Mã lỗi: <span className='font-semibold'>FAIL</span>
          </span>
        </div>

        {/* Suggested Solutions */}
        <div className='bg-gray-50 rounded-lg p-4 mb-6 text-left'>
          <h3 className='font-semibold text-gray-800 mb-3 text-sm'>Please try:</h3>
          <ul className='space-y-2 text-sm text-gray-600'>
            <li className='flex items-start'>
              <span className='mr-2'>•</span>
              <span>Ensure the QR code is not blurry or damaged</span>
            </li>
            <li className='flex items-start'>
              <span className='mr-2'>•</span>
              <span>Check if the QR code is in the correct format</span>
            </li>
            <li className='flex items-start'>
              <span className='mr-2'>•</span>
              <span>Request a new QR code from the administrator</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col gap-3'>
          <Button
            type='primary'
            size='large'
            icon={<ScanOutlined />}
            onClick={handleRetry}
            className='w-full bg-blue-600 hover:bg-blue-700'
          >
            Scan again QR Code
          </Button>

          <Button size='large' icon={<HomeOutlined />} onClick={handleGoHome} className='w-full'>
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
