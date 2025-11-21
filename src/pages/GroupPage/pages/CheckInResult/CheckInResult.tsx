import { CheckCircleOutlined, CloseCircleOutlined, HomeOutlined, ScanOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import path from '../../../../constants/path'

const CheckInResult: React.FC = () => {
  const navigate = useNavigate()
  const { status, brand, licensePlate, startTime, endTime } = useParams()

  const handleRetry = () => {
    navigate(-1)
  }

  const handleGoHome = () => {
    navigate(path.dashBoard)
  }

  return (
    <>
      {status === 'fail' ? (
        <div className='max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center'>
          {/* Error Icon */}
          <div className='flex justify-center mb-6'>
            <div className='w-24 h-24 bg-red-100 rounded-full flex items-center justify-center'>
              <CloseCircleOutlined className='text-6xl text-red-500' />
            </div>
          </div>

          {/* Error Title */}
          <h1 className='text-2xl font-bold text-gray-800 mb-3'>Check-in Thất Bại</h1>

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
            <h3 className='font-semibold text-gray-800 mb-3 text-sm'>Vui lòng thử:</h3>
            <ul className='space-y-2 text-sm text-gray-600'>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Đảm bảo mã QR không bị mờ hoặc hư hỏng</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Kiểm tra lại mã QR có đúng định dạng và không</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Yêu cầu mã QR mới từ quản trị viên</span>
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
              Quét Lại Mã QR
            </Button>

            <Button size='large' icon={<HomeOutlined />} onClick={handleGoHome} className='w-full'>
              Về Trang Chủ
            </Button>
          </div>
        </div>
      ) : (
        <div className='bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 w-full max-w-lg text-center animate-fade-in'>
          <div className='flex justify-center mb-6'>
            <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-md'>
              <CheckCircleOutlined className='text-6xl text-green-500' />
            </div>
          </div>

          <h1 className='text-3xl font-bold text-green-600 mb-2'>Check-in thành công!</h1>
          <p className='text-gray-600 mb-6'>Xe của bạn đã sẵn sàng sử dụng.</p>

          {/* Thông tin chuyến đi */}
          <Card
            title={<span className='font-semibold text-gray-700'>Thông tin chuyến đi</span>}
            className='rounded-2xl shadow-md text-left mb-4 border-none bg-white/90 backdrop-blur-sm'
          >
            <p>
              <b>Trạng thái:</b> <span className='text-green-600'>Success</span>
            </p>
            <p>
              <b>
                Thời gian: {new Date(startTime as string).toLocaleTimeString('vi-VN')}
                {'    '} - {new Date(endTime as string).toLocaleTimeString('vi-VN')}
              </b>
            </p>
          </Card>

          {/* Thông tin xe */}
          <Card
            title={<span className='font-semibold text-gray-700'>Thông tin xe</span>}
            className='rounded-2xl shadow-md text-left border-none bg-white/90 backdrop-blur-sm mb-6'
          >
            <p>
              <b>Biển số:</b> {licensePlate}
            </p>
            <p>
              <b>Hãng:</b> {brand}
            </p>
          </Card>

          {/* Nút điều hướng */}
          <div className='flex flex-col sm:flex-row gap-3'>
            <Button
              type='primary'
              size='large'
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              className='flex-1 bg-green-500 hover:bg-green-600 border-none text-white font-semibold rounded-xl shadow'
            >
              Về Trang Chủ
            </Button>
            <Button
              size='large'
              icon={<ScanOutlined />}
              onClick={handleRetry}
              className='flex-1 border-green-400 text-green-600 hover:bg-green-50 rounded-xl'
            >
              Quét Lại
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default CheckInResult
