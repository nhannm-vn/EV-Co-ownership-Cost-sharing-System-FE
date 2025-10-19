function Skeleton() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm z-50'>
      <div className='flex flex-col items-center gap-4'>
        {/* Spinner circle */}
        <div className='relative w-20 h-20'>
          <div className='absolute inset-0 border-4 border-teal-100 rounded-full'></div>
          <div className='absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin'></div>
        </div>

        {/* Loading text */}
        <p className='text-teal-600 font-medium text-lg'>Loading...</p>
      </div>
    </div>
  )
}

export default Skeleton
