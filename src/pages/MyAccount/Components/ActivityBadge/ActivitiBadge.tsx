export default function ActivitiBadge() {
  return (
    <div
      className='w-full bg-gradient-to-r from-teal-600/30 to-cyan-600/30 rounded-xl p-3 
               border border-teal-400/30 text-center'
    >
      <div className='flex items-center justify-center gap-2'>
        {/* Battery Icon SVG */}
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' className='text-teal-300'>
          <rect x='1' y='6' width='18' height='12' rx='2' stroke='currentColor' strokeWidth='2' />
          <path d='M19 10h2v4h-2' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
          <rect x='4' y='9' width='10' height='6' fill='currentColor' />
        </svg>
        <div className='text-left'>
          <div className='text-teal-200 font-bold text-sm'>Active Member</div>
          <div className='text-teal-400/70 text-xs'>Since Jan 2025</div>
        </div>
      </div>
    </div>
  )
}
