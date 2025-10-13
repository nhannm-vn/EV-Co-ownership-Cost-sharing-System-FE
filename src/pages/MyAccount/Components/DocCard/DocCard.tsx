import { motion } from 'framer-motion'
import { useState } from 'react'

interface IDocCard {
  title: string
  imageFront: string | null // Mặt trước
  imageBack: string | null // Mặt sau
}

function DocCard({ title, imageFront, imageBack }: IDocCard) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Xác định trạng thái cho từng mặt
  const isUploadedFront = !!imageFront
  const isUploadedBack = !!imageBack

  // Hiển thị ảnh tương ứng với mặt đang xem
  const currentImage = isFlipped ? imageBack : imageFront
  const currentStatus = isFlipped ? isUploadedBack : isUploadedFront
  const currentSide = isFlipped ? 'Mặt sau' : 'Mặt trước'

  return (
    <div className='relative w-full'>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className='relative w-full rounded-2xl overflow-hidden border-2 border-teal-400/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 shadow-lg transition-all hover:border-teal-400/60'
      >
        {/* Status Dot - Chấm màu theo mặt đang xem */}
        <div className='absolute top-3 right-3 z-10'>
          <div
            className={`w-3 h-3 rounded-full ${currentStatus ? 'bg-green-500' : 'bg-red-500'} shadow-lg`}
            style={{
              boxShadow: currentStatus ? '0 0 10px rgba(34, 197, 94, 0.8)' : '0 0 10px rgba(239, 68, 68, 0.8)'
            }}
          />
        </div>

        {/* Title */}
        <div className='p-4 text-center border-b border-teal-400/30 bg-slate-900/50'>
          <div className='flex items-center justify-between'>
            <div className='flex-1 text-left'>
              <h4 className='text-teal-300 text-lg font-bold'>{title}</h4>
              <p className='text-teal-400/70 text-xs mt-1'>{currentSide}</p>
            </div>

            {/* Flip Button */}
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className='ml-3 p-2 rounded-lg bg-teal-500/20 border border-teal-400/30 hover:bg-teal-500/30 transition-all group'
              title={`Xem ${isFlipped ? 'mặt trước' : 'mặt sau'}`}
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                className='text-teal-300 group-hover:rotate-180 transition-transform duration-500'
              >
                <path
                  d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M21 3v5h-5'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3 21v-5h5'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Image or Placeholder - Hiển thị ảnh tương ứng hoặc placeholder */}
        {currentImage ? (
          <div className='relative w-full h-56'>
            <img src={currentImage} alt={`${title} - ${currentSide}`} className='w-full h-full object-cover' />
            {/* Overlay gradient */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />

            {/* Side indicator on image */}
            <div className='absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full border border-teal-400/30'>
              <span className='text-teal-300 text-xs font-semibold'>{currentSide}</span>
            </div>
          </div>
        ) : (
          <div className='w-full h-56 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-900/80 to-teal-950/80'>
            {/* Upload Icon SVG */}
            <svg width='48' height='48' viewBox='0 0 24 24' fill='none' className='text-teal-400/50'>
              <path
                d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <polyline
                points='17 8 12 3 7 8'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <line x1='12' y1='3' x2='12' y2='15' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
            </svg>
            <div className='text-center'>
              <p className='text-gray-400 text-sm font-medium'>Chưa có {currentSide.toLowerCase()}</p>
              <p className='text-gray-500 text-xs mt-1'>
                Vui lòng tải lên {title} {currentSide.toLowerCase()}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default DocCard
