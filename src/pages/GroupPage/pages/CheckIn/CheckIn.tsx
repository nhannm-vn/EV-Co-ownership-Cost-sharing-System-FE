import { CameraOutlined, QrcodeOutlined, StopOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

// ========================================
// TYPE DEFINITIONS - Định nghĩa kiểu dữ liệu
// ========================================

// định nghĩa các lỗi camera
interface CameraError extends Error {
  // name của lỗi
  name: string
  // mô tả lỗi đó
  message: string
}

/*
 LUỒNG HOẠT ĐỘNG TỔNG QUAN:
 
  1. KHỞI TẠO COMPONENT:
      Render placeholder với icon camera
      Hiển thị nút "Bắt đầu Quét QR"
 
  2. LUỒNG QUÉT QR BẰNG CAMERA:
     User click "Bắt đầu Quét QR"
     setIsScanning(true) → UI chuyển sang camera view
      startCamera() yêu cầu quyền camera
   
  
  3. CLEANUP:
     Khi component unmount → useEffect cleanup dừng camera
     Khi user click "Tắt Camera" → stopScanning() dừng camera + xóa ảnh upload
 */
export default function CheckIn() {
  // ========================================
  // STATE MANAGEMENT - Quản lý trạng thái component
  // ========================================

  /**
   * isScanning: Boolean kiểm soát UI
   * - false: Hiển thị placeholder (icon camera + hướng dẫn)
   * - true: Hiển thị camera view (video stream + khung quét)
   */
  const [isScanning, setIsScanning] = useState(false)

  // ========================================
  // REFS - Tham chiếu DOM (không trigger re-render khi thay đổi)
  // ========================================

  /**
   * videoRef: Tham chiếu đến thẻ <video> trong DOM
   * - Dùng để gán camera stream: videoRef.current.srcObject = stream
   * - Không dùng state vì không cần re-render khi thay đổi stream
   */
  const videoRef = useRef<HTMLVideoElement>(null)

  /**
   * streamRef: Lưu MediaStream từ camera
   * - Cần lưu để có thể dừng camera sau này: stream.getTracks().forEach(track => track.stop())
   * - Dùng ref thay vì state vì việc thay đổi stream không cần re-render UI
   */
  const streamRef = useRef<MediaStream | null>(null)

  // ========================================
  // LIFECYCLE - Cleanup
  // ========================================

  /*
    Effect: Dọn dẹp camera khi component unmount
   Đảm bảo camera được tắt khi user rời trang
   */
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  /**
   * startCamera - Khởi động camera để quét QR
   *
   * LUỒNG HOẠT ĐỘNG:
   * 1. Gọi navigator.mediaDevices.getUserMedia() → Browser hiển thị popup xin quyền camera
   * 2. User cho phép → Promise resolve với MediaStream
   * 3. Gán stream vào videoRef.current.srcObject → Video element hiển thị camera
   * 4. Lưu stream vào streamRef.current → Để dừng sau này
   *
   * XỬ LÝ LỖI:
   * - NotAllowedError: User click "Block" trong popup quyền
   * - NotFoundError: Thiết bị không có camera
   * - NotReadableError: Camera đang được app khác sử dụng (VD: Zoom, Teams)
   * - Lỗi khác: Hiển thị message lỗi chung
   *
   * CẤU HÌNH CAMERA:
   * - facingMode: 'user' = Camera trước (selfie), 'environment' = Camera sau
   * - width/height: ideal = ưu tiên 1280x720 nhưng không bắt buộc
   *
   * DÙNG useCallback: Tránh tạo lại function, dependency rỗng = stable
   */
  const startCamera = useCallback(async () => {
    try {
      // Yêu cầu quyền truy cập camera từ browser
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user', // Camera trước (selfie camera)
          width: { ideal: 1280 }, // Độ phân giải lý tưởng (không bắt buộc)
          height: { ideal: 720 }
        }
      })

      // Gán stream vào video element để hiển thị
      if (videoRef.current) {
        videoRef.current.srcObject = stream // Video bắt đầu hiển thị camera
        streamRef.current = stream // Lưu lại để dừng sau
        console.log(' Camera mở thành công')
      }
    } catch (error) {
      // Xử lý các loại lỗi camera khác nhau
      const cameraError = error as CameraError
      console.error('Lỗi:', cameraError.name, cameraError.message)

      // Hiển thị toast error phù hợp với từng loại lỗi
      if (cameraError.name === 'NotAllowedError') {
        toast.error('Bạn đã từ chối quyền truy cập camera')
      } else if (cameraError.name === 'NotFoundError') {
        toast.error('Không tìm thấy camera trên thiết bị')
      } else if (cameraError.name === 'NotReadableError') {
        toast.error('Camera đang được sử dụng bởi ứng dụng khác')
      } else {
        toast.error(`Lỗi: ${cameraError.message}`)
      }
    }
  }, []) // Dependency rỗng = function không đổi

  /**
    stopScanning - Dừng quét và giải phóng tài nguyên
   
    CÔNG VIỆC QUAN TRỌNG:
    1. Dừng camera stream → Tắt đèn camera trên thiết bị
    2. Revoke object URL → Giải phóng memory cho ảnh upload
   3. Reset state về initial → Component quay về trạng thái ban đầu
   
   TẠI SAO PHẢI CLEANUP:
   - streamRef.current.getTracks(): Lấy tất cả track (video/audio)
    - track.stop(): Tắt từng track → Camera đèn tắt, giải phóng resource
    - URL.revokeObjectURL(): File upload tạo blob URL trong memory
     → Không revoke = MEMORY LEAK khi upload nhiều ảnh
   
    KHI NÀO ĐƯỢC GỌI:
   - User click "Dừng quét"
   - Component unmount (useEffect cleanup)
   - Sau khi scan QR thành công
   */
  const stopScanning = useCallback(() => {
    console.log(' Tắt camera...')

    // 1. Dừng tất cả track của camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop()) // Tắt camera
      streamRef.current = null // Clear reference
    }

    // 2. Xóa video source (dừng hiển thị)
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    // 4. Reset trạng thái scanning
    setIsScanning(false)
    console.log('✅ Camera tắt xong')
  }, [])

  // ========================================
  // EVENT HANDLERS - Xử lý sự kiện user
  // ========================================

  /**
   * startScanning - Bắt đầu quét QR code
   *
   * LUỒNG:
   * 1. Set isScanning = true → UI hiển thị camera view
   * 2. Gọi startCamera() → Bật camera, hiển thị video stream
   *
   * ĐƯỢC GỌI KHI: User click button "Quét QR Code"
   */
  const startScanning = () => {
    setIsScanning(true) // Chuyển sang chế độ scanning
    startCamera() // Mở camera
    console.log('🎬 Bắt đầu quét QR')
  }

  return (
    <>
      <div className='w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 md:p-10 space-y-6'>
        {/* ==================== HEADER ==================== */}
        {/* Tiêu đề trang với QR icon */}
        <header className='flex items-center space-x-4 mb-6'>
          <h1 className='text-2xl font-bold text-gray-800 flex-grow'>Quét mã QR Check-in / Check-out</h1>
          <div className='p-2 rounded-md bg-indigo-50'>
            <QrcodeOutlined className='text-xl text-indigo-600' />
          </div>
        </header>

        {/* ==================== MESSAGE BOX ==================== */}
        {/* Hiển thị thông báo thành công/lỗi/info (nếu có message) */}

        {/* ==================== MAIN CONTENT ==================== */}
        {/* Camera View hoặc Placeholder */}
        <div className='relative w-full h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-xl'>
          {/* --- PLACEHOLDER (Khi CHƯA quét) --- */}
          {!isScanning && (
            <div className='flex flex-col items-center justify-center h-full p-6 text-center'>
              <div className='p-4 rounded-full bg-gray-800 mb-4'>
                <CameraOutlined className='text-6xl text-gray-400' />
              </div>
              <p className='text-gray-400 text-base leading-relaxed'>Bấm "Bắt đầu Quét" để mở camera</p>
            </div>
          )}

          {/* --- VIDEO/IMAGE VIEW (Khi ĐÃ quét) --- */}
          {isScanning && (
            <div className='relative h-full'>
              {/* Hiển thị video stream từ camera */}
              <video ref={videoRef} autoPlay playsInline className='w-full h-full object-cover' />

              {/* QR FRAME OVERLAY - Khung vuông giữa màn hình */}
              <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                <div className='w-72 h-72 border-2 border-white/50 rounded-2xl relative overflow-hidden shadow-2xl'>
                  {/* 4 góc khung quét (L-shape corners) */}
                  <div className='absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-white rounded-tl-lg'></div>
                  <div className='absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-white rounded-tr-lg'></div>
                  <div className='absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-white rounded-bl-lg'></div>
                  <div className='absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-white rounded-br-lg'></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Nút Bắt đầu / Tắt Camera */}
        {!isScanning ? (
          <button
            onClick={startScanning}
            className='w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2 text-lg'
          >
            <QrcodeOutlined className='text-xl' />
            <span>Bắt đầu Quét QR</span>
          </button>
        ) : (
          <button
            onClick={stopScanning}
            className='w-full bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2 text-lg'
          >
            <StopOutlined className='text-xl' />
            <span>Tắt Camera</span>
          </button>
        )}
      </div>
    </>
  )
}
