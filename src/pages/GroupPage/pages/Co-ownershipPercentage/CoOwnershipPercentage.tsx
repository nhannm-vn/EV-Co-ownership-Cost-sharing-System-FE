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
    <div className='min-h-screen p-10 my-10 border rounded-2xl border-gray-900 bg-gradient-to-br from-[#0a1f2e] via-[#0d4a4a] to-[#0a1f2e]  relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className='absolute top-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl'
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className='absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl'
        />
      </div>

      <div className='max-w-6xl mx-auto mt-6 relative z-10'>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='text-center mb-8'>
          <div className='inline-block mb-3'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl blur-xl opacity-40' />
              <div className='relative w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl'>
                <svg width='32' height='32' viewBox='0 0 24 24' fill='none' className='text-[#0a1f2e]'>
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
          <h1 className='text-3xl font-black bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-clip-text text-transparent mb-2'>
            Co-Ownership
          </h1>
          <p className='text-cyan-400/70 text-sm'>Quản lý tỷ lệ sở hữu tài sản chung</p>
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
            <div className='relative bg-gradient-to-br from-teal-600/90 to-cyan-700/90 backdrop-blur-2xl rounded-2xl p-5 border border-teal-400/30 shadow-lg'>
              <div className='flex items-center gap-3 mb-5'>
                <div className='w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20'>
                  <span className='text-2xl'>👤</span>
                </div>
                <div>
                  <p className='text-teal-100 text-xs font-semibold uppercase'>Your Share</p>
                  <p className='text-lg font-black text-white'>{currentUser?.name}</p>
                </div>
              </div>

              <AnimatePresence mode='wait'>
                {!isEditing ? (
                  <motion.div key='display' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className='bg-white/10 rounded-xl p-5 border border-white/20 mb-4'>
                      <p className='text-teal-100 text-xs font-semibold mb-2 uppercase'>Current Ownership</p>
                      <div className='flex items-baseline gap-2'>
                        <p className='text-5xl font-black text-white'>{currentUser?.percentage}</p>
                        <p className='text-2xl font-black text-teal-200'>%</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEdit}
                      className='w-full py-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-xl font-bold transition-all'
                    >
                      Edit Ownership
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key='edit' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className='mb-4'>
                      <label className='block text-teal-100 font-bold mb-3 uppercase text-xs'>Enter New %</label>
                      <div className='relative'>
                        <input
                          type='number'
                          value={inputPercentage}
                          onChange={(e) => setInputPercentage(e.target.value)}
                          min='0'
                          max='100'
                          step='0.1'
                          className='w-full px-6 py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white text-3xl font-black text-center focus:border-white focus:outline-none placeholder-white/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          placeholder='0'
                          autoFocus
                        />
                        <span className='absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-black text-teal-200'>
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
                        className='flex-1 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-semibold text-sm'
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        className='flex-1 py-2 bg-white text-teal-700 hover:bg-teal-50 rounded-lg font-bold text-sm'
                      >
                        Confirm
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className='mt-4 bg-white/10 rounded-xl p-4 border border-white/20'>
                <p className='text-teal-100 text-xs font-semibold mb-1 uppercase'>Investment</p>
                <p className='text-lg font-black text-white'>{formatCurrency(currentUser?.investment || 0)}</p>
              </div>

              <div className='mt-4'>
                <div className='flex justify-between text-xs mb-1'>
                  <span className='text-teal-100'>Contribution</span>
                  <span className='text-white font-bold'>{currentUser?.percentage}%</span>
                </div>
                <div className='w-full bg-white/10 rounded-full h-1.5 border border-white/20'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentUser?.percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className='h-full bg-gradient-to-r from-yellow-400 to-orange-500'
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Info Card */}
            <div className='bg-[#1a4d4d]/60 backdrop-blur-2xl rounded-xl p-4 border border-cyan-500/30'>
              <h3 className='text-xs font-bold text-cyan-300 mb-3 uppercase'>Vehicle Info</h3>
              <div className='space-y-2'>
                {[
                  { label: 'Vehicle Value', value: formatCurrency(vehicleValue) },
                  { label: 'Total Members', value: members.length },
                  { label: 'Total Allocated', value: `${totalPercentage}%`, colored: true }
                ].map((item, i) => (
                  <div key={i}>
                    {i > 0 && <div className='h-px bg-cyan-500/20 my-2' />}
                    <div className='flex justify-between items-center'>
                      <span className='text-cyan-400/70 text-xs'>{item.label}</span>
                      <span
                        className={`font-bold text-xs ${item.colored ? (totalPercentage === 100 ? 'text-emerald-400' : 'text-rose-400') : 'text-cyan-300'}`}
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
              <h2 className='text-xl font-black text-cyan-300'>Other Members</h2>
              <div className='px-4 py-1.5 bg-cyan-500/20 rounded-lg border border-cyan-500/30'>
                <span className='text-cyan-300 font-bold text-sm'>{members.length - 1} members</span>
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
                    className='relative group bg-[#1a4d4d]/60 backdrop-blur-2xl rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-400/50 shadow-lg transition-all'
                  >
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-3 flex-1'>
                        <div className='w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center'>
                          <span className='text-white font-bold text-lg'>{member.name.charAt(0)}</span>
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-base font-bold text-cyan-300'>{member.name}</h3>
                          <p className='text-xs text-cyan-400/70'>Member</p>
                        </div>
                      </div>
                      <div className='text-right mr-12'>
                        <div className='text-2xl font-black text-cyan-300'>{member.percentage}%</div>
                        <div className='text-xs text-cyan-400/70 mt-0.5'>{formatCurrency(member.investment)}</div>
                      </div>
                    </div>

                    <div className='w-full bg-cyan-900/30 rounded-full h-1.5 border border-cyan-500/20'>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${member.percentage}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className='h-full bg-gradient-to-r from-teal-500 to-cyan-500'
                      />
                    </div>

                    <div className='absolute top-4 right-4'>
                      <div className='w-8 h-8 bg-slate-800/50 rounded-lg flex items-center justify-center border border-slate-700/50 group-hover:border-cyan-500/30 transition-all'>
                        <svg
                          width='14'
                          height='14'
                          viewBox='0 0 24 24'
                          fill='none'
                          className='text-cyan-400/60 group-hover:text-cyan-400'
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
              className='mt-4 bg-gradient-to-r from-teal-600/80 to-cyan-700/80 backdrop-blur-2xl rounded-xl p-5 border border-cyan-400/30'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-teal-100 text-xs font-semibold mb-1 uppercase'>Total Allocation</p>
                  <p className='text-4xl font-black text-white'>{totalPercentage}%</p>
                </div>
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center ${totalPercentage === 100 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                >
                  <svg width='32' height='32' viewBox='0 0 24 24' fill='none' className='text-white'>
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
    </div>
  )
}
