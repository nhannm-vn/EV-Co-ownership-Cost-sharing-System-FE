import { useMutation, useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import userApi from '../../../../apis/user.api'
import groupApi from '../../../../apis/group.api'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import Skeleton from '../../../../components/Skeleton'
import GroupHeader from '../../components/GroupHeader'

export default function CoOwnershipPercentage() {
  const [percentage, setPercentage] = useState('')
  const [error, setError] = useState('')

  console.log(percentage)

  const { groupId } = useParams<{ groupId: string }>()

  // Fetch current percentage from API
  const { data: ownershipData, isLoading } = useQuery({
    queryKey: ['user-ownership', groupId],
    queryFn: () => groupApi.getAllPercentageInGroup(groupId as string),
    enabled: !!groupId
  })

  // Set initial percentage khi data load xong - FIX
  useEffect(() => {
    const currentPercentage = ownershipData?.data?.userOwnership?.ownershipPercentage
    if (currentPercentage !== undefined && currentPercentage !== null) {
      setPercentage(currentPercentage.toString())
    }
  }, [ownershipData?.data?.userOwnership?.ownershipPercentage]) // Dependency cụ thể

  const updateMutation = useMutation({
    mutationFn: (body: { percentage: number; groupId: string }) =>
      userApi.updatePercentage(body.percentage, body.groupId)
  })

  const handleSubmit = () => {
    // Clear previous error
    setError('')

    // Check if empty
    if (!percentage || percentage.trim() === '') {
      setError('Vui lòng nhập tỷ lệ sở hữu')
      return
    }

    const value = parseFloat(percentage)

    // Check if valid number
    if (isNaN(value)) {
      setError('Giá trị không hợp lệ')
      return
    }

    // Check range
    if (value < 0 || value > 100) {
      setError('Tỷ lệ phải từ 0% đến 100%')
      return
    }

    updateMutation.mutate(
      { groupId: groupId as string, percentage: value },
      {
        onSuccess: () => {
          toast.success('Update percentage ratio successful', { autoClose: 1000 })
          setError('')
        },
        onError: () => {
          setError('Có lỗi xảy ra khi lưu tỷ lệ sở hữu')
        }
      }
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPercentage(e.target.value)
    // Clear error when user starts typing
    if (error) setError('')
  }

  // Loading state
  if (isLoading) {
    return <Skeleton />
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-6'>
      <div className='w-full max-w-md backdrop-blur-[60px] bg-gradient-to-br from-white/22 via-white/16 to-white/20 rounded-[2rem] shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] border-[4px] border-white/60 relative overflow-hidden p-8'>
        {/* Top Gradient Bar */}
        <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />
        <GroupHeader groupId={groupId} />
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='text-center mb-8'>
          <div className='inline-block mb-4'>
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
            Enter Your Ownership
          </h1>
          <p className='text-white/75 text-sm font-medium'>Nhập tỷ lệ sở hữu của bạn</p>
        </motion.div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className='bg-white/15 backdrop-blur-xl rounded-2xl p-6 border-[2px] border-white/40 shadow-[0_0_30px_rgba(6,182,212,0.3),inset_0_1px_15px_rgba(255,255,255,0.1)] mb-6'
        >
          <label className='block text-white/80 text-xs font-bold mb-3 uppercase'>Ownership Percentage</label>
          <div className='relative mb-4'>
            <input
              type='number'
              value={percentage}
              onChange={handleInputChange}
              min='0'
              max='100'
              step='0.01'
              placeholder='0.00'
              disabled={updateMutation.isPending}
              className={`w-full px-6 py-5 bg-white/15 backdrop-blur-lg border-[2px] rounded-xl text-white text-4xl font-black text-center focus:outline-none focus:ring-[3px] placeholder-white/30 transition-all duration-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                error
                  ? 'border-red-400/60 focus:border-red-400 focus:ring-red-300/50'
                  : 'border-white/40 focus:border-cyan-200 focus:ring-cyan-300/50'
              } ${updateMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <span className='absolute right-6 top-1/2 -translate-y-1/2 text-3xl font-black text-cyan-100 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]'>
              %
            </span>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className='mb-4 bg-red-400/20 backdrop-blur-sm rounded-lg p-3 border-[2px] border-red-400/40'
              >
                <div className='flex items-center gap-2'>
                  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' className='text-red-200 flex-shrink-0'>
                    <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
                    <path d='M12 8v4M12 16h.01' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                  </svg>
                  <p className='text-red-100 text-sm font-bold'>{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Helper Text */}
          <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20'>
            <p className='text-white/70 text-xs text-center font-medium'>
              Tỷ lệ phải từ <span className='text-white font-bold'>0%</span> đến{' '}
              <span className='text-white font-bold'>100%</span>
            </p>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          whileHover={!updateMutation.isPending ? { scale: 1.02 } : {}}
          whileTap={!updateMutation.isPending ? { scale: 0.98 } : {}}
          onClick={handleSubmit}
          disabled={updateMutation.isPending}
          className={`w-full py-4 bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-500 hover:to-sky-600 text-white rounded-xl font-bold text-lg transition-all duration-400 shadow-[0_10px_30px_rgba(6,182,212,0.5)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.7)] border-[2px] border-white/40 flex items-center justify-center gap-2 ${
            updateMutation.isPending ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {updateMutation.isPending ? (
            <>
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
              <span>Đang xử lý...</span>
            </>
          ) : (
            'Submit Ownership'
          )}
        </motion.button>

        {/* Bottom Gradient Bar */}
        <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
      </div>
    </div>
  )
}
