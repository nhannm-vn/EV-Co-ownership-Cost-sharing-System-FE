import { motion } from 'framer-motion'
import DocCard from './Components/DocCard'
import Field from './Components/Field'
import Avatar from './Components/Avatar/Avatar'
import Username from './Components/Username'
import GroupStatus from './Components/GroupStatus'
import ActivitiBadge from './Components/ActivityBadge'
import Icon from './Components/Icon'
import { useEffect, useState } from 'react'
import userApi from '../../apis/user.api'
import type { UserGetProfile } from '../../types/api/user.type'

export default function ProfilePage() {
  const [user, setUser] = useState<UserGetProfile | null>(null)
  useEffect(() => {
    userApi.getProfile().then((response) => {
      console.log(response.data)
      setUser(response.data)
    })
  }, [])

  console.log(user)

  return (
    <div
      className='min-h-screen flex items-center justify-center p-6 font-sans 
                 bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-600 relative overflow-hidden'
    >
      {/* Holographic Background Effects */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Animated Orbs */}
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

      {/* Premium Liquid Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='w-full max-w-6xl backdrop-blur-[60px]
                   bg-gradient-to-br from-white/22 via-white/16 to-white/20
                   rounded-[2.5rem] 
                   shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]
                   border-[4px] border-white/60
                   overflow-hidden relative z-10'
      >
        {/* Premium Top Gradient Bar */}
        <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />

        <div className='grid lg:grid-cols-3 gap-8 p-8'>
          {/* Left Section - Avatar & Name */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='lg:col-span-1 flex flex-col items-center justify-center space-y-6 
                       bg-white/15 backdrop-blur-xl rounded-2xl p-8 
                       border-[3px] border-white/40
                       shadow-[0_0_30px_rgba(6,182,212,0.3),inset_0_1px_15px_rgba(255,255,255,0.1)]'
          >
            {/* Avatar */}
            <Avatar
              avatar={
                'https://cdn-media.sforum.vn/storage/app/media/HuynhUy/React%20l%C3%A0%20g%C3%ACH%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20chi%20ti%E1%BA%BFt%20cho%20ng%C6%B0%E1%BB%9Di%20m%E1%BB%9Bi%20b%E1%BA%AFt%20%C4%91%E1%BA%A7u/react-la-gi-1.jpg'
              }
            />

            {/* Username */}
            <Username username={user?.fullName as string} />

            {/* Stats - Groups & Status */}
            <GroupStatus
              totalGroups={user?.statistics.groupsJoined as number}
              status={user?.statistics.accountStatus as string}
            />

            {/* Activity Badge */}
            <ActivitiBadge
              status={user?.statistics.accountStatus as string}
              time={user?.statistics.memberSince as string}
            />
          </motion.div>

          {/* Right Section - Info & Documents */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Personal Info */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Icon title={'Personal Information'}>
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
              {/* Info Grid */}
              <motion.div
                className='grid md:grid-cols-2 gap-4'
                initial='hidden'
                animate='visible'
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {[
                  { label: 'Email', value: user?.email as string, glow: true },
                  { label: 'Phone', value: user?.phoneNumber as string, glow: true }
                ].map((field, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Field {...field} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Documents Section */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Icon title={'License'}>
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
              {/* Documents Grid */}
              <div className='grid md:grid-cols-2 gap-4'>
                <DocCard
                  title='CCCD'
                  imageFront={user?.documents.citizenIdImages?.front?.imageUrl || ''}
                  imageBack={user?.documents.citizenIdImages?.back?.imageUrl || ''}
                  statusFront={user?.documents.citizenIdImages?.front?.status || ''}
                  statusBack={user?.documents.citizenIdImages?.back?.status || ''}
                />
                <DocCard
                  title='GPLX'
                  imageFront={user?.documents.driverLicenseImages?.front?.imageUrl || ''}
                  imageBack={user?.documents.driverLicenseImages?.back?.imageUrl || ''}
                  statusFront={user?.documents.driverLicenseImages?.front?.status || ''}
                  statusBack={user?.documents.driverLicenseImages?.back?.status || ''}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Premium Bottom Gradient Bar */}
        <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
      </motion.div>
    </div>
  )
}
