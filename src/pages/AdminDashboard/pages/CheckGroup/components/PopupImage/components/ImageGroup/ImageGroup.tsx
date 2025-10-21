import { ReloadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import type { GroupImage } from '../../../../../../../../types/api/staff.type'

export default function ImageGroup({ label, images }: { label: string; images: GroupImage[] }) {
  // hiện chỉ số ảnh hiện tại
  const [currentIndex, setCurrentIndex] = useState(0)
  // tạo hiệu ứng mờ dần khi chuyển ảnh
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleRotateImage = () => {
    // khi người dung bấm nút xoay ảnh
    setIsTransitioning(true)
    setTimeout(() => {
      // nếu là đang ảnh 1 prev = 0 thì prev + 1 =1  % length 1 %2 = 1 quay sang ảnh 2
      // nếu là ảnh 2 prev = 1 thì prev + 1 =2 % length 2 %2 =0 quay về ảnh 1
      setCurrentIndex((prev) => (prev + 1) % images.length)
      setIsTransitioning(false)
    }, 200)
  }

  // ảnh hiện tại được hiển thị
  const currentImage = images[currentIndex]

  return (
    <div className='bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100'>
      {/* Header của card */}
      <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 border-b flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
          <h3 className='font-bold text-gray-800 text-base'>Ảnh {label}</h3>
        </div>
      </div>

      {/* Container ảnh */}
      <div className='group relative bg-gray-900 aspect-video overflow-hidden'>
        <img
          src={currentImage.imageUrl}
          //  hiển thị ảnh với alt tương ứng
          alt={`Ảnh ${label} ${currentIndex + 1}`}
          className={`w-full h-full object-contain transition-opacity duration-200 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Overlay gradient */}
        {/* làm bóng cho ảnh  absolute inset-0: chiếm toàn bộ vùng cha */}
        {/* bg-gradient-to-t from-black/30 via-transparent to-transparent: tạo gradient từ dưới lên (màu đen mờ ở dưới, dần trong suốt lên trên */}
        {/* pointer-events-none: lớp này không nhận sự kiện chuột, nên không chặn click vào nút phía trên. */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none'></div>

        {/* nhiều hơn 1 ảnh mới có nút xoay */}
        {images.length > 1 && (
          <>
            {/* Nút xoay - chỉ hiển thị khi hover */}
            <button
              onClick={handleRotateImage}
              className='absolute top-4 right-4 p-3 bg-white hover:bg-blue-500 text-gray-700 hover:text-white rounded-full shadow-xl transition-all duration-300 hover:rotate-180 hover:scale-110 z-10 opacity-0 group-hover:opacity-100'
              aria-label='Xoay ảnh'
              title='Xem ảnh tiếp theo'
            >
              <ReloadOutlined className='text-xl' />
            </button>

            {/* Chỉ số ảnh - chỉ hiển thị khi hover */}
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <span className='text-sm font-bold text-gray-800'>
                {currentIndex + 1}
                <span className='text-gray-400 mx-1'>/</span>
                {images.length}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
