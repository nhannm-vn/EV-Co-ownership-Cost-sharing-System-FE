import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import userApi from '../../apis/user.api'
import Skeleton from '../../components/Skeleton'
import ActivitiBadge from './Components/ActivityBadge'
import Avatar from './Components/Avatar/Avatar'
import DocCard from './Components/DocCard'
import Field from './Components/Field'
import GroupStatus from './Components/GroupStatus'
import Icon from './Components/Icon'
import Username from './Components/Username'
import { toast } from 'react-toastify'

export default function MyAccount() {
  const queryClient = useQueryClient()
  const [editingField, setEditingField] = useState<'phone' | 'name' | null>(null)
  const [editValue, setEditValue] = useState('')

  // Fetch user profile
  const {
    data: userProfile,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => userApi.getProfile()
  })

  const user = userProfile?.data

  // Mutation for phone number
  const phonemutation = useMutation({
    mutationFn: (newPhone: string) => userApi.editPhoneNumber(String(user?.userId), newPhone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
      setEditingField(null)
      toast.success('Update phone successfully!', {
        autoClose: 2500,
        position: 'top-right'
      })
    }
  })

  // Mutation for full name
  const nameMutation = useMutation({
    mutationFn: (newName: string) => userApi.editFullName(String(user?.userId), newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
      setEditingField(null)
      toast.success('Update full name successfully!', {
        autoClose: 2500,
        position: 'top-right'
      })
    }
  })

  const handleEdit = (field: 'phone' | 'name', currentValue: string) => {
    setEditingField(field)
    setEditValue(currentValue)
  }

  const handleSave = () => {
    if (editingField === 'phone') {
      phonemutation.mutate(editValue)
    } else if (editingField === 'name') {
      nameMutation.mutate(editValue)
    }
  }

  const handleCancel = () => {
    setEditingField(null)
    setEditValue('')
  }

  if (isLoading) {
    return <Skeleton />
  }

  if (isError || !user) {
    return (
      <div className='min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-600'>
        <div className='backdrop-blur-[60px] bg-white/20 rounded-3xl p-12 border-[3px] border-white/40 text-center'>
          <div className='w-16 h-16 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-400/50'>
            <svg className='w-8 h-8 text-red-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </div>
          <p className='text-white font-bold text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-2'>
            Cannot load information
          </p>
          <p className='text-white/70'>Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-6 font-sans bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-600 relative overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className='absolute top-20 right-20 w-[500px] h-[500px] bg-cyan-300/40 rounded-full blur-[120px]'
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className='absolute bottom-20 left-20 w-[500px] h-[500px] bg-indigo-400/40 rounded-full blur-[120px]'
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, delay: 1 }}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-sky-300/35 rounded-full blur-[100px]'
        />
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingField && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4'
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className='bg-white/95 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border-[3px] border-white shadow-[0_20px_60px_rgba(0,0,0,0.3)]'
            >
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>
                {editingField === 'phone' ? 'Edit phone number' : 'Edit name'}
              </h3>
              <input
                type='text'
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className='w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl text-gray-800 focus:outline-none focus:border-blue-400 transition-colors mb-6'
                placeholder={editingField === 'phone' ? 'Enter new phone number' : 'Enter new name'}
                autoFocus
              />
              <div className='flex gap-3'>
                <button
                  onClick={handleSave}
                  disabled={phonemutation.isPending || nameMutation.isPending}
                  className='flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-3 rounded-xl hover:from-cyan-500 hover:to-blue-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {phonemutation.isPending || nameMutation.isPending ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  className='flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-300 transition-colors'
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='w-full max-w-6xl backdrop-blur-[60px] bg-gradient-to-br from-white/22 via-white/16 to-white/20 rounded-[2.5rem] shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] border-[4px] border-white/60 overflow-hidden relative z-10'
      >
        <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />

        <div className='grid lg:grid-cols-3 gap-8 p-8'>
          {/* Left Section */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='lg:col-span-1 flex flex-col items-center justify-center space-y-6 bg-white/15 backdrop-blur-xl rounded-2xl p-8 border-[3px] border-white/40 shadow-[0_0_30px_rgba(6,182,212,0.3),inset_0_1px_15px_rgba(255,255,255,0.1)]'
          >
            <Avatar userId={user.userId.toString()} size={128} className='mx-auto' />

            {/* Username with Edit Button */}
            <div className='relative group'>
              <Username username={user?.fullName as string} />
              <button
                onClick={() => handleEdit('name', user?.fullName as string)}
                className='absolute -right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 rounded-lg shadow-lg hover:bg-white'
                title='Edit name'
              >
                <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                  />
                </svg>
              </button>
            </div>

            <GroupStatus
              totalGroups={user?.statistics.groupsJoined as number}
              status={user?.statistics.accountStatus as string}
            />

            <ActivitiBadge
              status={user?.statistics.accountStatus as string}
              time={user?.statistics.memberSince as string}
            />
          </motion.div>

          {/* Right Section */}
          <div className='lg:col-span-2 space-y-6'>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Icon title='Personal Information'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                >
                  <circle cx='12' cy='8' r='4' fill='currentColor' />
                  <path
                    d='M4 20c0-4 3.5-7 8-7s8 3 8 7'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    fill='currentColor'
                  />
                </svg>
              </Icon>

              <motion.div
                className='grid md:grid-cols-2 gap-4'
                initial='hidden'
                animate='visible'
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {/* Email Field - Not Editable */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4 }}
                >
                  <Field label='Email' value={user?.email as string} glow={true} />
                </motion.div>

                {/* Phone Field - Editable */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4 }}
                  className='relative group'
                >
                  <Field label='Phone' value={user?.phoneNumber as string} glow={true} />
                  <button
                    onClick={() => handleEdit('phone', user?.phoneNumber as string)}
                    className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 rounded-lg shadow-lg hover:bg-white'
                    title='Edit phone number'
                  >
                    <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                      />
                    </svg>
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Documents Section */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Icon title='License'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                >
                  <path
                    d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'
                    stroke='currentColor'
                    strokeWidth='2'
                    fill='currentColor'
                    fillOpacity='0.3'
                  />
                  <path
                    d='M14 2v6h6'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Icon>

              <div className='grid md:grid-cols-2 gap-4'>
                <DocCard
                  title='Citizen ID'
                  imageFront={user?.documents.citizenIdImages?.front?.imageUrl || ''}
                  imageBack={user?.documents.citizenIdImages?.back?.imageUrl || ''}
                  statusFront={user?.documents.citizenIdImages?.front?.status || ''}
                  statusBack={user?.documents.citizenIdImages?.back?.status || ''}
                />
                <DocCard
                  title='Driver License'
                  imageFront={user?.documents.driverLicenseImages?.front?.imageUrl || ''}
                  imageBack={user?.documents.driverLicenseImages?.back?.imageUrl || ''}
                  statusFront={user?.documents.driverLicenseImages?.front?.status || ''}
                  statusBack={user?.documents.driverLicenseImages?.back?.status || ''}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
      </motion.div>
    </div>
  )
}
