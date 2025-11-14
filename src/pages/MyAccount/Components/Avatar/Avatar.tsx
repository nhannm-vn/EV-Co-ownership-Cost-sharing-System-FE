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
  // Generate avatar từ DiceBear, deterministic theo userId
  const generatedAvatar = useMemo(() => {
    if (!userId) return ''

    const seed = userId

    return createAvatar(lorelei as any, {
      size,
      seed,
      backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf']
    }).toDataUri()
  }, [userId, size])

  // Ưu tiên avatar custom, fallback sang avatar generate
  const src = avatar || generatedAvatar
  const hasAvatar = Boolean(src)

  return (
    <div className={`relative group ${className}`}>
      <div
        className='rounded-full overflow-hidden 
                   border-[4px] border-white/60 
                   transition-all duration-300 
                   group-hover:scale-105 
                   group-hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]'
        style={{ width: size, height: size }}
      >
        {hasAvatar ? (
          <img src={src} alt='Avatar' className='w-full h-full object-cover' loading='lazy' />
        ) : (
          // Skeleton: tránh cảm giác “nhảy hình” lúc mới vào trang
          <div className='w-full h-full bg-slate-200' />
        )}
      </div>
    </div>
  )
}
