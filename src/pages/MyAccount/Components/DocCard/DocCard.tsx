import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface IDocCard {
  title: string
  imageFront: string | null
  imageBack: string | null
  statusFront: string
  statusBack: string
}

function DocCard({ title, imageFront, imageBack, statusFront, statusBack }: IDocCard) {
  const [isFlipped, setIsFlipped] = useState(false)

  const currentImage = isFlipped ? imageBack : imageFront
  const currentStatus = isFlipped ? statusBack : statusFront
  const isApproved = currentStatus === 'APPROVED'
  const isRejected = currentStatus === 'REJECTED'
  const currentSide = isFlipped ? 'Mặt sau' : 'Mặt trước'

  return (
    <div className='relative w-full'>
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className='relative w-full rounded-2xl overflow-hidden 
                   border-[3px] border-white/40
                   bg-white/10 backdrop-blur-xl
                   shadow-[0_0_30px_rgba(6,182,212,0.3),inset_0_1px_15px_rgba(255,255,255,0.1)]
                   hover:border-white/60 hover:shadow-[0_0_40px_rgba(14,165,233,0.5),inset_0_1px_20px_rgba(255,255,255,0.15)]
                   transition-all duration-500'
      >
        {/* Header with Title, Status & Flip Button */}
        <div className='p-4 border-b-[2px] border-white/20 bg-white/5 backdrop-blur-sm'>
          <div className='flex items-start justify-between gap-3'>
            <div className='flex-1 min-w-0'>
              <h4 className='text-white font-bold text-lg truncate drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'>
                {title}
              </h4>
              <p className='text-white/75 text-xs mt-1 font-medium'>{currentSide}</p>
            </div>

            <div className='flex items-center gap-2 flex-shrink-0'>
              {/* Status Badge: cho hiển thị lại cục active hoặc màu khác chứ đừng
              để active nó sẽ trùng với lại mấy thằng cũ */}
              <div
                className={classNames('flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md', {
                  'bg-green-400/20 border-[2px] border-green-300/50': isApproved,
                  'bg-yellow-400/20 border-[2px] border-yellow-300/50': !isApproved && !isRejected,
                  'bg-red-400/20 border-[2px] border-red-300/50': isRejected
                })}
              >
                <div
                  className={classNames('w-2.5 h-2.5 rounded-full', {
                    'bg-green-400': isApproved,
                    'bg-yellow-400': !isApproved && !isRejected,
                    'bg-red-400': isRejected
                  })}
                  style={{
                    boxShadow: isApproved
                      ? '0 0 12px rgba(74, 222, 128, 0.9), 0 0 20px rgba(74, 222, 128, 0.5)'
                      : isRejected
                        ? '0 0 12px rgba(248, 113, 113, 0.9), 0 0 20px rgba(248, 113, 113, 0.5)'
                        : '0 0 12px rgba(250, 204, 21, 0.9), 0 0 20px rgba(250, 204, 21, 0.5)'
                  }}
                />
              </div>

              {/* Flip Button */}
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className='p-2 rounded-lg bg-white/15 border-[2px] border-white/30 
                         hover:bg-white/25 hover:border-white/50
                         hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]
                         transition-all duration-400 group'
                title={`Xem ${isFlipped ? 'mặt trước' : 'mặt sau'}`}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]
                           group-hover:rotate-180 transition-transform duration-500'
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
        </div>

        {/* Image or Placeholder */}
        {currentImage ? (
          <div className='relative w-full h-56 group'>
            {/* Image with blur effect */}
            <img
              src={currentImage}
              alt={`${title} - ${currentSide}`}
              className='w-full h-full object-cover blur-md group-hover:blur-none transition-all duration-400'
            />

            {/* Gradient Overlay */}
            <div
              className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent 
                          group-hover:from-black/40 transition-all duration-400'
            />

            {/* Holographic Glass Overlay */}
            <div
              className='absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-400'
            />

            {/* Side Indicator Badge */}
            <div
              className='absolute bottom-3 left-3 px-3 py-1.5 
                          bg-white/20 backdrop-blur-md rounded-full 
                          border-[2px] border-white/40
                          shadow-[0_0_15px_rgba(6,182,212,0.3)]'
            >
              <span className='text-white text-xs font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]'>
                {currentSide}
              </span>
            </div>
          </div>
        ) : (
          <div
            className='w-full h-56 flex flex-col items-center justify-center gap-4 
                        bg-white/5 backdrop-blur-sm'
          >
            {/* Upload Icon */}
            <svg
              width='48'
              height='48'
              viewBox='0 0 24 24'
              fill='none'
              className='text-white/40 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]'
            >
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
              <p className='text-white/70 text-sm font-semibold'>Chưa có {currentSide.toLowerCase()}</p>
              <p className='text-white/50 text-xs mt-1'>
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
