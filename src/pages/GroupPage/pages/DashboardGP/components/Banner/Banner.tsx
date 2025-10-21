import React from 'react'

export default function Banner() {
  return (
    <div className='relative'>
      <div className='absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-xl' />
      <div className='relative rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-400/30 backdrop-blur-xl px-8 py-5 text-center shadow-xl'>
        <p className='text-white text-xl font-semibold tracking-wide'>
          Hoàn tất GPLX, CCCD và tỉ lệ sở hữu để tạo hợp đồng
        </p>
      </div>
    </div>
  )
}
