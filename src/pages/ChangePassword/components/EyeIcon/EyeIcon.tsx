function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-5 h-5 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
      />
    </svg>
  ) : (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-5 h-5 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.957 9.957 0 012.669-4.045M9.88 9.88a3 3 0 104.24 4.24'
      />
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6.1 6.1L17.9 17.9' />
    </svg>
  )
}

export default EyeIcon
