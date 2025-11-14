/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'
import { createAvatar } from '@dicebear/core'
import { lorelei } from '@dicebear/collection'

interface AvatarProps {
  avatar?: string
  userId?: string
  size?: number // px
  className?: string
}

export default function Avatar({ avatar, userId, size = 128, className = '' }: AvatarProps) {
  const generatedAvatar = useMemo(() => {
    if (!userId) return ''

    // seed cố định theo userId => mọi nơi / mọi lần F5 đều giống nhau
    const seed = userId

    return createAvatar(lorelei as any, {
      size,
      seed,
      backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf']
    }).toDataUri()
  }, [userId, size])

  const src = avatar || generatedAvatar

  return (
    <div className={`relative group ${className}`}>
      <div
        className='rounded-full overflow-hidden 
                   border-[4px] border-white/60 
                   transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]'
        style={{ width: size, height: size }}
      >
        {src && <img src={src} alt='Avatar' className='w-full h-full object-cover' />}
      </div>
      {/* ĐÃ BỎ dấu tích xanh ở đây */}
    </div>
  )
}
