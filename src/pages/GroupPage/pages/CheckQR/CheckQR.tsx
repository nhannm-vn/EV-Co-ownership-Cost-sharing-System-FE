import { CameraOutlined, QrcodeOutlined, StopOutlined, PictureOutlined } from '@ant-design/icons'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import jsQR from 'jsqr'
import { useMutation } from '@tanstack/react-query'
import groupApi from '../../../../apis/group.api'
import { useNavigate } from 'react-router'
import { getGroupIdFromLS } from '../../../../utils/auth'

interface CameraError extends Error {
  name: string
  message: string
}

export default function CheckQR() {
  const groupId = getGroupIdFromLS()
  // kiểm tra coi có đang quét hay không
  const [isScanning, setIsScanning] = useState(false)
  // tham chiếu thẻ video để hiển thị camera
  const videoRef = useRef<HTMLVideoElement>(null)
  // lưu trữ stream để dùng khi tắt camera
  const streamRef = useRef<MediaStream | null>(null)
  // file input
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const QRVerify = useMutation({
    mutationFn: (qrCode: string) => {
      return groupApi.verifyCheckIn(qrCode)
    },
    onSuccess: (response) => {
      console.log(response)

      if (response?.data?.responseType === 'CHECKIN') {
        const startTime = response?.data?.bookingInfo?.startTime
        const endTime = response?.data?.bookingInfo?.endTime
        const brand = response?.data?.vehicleInfo?.brand || ''
        const licensePlate = response?.data?.vehicleInfo?.licensePlate || ''
        toast.success('Scan QR Successful!')
        console.log(response?.data?.bookingId)

        if (response?.data?.status === 'success') {
          navigate(
            `/dashboard/viewGroups/${groupId}/check-in-result/${response?.data?.status}/${startTime}/${endTime}/${brand}/${licensePlate}`
          )
        }
        //  nếu là checkout xuống chuyển đến trang check out
      } else if (response?.data?.responseType === 'CHECKOUT') {
        if (response?.data?.status === 'success') {
          navigate(
            `/dashboard/viewGroups/${groupId}/check-out-result/${response?.data?.status}/${response?.data?.bookingId}`
          )
        }
      } else if (response?.data?.status === 'fail') {
        navigate(`/dashboard/viewGroups/${groupId}/check-QR-fail`)
      }
    }
  })

  // chạy một lần clean stream khi component mount
  useEffect(() => {
    return () => {
      // nếu có stream đang chạy thì dừng nó lại
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startCamera = useCallback(async () => {
    // dùng useCall back để tránh hàm bị tạo lại nhiều lần
    try {
      // call API của browser để xin quyền truy cập camera
      const stream = await navigator.mediaDevices.getUserMedia({
        // cấu hình camera
        video: {
          //  cam trước
          facingMode: 'user',
          // độ rộng và cao , ideal là giá trị mong muốn thuộc media track constraint của web api ,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      // nếu video đã đc render
      if (videoRef.current) {
        console.log(stream.getTracks())

        // gán stream vào thẻ video để hiển thị camera
        videoRef.current.srcObject = stream
        // lưu stream vào ref để dùng khi tắt camera
        streamRef.current = stream
      }
    } catch (error) {
      const cameraError = error as CameraError

      if (cameraError.name === 'NotAllowedError') {
        toast.error('You have denied camera access')
      } else if (cameraError.name === 'NotFoundError') {
        toast.error('Camera not found on device')
      } else if (cameraError.name === 'NotReadableError') {
        toast.error('Camera is being used by another app')
      } else {
        toast.error(`Lỗi: ${cameraError.message}`)
      }
    }
  }, [])

  const stopScanning = useCallback(() => {
    // nếu stream đang chạy thì dừng nó lại bằng cách dừng tất cả các track của stream là  các luồng dữ liệu video
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    // nếu video đang hiển thị thì xóa nguồn đi
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    // không quét nữa
    setIsScanning(false)
  }, [])

  const startScanning = () => {
    setIsScanning(true)
    startCamera()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // lấy file từ input
    // event chứa thông tin file
    const file = event.target.files?.[0]
    if (!file) return
    // tạo URL tạm thời cho file ảnh
    // URL này trỏ đến file trong memory của trình duyệt
    const imageUrl = URL.createObjectURL(file)

    //tạo đói tượng ảnh để load ảnh từ URL
    const img = new Image()

    img.onload = () => {
      // khi ảnh đã load xong , tạo canvas để vẽ ảnh lên và lấy dữ liệu ảnh
      const canvas = document.createElement('canvas')
      // Lấy CanvasRenderingContext2D
      // tool = công cụ vẽ trên canvas (như cái bút)
      const tool = canvas.getContext('2d')
      if (!tool) return

      // set chiều dài canvas bằng ảnh
      canvas.width = img.width
      // set chiều  cao canvas bằng ảnh
      canvas.height = img.height
      // vẽ ảnh lên canvas tại vị trí (0,0)
      tool.drawImage(img, 0, 0)

      // lấy diữ liệu ảnh từ canvas

      // getImageData(x, y, width, height) Là hàm của Canvas API
      // dùng để lấy dữ liệu điểm ảnh (pixel data) trong vùng chỉ định.
      const imageData = tool.getImageData(0, 0, canvas.width, canvas.height)
      // gọi jsQR để decode QR code từ dữ liệu ảnh ra mã QR code để verify backend
      const code = jsQR(imageData.data, canvas.width, canvas.height)

      if (code) {
        console.log(' QR Code:', code.data)
        QRVerify.mutate(code.data)
      } else {
        toast.error('QR code not found in image')
      }
      // giải phóng URL tạm thời để tránh rò rỉ bộ nhớ
      URL.revokeObjectURL(imageUrl)
    }

    img.onerror = () => {
      // nếu lỗi thông báo không thể load ảnh
      toast.error('Unable to load image')
      URL.revokeObjectURL(imageUrl)
    }

    // bắt đầu load ảnh từ URL
    img.src = imageUrl
  }
  // hàm xử lí khi người dùng bấm nút tải ảnh
  const handleUploadButtonClick = () => {
    // sử dụng ref để truy cập và kích hoạt thẻ input ẩn
    fileInputRef.current?.click()
  }

  return (
    <div className='w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 md:p-10 space-y-6'>
      <header className='flex items-center space-x-4 mb-6'>
        <h1 className='text-2xl font-bold text-gray-800 flex-grow'> Scan QR code: Check-in/Check-out </h1>
        <div className='p-2 rounded-md bg-indigo-50'>
          <QrcodeOutlined className='text-xl text-indigo-600' />
        </div>
      </header>

      <div className='relative w-full h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-xl'>
        {!isScanning && (
          <div className='flex flex-col items-center justify-center h-full p-6 text-center'>
            <div className='p-4 rounded-full bg-gray-800 mb-4'>
              <CameraOutlined className='text-6xl text-gray-400' />
            </div>
            <p className='text-gray-400 text-base leading-relaxed'>Click "Start Scan" to open the camera</p>
          </div>
        )}

        {isScanning && (
          <div className='relative h-full'>
            <video ref={videoRef} autoPlay playsInline className='w-full h-full object-cover' />

            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <div className='w-72 h-72 border-2 border-white/50 rounded-2xl relative overflow-hidden shadow-2xl'>
                <div className='absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-white rounded-tl-lg'></div>
                <div className='absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-white rounded-tr-lg'></div>
                <div className='absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-white rounded-bl-lg'></div>
                <div className='absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-white rounded-br-lg'></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isScanning ? (
        <button
          onClick={startScanning}
          className='w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2 text-lg'
        >
          <QrcodeOutlined className='text-xl' />
          <span>Start Scanning QR</span>
        </button>
      ) : (
        <>
          <button
            onClick={stopScanning}
            className='w-full bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2 text-lg'
          >
            <StopOutlined className='text-xl' />
            <span>Turn off Camera</span>
          </button>

          <div className='relative'>
            {/* 1 input ẩn type là file   accept là chỉ chấp nhận image , hàm xử lí file , classname ẩn để type là file tự động mở file explorer */}
            <input type='file' ref={fileInputRef} accept='image/*' onChange={handleFileUpload} className='hidden' />
            <button
              disabled={QRVerify.isPending}
              onClick={handleUploadButtonClick}
              className='w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2 text-lg'
            >
              <PictureOutlined className='text-xl' />
              <span>Upload QR Image</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
