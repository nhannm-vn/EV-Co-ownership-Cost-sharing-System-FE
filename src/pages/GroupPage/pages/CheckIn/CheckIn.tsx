import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  ArrowLeftOutlined,
  QrcodeOutlined,
  CopyOutlined,
  PictureOutlined,
  CameraOutlined,
  StopOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'

// ===== TYPE DEFINITIONS =====
type MessageType = 'success' | 'info' | 'warning'

interface CameraError extends Error {
  name: string
  message: string
}

// ===== MAIN COMPONENT =====
export default function CheckIn() {
  // ===== STATE =====
  const [isScanning, setIsScanning] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<MessageType>('info')
  const [currentTime, setCurrentTime] = useState('')

  // ===== REFS - Tham chiếu trực tiếp đến DOM element =====
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // ===== CONSTANTS =====
  const coOwnerId = 'CO_OWNER_XYZ_999'

  // ===== EFFECT: Cập nhật thời gian hiện tại mỗi giây =====
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      const dateString = now.toLocaleDateString('vi-VN')
      setCurrentTime(`${timeString}, ${dateString}`)
    }

    updateTime()
    const intervalId = setInterval(updateTime, 1000)

    return () => clearInterval(intervalId)
  }, [])

  // ===== EFFECT: Dừng camera khi component unmount =====
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // ===== FUNCTION: Hiển thị tin nhắn thông báo =====
  const showMessage = useCallback((msg: string, type: MessageType) => {
    setMessage(msg)
    setMessageType(type)

    setTimeout(() => {
      setMessage('')
    }, 5000)
  }, [])

  // ===== FUNCTION: Khởi tạo camera thực từ laptop =====
  const startCamera = useCallback(async () => {
    showMessage('Đang cố gắng kích hoạt Camera...', 'info')

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        showMessage('Camera đã sẵn sàng. Đang chờ mã QR...', 'info')
        console.log('✅ Camera kích hoạt thành công')
      }
    } catch (error) {
      const cameraError = error as CameraError

      console.error('Lỗi truy cập camera:', cameraError)

      if (cameraError.name === 'NotAllowedError') {
        showMessage('❌ Bạn đã từ chối quyền truy cập camera', 'warning')
      } else if (cameraError.name === 'NotFoundError') {
        showMessage('❌ Không tìm thấy camera trên thiết bị', 'warning')
      } else if (cameraError.name === 'NotReadableError') {
        showMessage('❌ Camera đang được sử dụng bởi ứng dụng khác', 'warning')
      } else {
        showMessage('❌ Lỗi khi truy cập camera', 'warning')
      }
    }
  }, [showMessage])

  // ===== FUNCTION: Dừng camera =====
  const stopScanning = useCallback(() => {
    setIsScanning(false)

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    showMessage('Camera đã tắt.', 'warning')
    console.log('✅ Camera đã dừng')
  }, [showMessage])

  // ===== FUNCTION: Bắt đầu quét QR =====
  const startScanning = () => {
    setIsScanning(true)
    startCamera()
    console.log('Đã kích hoạt chế độ quét QR')
  }

  // ===== FUNCTION: Xử lý khi tải file ảnh QR lên =====
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      console.log(`Tên file: ${file.name}, Kích thước: ${file.size} bytes`)
      showMessage(`Đang tải lên và xử lý ảnh: ${file.name}...`, 'info')

      setTimeout(() => {
        showMessage('Check-in thành công qua ảnh QR!', 'success')
        event.target.value = ''
      }, 2000)
    }
  }

  // ===== FUNCTION: Dán mã QR =====
  const pasteQR = () => {
    showMessage('Mô phỏng tính năng "Dán mã QR". Trong thực tế, bạn sẽ dán ảnh hoặc dữ liệu QR tại đây.', 'info')
    console.log('Nút Dán mã QR được nhấn')
  }

  // ===== FUNCTION: Quay lại trang trước =====
  const goBack = () => {
    if (isScanning) {
      stopScanning()
    }
    showMessage('Quay lại (Mô phỏng).', 'warning')
    console.log('Nút Quay lại được nhấn')
  }

  // ===== FUNCTION: Xác định CSS class theo loại thông báo =====
  const getMessageClasses = (): string => {
    switch (messageType) {
      case 'success':
        return 'bg-green-100 text-green-700 border border-green-200'
      case 'info':
        return 'bg-blue-100 text-blue-700 border border-blue-200'
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200'
    }
  }

  // ===== FUNCTION: Render icon theo loại thông báo =====
  const renderMessageIcon = () => {
    switch (messageType) {
      case 'success':
        return <CheckCircleOutlined className='text-lg' />
      case 'info':
        return <InfoCircleOutlined className='text-lg' />
      case 'warning':
        return <WarningOutlined className='text-lg' />
      default:
        return null
    }
  }

  // ===== RENDER =====
  return (
    <div className='w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 md:p-10 space-y-6 mx-4'>
      {/* ===== HEADER ===== */}
      <header className='flex items-center space-x-4 mb-6'>
        {/* Nút quay lại */}
        <button
          onClick={goBack}
          className='text-gray-600 hover:text-indigo-600 transition duration-150 p-2 rounded-md hover:bg-gray-100'
        >
          <ArrowLeftOutlined className='text-lg' />
        </button>

        {/* Tiêu đề */}
        <h1 className='text-2xl font-bold text-gray-800 flex-grow'>Quét mã QR Check-in</h1>

        {/* Icon QR */}
        <div className='p-2 rounded-md bg-indigo-50'>
          <QrcodeOutlined className='text-xl text-indigo-600' />
        </div>
      </header>

      {/* ===== DESCRIPTION ===== */}
      <p className='text-gray-600 text-base leading-relaxed'>
        Sử dụng tính năng này để đăng ký tham gia sự kiện hoặc xác nhận thông tin co-owner.
      </p>

      {/* ===== CAMERA AREA - CHỈNH: h-96 (cao hơn) ===== */}
      <div className='relative w-full h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-xl'>
        {/* Trước khi quét - hiển thị placeholder */}
        {!isScanning && (
          <div className='flex flex-col items-center justify-center h-full p-6 text-center'>
            <div className='p-4 rounded-full bg-gray-800 mb-4'>
              <CameraOutlined className='text-6xl text-gray-400' />
            </div>
            <p className='text-gray-400 text-base leading-relaxed'>
              Bấm "Bắt đầu Quét" để kích hoạt camera và khung quét QR code
            </p>
          </div>
        )}

        {/* Khi đang quét - hiển thị video từ camera */}
        {isScanning && (
          <div className='relative h-full'>
            {/* Video element */}
            <video ref={videoRef} autoPlay playsInline className='w-full h-full object-cover' />

            {/* Khung quét QR với animation */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <div className='relative'>
                {/* Khung quét chính */}
                <div className='w-72 h-72 border-2 border-white/50 rounded-2xl relative overflow-hidden shadow-2xl'>
                  {/* Đường quét animation */}
                  <div
                    className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-bounce'
                    style={{
                      animationDuration: '2s',
                      animationTimingFunction: 'linear',
                      animationIterationCount: 'infinite'
                    }}
                  ></div>

                  {/* 4 góc khung quét */}
                  <div className='absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-white rounded-tl-lg'></div>
                  <div className='absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-white rounded-tr-lg'></div>
                  <div className='absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-white rounded-bl-lg'></div>
                  <div className='absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-white rounded-br-lg'></div>
                </div>
              </div>
            </div>

            {/* Nút thao tác */}
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-black/60 backdrop-blur-sm p-3 rounded-full pointer-events-auto'>
              {/* Nút dán QR */}
              <button
                onClick={pasteQR}
                className='flex items-center space-x-2 px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/20 transition duration-200'
              >
                <CopyOutlined />
                <span>Dán QR</span>
              </button>

              {/* Nút chọn ảnh */}
              <button
                onClick={() => document.getElementById('qrFileInput')?.click()}
                className='flex items-center space-x-2 px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/20 transition duration-200'
              >
                <PictureOutlined />
                <span>Chọn ảnh</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== FILE INPUT (HIDDEN) ===== */}
      <input type='file' id='qrFileInput' accept='image/*' onChange={handleFileUpload} className='hidden' />

      {/* ===== ACTION BUTTON ===== */}
      {!isScanning ? (
        // Nút bắt đầu quét
        <button
          onClick={startScanning}
          className='w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2 text-lg'
        >
          <QrcodeOutlined className='text-xl' />
          <span>Bắt đầu Quét QR</span>
        </button>
      ) : (
        // Nút tắt camera
        <button
          onClick={stopScanning}
          className='w-full bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2 text-lg'
        >
          <StopOutlined className='text-xl' />
          <span>Tắt Camera</span>
        </button>
      )}

      {/* ===== MESSAGE NOTIFICATION ===== */}
      {message && (
        <div className={`p-4 rounded-xl text-center font-medium transition-all duration-300 ${getMessageClasses()}`}>
          <div className='flex items-center justify-center space-x-2'>
            {renderMessageIcon()}
            <span className='text-base'>{message}</span>
          </div>
        </div>
      )}

      {/* ===== INFO SECTION - CHỈNH: bg-indigo-50, shadow tốt hơn ===== */}
      <div className='bg-indigo-50 rounded-xl p-6 text-center text-sm text-gray-700 border border-indigo-100 shadow-md'>
        <div className='space-y-2'>
          {/* Mã Co-owner */}
          <p>
            <span className='font-semibold text-gray-800'>Mã Co-owner:</span>{' '}
            <span className='font-mono text-indigo-700 bg-white px-3 py-1 rounded text-xs font-bold border border-indigo-200'>
              {coOwnerId}
            </span>
          </p>

          {/* Thời gian hiện tại */}
          <p>
            <span className='font-semibold text-gray-800'>Thời gian:</span>{' '}
            <span className='font-mono text-indigo-700 font-semibold'>{currentTime}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
