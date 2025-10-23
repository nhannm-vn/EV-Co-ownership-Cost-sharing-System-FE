import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Member {
  id: string
  name: string
  percentage: number
  investment: number
  isCurrentUser: boolean
}

export default function CoOwnershipPercentage() {
  const vehicleValue = 690000000
  const currentUserId = '1'

  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Nguyễn Văn A', percentage: 40, investment: 276000000, isCurrentUser: true },
    { id: '2', name: 'Trần Thị B', percentage: 30, investment: 207000000, isCurrentUser: false },
    { id: '3', name: 'Lê Văn C', percentage: 20, investment: 138000000, isCurrentUser: false },
    { id: '4', name: 'Phạm Thị D', percentage: 10, investment: 69000000, isCurrentUser: false }
  ])

  const [inputPercentage, setInputPercentage] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const totalPercentage = members.reduce((sum, m) => sum + m.percentage, 0)
  const currentUser = members.find((m) => m.id === currentUserId)

  const handleSubmit = () => {
    const percentage = parseFloat(inputPercentage) || 0
    if (percentage < 0 || percentage > 100) return alert('Tỷ lệ phải từ 0 đến 100%')

    setMembers(
      members.map((m) =>
        m.id === currentUserId ? { ...m, percentage, investment: (vehicleValue * percentage) / 100 } : m
      )
    )
    setIsEditing(false)
    setInputPercentage('')
  }

  const handleEdit = () => {
    setInputPercentage(currentUser?.percentage.toString() || '')
    setIsEditing(true)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
  }

  return (
    <div className='min-h-screen p-10 my-10 rounded-[2rem] backdrop-blur-[60px] bg-gradient-to-br from-white/22 via-white/16 to-white/20 shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] border-[4px] border-white/60 relative overflow-hidden'>
      {/* Top Gradient Bar */}
      <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />

      <div className='max-w-6xl mx-auto mt-6 relative z-10'>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='text-center mb-8'>
          <div className='inline-block mb-3'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-2xl blur-xl opacity-50' />
              <div className='relative w-16 h-16 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)] border-[2px] border-white/50'>
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                >
                  <path
                    d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                  <circle cx='9' cy='7' r='4' stroke='currentColor' strokeWidth='2' />
                  <path
                    d='M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </div>
            </div>
          </div>
          <h1 className='text-3xl font-bold text-white drop-shadow-[0_0_20px_rgba(6,182,212,0.7)] mb-2'>
            Co-Ownership
          </h1>
          <p className='text-white/75 text-sm font-medium'>Quản lý tỷ lệ sở hữu tài sản chung</p>
        </motion.div>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* Left: Your Ownership Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className='lg:col-span-1 space-y-4'
          >
            {/* Main Card */}
            <div className='relative bg-gradient-to-br from-cyan-400/30 to-sky-500/30 backdrop-blur-xl rounded-2xl p-5 border-[2px] border-white/40 shadow-[0_0_30px_rgba(6,182,212,0.4),inset_0_1px_15px_rgba(255,255,255,0.1)]'>
              <div className='flex items-center gap-3 mb-5'>
                <div className='w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border-[2px] border-white/30'>
                  <span className='text-2xl'>👤</span>
                </div>
                <div>
                  <p className='text-white/80 text-xs font-bold uppercase'>Your Share</p>
                  <p className='text-lg font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'>
                    {currentUser?.name}
                  </p>
                </div>
              </div>

              <AnimatePresence mode='wait'>
                {!isEditing ? (
                  <motion.div key='display' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className='bg-white/15 backdrop-blur-lg rounded-xl p-5 border-[2px] border-white/30 mb-4'>
                      <p className='text-white/80 text-xs font-bold mb-2 uppercase'>Current Ownership</p>
                      <div className='flex items-baseline gap-2'>
                        <p className='text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'>
                          {currentUser?.percentage}
                        </p>
                        <p className='text-2xl font-black text-cyan-100'>%</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEdit}
                      className='w-full py-3 bg-white/20 hover:bg-white/30 border-[2px] border-white/40 text-white rounded-xl font-bold transition-all duration-400'
                    >
                      Edit Ownership
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key='edit' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className='mb-4'>
                      <label className='block text-white font-bold mb-3 uppercase text-xs'>Enter New %</label>
                      <div className='relative'>
                        <input
                          type='number'
                          value={inputPercentage}
                          onChange={(e) => setInputPercentage(e.target.value)}
                          min='0'
                          max='100'
                          step='0.1'
                          className='w-full px-6 py-4 bg-white/15 backdrop-blur-lg border-[2px] border-white/40 rounded-xl text-white text-3xl font-black text-center focus:border-cyan-200 focus:outline-none placeholder-white/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          placeholder='0'
                          autoFocus
                        />
                        <span className='absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-black text-cyan-100'>
                          %
                        </span>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsEditing(false)
                          setInputPercentage('')
                        }}
                        className='flex-1 py-2 bg-white/15 hover:bg-white/25 border-[2px] border-white/30 text-white rounded-lg font-bold text-sm transition-all duration-400'
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        className='flex-1 py-2 bg-white text-cyan-700 hover:bg-cyan-50 rounded-lg font-bold text-sm transition-all duration-400'
                      >
                        Confirm
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className='mt-4 bg-white/15 backdrop-blur-lg rounded-xl p-4 border-[2px] border-white/30'>
                <p className='text-white/80 text-xs font-bold mb-1 uppercase'>Investment</p>
                <p className='text-lg font-black text-white'>{formatCurrency(currentUser?.investment || 0)}</p>
              </div>

              <div className='mt-4'>
                <div className='flex justify-between text-xs mb-2'>
                  <span className='text-white/80 font-semibold'>Contribution</span>
                  <span className='text-white font-bold'>{currentUser?.percentage}%</span>
                </div>
                <div className='w-full bg-white/15 rounded-full h-2 border-[2px] border-white/30'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentUser?.percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className='h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full'
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Info Card */}
            <div className='bg-white/10 backdrop-blur-xl rounded-xl p-4 border-[2px] border-cyan-200/40 shadow-[0_0_20px_rgba(6,182,212,0.3),inset_0_1px_10px_rgba(255,255,255,0.08)]'>
              <h3 className='text-xs font-bold text-cyan-100 mb-3 uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]'>
                Vehicle Info
              </h3>
              <div className='space-y-2'>
                {[
                  { label: 'Vehicle Value', value: formatCurrency(vehicleValue) },
                  { label: 'Total Members', value: members.length },
                  { label: 'Total Allocated', value: `${totalPercentage}%`, colored: true }
                ].map((item, i) => (
                  <div key={i}>
                    {i > 0 && <div className='h-px bg-cyan-200/30 my-2' />}
                    <div className='flex justify-between items-center'>
                      <span className='text-white/70 text-xs font-medium'>{item.label}</span>
                      <span
                        className={`font-bold text-xs ${item.colored ? (totalPercentage === 100 ? 'text-green-300' : 'text-red-300') : 'text-cyan-100'}`}
                      >
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Other Members */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className='lg:col-span-2'
          >
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]'>
                Other Members
              </h2>
              <div className='px-4 py-1.5 bg-cyan-400/20 backdrop-blur-lg rounded-lg border-[2px] border-cyan-200/40'>
                <span className='text-cyan-100 font-bold text-sm'>{members.length - 1} members</span>
              </div>
            </div>

            <div className='space-y-3'>
              {members
                .filter((m) => !m.isCurrentUser)
                .map((member, i) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ y: -2 }}
                    className='relative group bg-white/10 backdrop-blur-xl rounded-xl p-4 border-[2px] border-white/30 hover:border-cyan-200/50 shadow-[0_0_20px_rgba(6,182,212,0.2),inset_0_1px_10px_rgba(255,255,255,0.08)] transition-all duration-400'
                  >
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-3 flex-1'>
                        <div className='w-12 h-12 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] border-[2px] border-white/40'>
                          <span className='text-white font-bold text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'>
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-base font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'>
                            {member.name}
                          </h3>
                          <p className='text-xs text-white/70 font-medium'>Member</p>
                        </div>
                      </div>
                      <div className='text-right mr-12'>
                        <div className='text-2xl font-black text-cyan-100 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]'>
                          {member.percentage}%
                        </div>
                        <div className='text-xs text-white/70 mt-0.5 font-medium'>
                          {formatCurrency(member.investment)}
                        </div>
                      </div>
                    </div>

                    <div className='w-full bg-white/15 rounded-full h-2 border-[2px] border-white/30'>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${member.percentage}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className='h-full bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full'
                      />
                    </div>

                    <div className='absolute top-4 right-4'>
                      <div className='w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border-[2px] border-white/30 group-hover:border-cyan-200/50 transition-all duration-400'>
                        <svg
                          width='14'
                          height='14'
                          viewBox='0 0 24 24'
                          fill='none'
                          className='text-cyan-200/70 group-hover:text-cyan-100 transition-colors'
                        >
                          <rect x='5' y='11' width='14' height='10' rx='2' stroke='currentColor' strokeWidth='2' />
                          <path
                            d='M8 11V7a4 4 0 0 1 8 0v4'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                          />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Total Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className='mt-4 bg-gradient-to-r from-cyan-400/30 to-sky-500/30 backdrop-blur-xl rounded-xl p-5 border-[2px] border-white/40 shadow-[0_0_30px_rgba(6,182,212,0.4),inset_0_1px_15px_rgba(255,255,255,0.1)]'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-white/80 text-xs font-bold mb-1 uppercase'>Total Allocation</p>
                  <p className='text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'>
                    {totalPercentage}%
                  </p>
                </div>
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-[0_0_30px_currentColor] border-[2px] border-white/50 ${totalPercentage === 100 ? 'bg-green-400' : 'bg-red-400'}`}
                >
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 24 24'
                    fill='none'
                    className='text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]'
                  >
                    {totalPercentage === 100 ? (
                      <path d='M5 13l4 4L19 7' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
                    ) : (
                      <path d='M12 9v4M12 17h.01' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
                    )}
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Bar */}
      <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
    </div>
  )
}
