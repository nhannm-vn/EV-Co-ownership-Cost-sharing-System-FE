function ProgressBar({
  completionRate,
  paidMembers,
  totalMembers
}: {
  completionRate: number
  paidMembers: number
  totalMembers: number
}) {
  return (
    <div className='bg-white/80 backdrop-blur-xl rounded-2xl p-6 mb-8 shadow-lg border border-white/20'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-gray-800'>Deposit Progress</h3>
        <span className='text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent'>
          {completionRate}%
        </span>
      </div>
      <div className='relative w-full h-8 bg-gray-100 rounded-full overflow-hidden shadow-inner'>
        <div
          className='absolute h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 flex items-center justify-center transition-all duration-1000 ease-out shadow-lg'
          style={{ width: `${completionRate}%` }}
        >
          {completionRate > 15 && (
            <span className='text-white text-sm font-bold drop-shadow-lg'>{completionRate}% completed</span>
          )}
        </div>
      </div>
      <div className='flex items-center justify-between mt-3'>
        <p className='text-sm text-gray-600'>
          <span className='font-semibold text-teal-600'>{paidMembers}</span>/{totalMembers} members
        </p>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full animate-pulse'></div>
          <span className='text-xs text-gray-500'>Updating</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
