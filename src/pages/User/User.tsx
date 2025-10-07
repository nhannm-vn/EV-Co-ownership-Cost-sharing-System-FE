import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Input, DatePicker } from 'antd'
import dayjs from 'dayjs'

const currentUser = {
  id: 99,
  name: 'Nguyen Minh Nhan',
  email: 'nhamnmse182080@fpt.edu.vn',
  phone: '0947474747',
  dob: '1998-05-20',
  location: 'Rach Gia',
  avatar: 'src/assets/react.svg',
  role: 'Co-owner'
}

type ProfileInputs = {
  name: string
  phone: string
  dob: string
  location: string
}

type ChangePasswordInputs = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function User() {
  const [tab, setTab] = useState<'profile' | 'security'>('profile')
  const [avatarPreview, setAvatarPreview] = useState(currentUser.avatar)

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    setValue,
    formState: { errors: profileErrors }
  } = useForm<ProfileInputs>({
    defaultValues: {
      name: currentUser.name,
      phone: currentUser.phone,
      dob: currentUser.dob,
      location: currentUser.location
    }
  })

  const onProfileSubmit = (data: ProfileInputs) => {
    console.log('Profile updated:', { ...data, avatar: avatarPreview })
    alert('Profile info updated!')
  }

  // Security form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ChangePasswordInputs>()
  const onSubmit = (data: ChangePasswordInputs) => {
    console.log('Change password', data)
    alert('Password updated!')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-slate-100 p-8 flex justify-center'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-2xl bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-800/50 p-8'
      >
        {/* Header */}
        <div className='flex flex-col items-center text-center'>
          {/* Avatar + Change */}
          <div className='relative group'>
            <motion.img
              src={avatarPreview}
              className='w-28 h-28 rounded-full border-4 border-cyan-400 shadow-[0_0_25px_rgba(139,92,246,0.7)] object-cover'
              whileHover={{ scale: 1.05, rotate: 2 }}
            />
            <div className='absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>
              <label
                htmlFor='avatar-upload'
                className='cursor-pointer px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/40'
              >
                Change
              </label>
              <input
                id='avatar-upload'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const url = URL.createObjectURL(file)
                    setAvatarPreview(url)
                    console.log('Selected avatar:', file)
                  }
                }}
              />
            </div>
          </div>

          <h1 className='mt-4 text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]'>
            {currentUser.name}
          </h1>
          <p className='text-slate-400'>{currentUser.email}</p>
        </div>

        {/* Tabs */}
        <div className='flex gap-4 mt-8 justify-center'>
          <button
            onClick={() => setTab('profile')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              tab === 'profile'
                ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/40'
                : 'bg-gray-800/50 hover:bg-gray-700 text-slate-300'
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setTab('security')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              tab === 'security'
                ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-violet-500/40'
                : 'bg-gray-800/50 hover:bg-gray-700 text-slate-300'
            }`}
          >
            Security
          </button>
        </div>

        {/* Profile Info */}
        {tab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='mt-8'
          >
            <h3 className='text-xl font-semibold mb-4'>Edit Profile Info</h3>
            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className='space-y-5'>
              <div>
                <label className='block text-sm mb-1 text-slate-300'>Username</label>
                <Input
                  {...registerProfile('name', { required: 'Required' })}
                  className='w-full px-4 py-2 rounded-xl 
                      bg-gray-900 border border-gray-700 
                      text-slate-200 placeholder-slate-500
                      focus:text-black 
                      transition-colors'
                />
                {profileErrors.name && <p className='text-red-400 text-sm'>{profileErrors.name.message}</p>}
              </div>

              <div>
                <label className='block text-sm mb-1 text-slate-300'>Phone</label>
                <Input
                  {...registerProfile('phone', { required: 'Required' })}
                  className='w-full px-4 py-2 rounded-xl 
                      bg-gray-900 border border-gray-700 
                      text-slate-200 placeholder-slate-500
                      focus:text-black 
                      transition-colors'
                />
                {profileErrors.phone && <p className='text-red-400 text-sm'>{profileErrors.phone.message}</p>}
              </div>

              <div>
                <label className='block text-sm mb-1 text-slate-300'>Date of Birth</label>
                <DatePicker
                  defaultValue={dayjs(currentUser.dob)}
                  onChange={(date) => setValue('dob', date?.format('YYYY-MM-DD') || '')}
                  className='
                      w-full px-4 py-2 rounded-xl
                      bg-gray-900 border border-gray-700
                      text-slate-200 placeholder-slate-500
                      focus-within:bg-white focus-within:text-black
                      transition-colors
                    '
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label className='block text-sm mb-1 text-slate-300'>Location</label>
                <Input
                  {...registerProfile('location', { required: 'Required' })}
                  className='w-full px-4 py-2 rounded-xl 
                      bg-gray-900 border border-gray-700 
                      text-slate-200 placeholder-slate-500
                      focus:text-black 
                      transition-colors'
                />
                {profileErrors.location && <p className='text-red-400 text-sm'>{profileErrors.location.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type='submit'
                className='w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 shadow-lg shadow-violet-500/40 hover:shadow-cyan-400/50'
              >
                Update Profile
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Security */}
        {tab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='mt-8'
          >
            <h3 className='text-xl font-semibold mb-4'>Change Password</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
              <div>
                <label className='block text-sm mb-1 text-slate-300'>Current Password</label>
                <Input.Password
                  {...register('currentPassword', { required: 'Required' })}
                  style={{ boxShadow: 'none' }} //Tắt bóng sáng focus
                  className='w-full px-4 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white [&>input]:text-white [&>input:focus]:text-black transition-colors
                    !shadow-none focus:!shadow-none'
                />
                {errors.currentPassword && <p className='text-red-400 text-sm'>{errors.currentPassword.message}</p>}
              </div>

              <div>
                <label className='block text-sm mb-1 text-slate-300'>New Password</label>
                <Input.Password
                  {...register('newPassword', {
                    required: 'Required',
                    minLength: { value: 6, message: 'Min 6 chars' }
                  })}
                  style={{ boxShadow: 'none' }} //Tắt bóng sáng focus
                  className='w-full px-4 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white [&>input]:text-white [&>input:focus]:text-black transition-colors
                    !shadow-none focus:!shadow-none'
                />
                {errors.newPassword && <p className='text-red-400 text-sm'>{errors.newPassword.message}</p>}
              </div>

              <div>
                <label className='block text-sm mb-1 text-slate-300'>Confirm Password</label>
                <Input.Password
                  {...register('confirmPassword', {
                    validate: (val) => val === watch('newPassword') || 'Passwords do not match'
                  })}
                  style={{ boxShadow: 'none' }} //Tắt bóng sáng focus
                  className='w-full px-4 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white [&>input]:text-white [&>input:focus]:text-black transition-colors
                    !shadow-none focus:!shadow-none'
                />
                {errors.confirmPassword && <p className='text-red-400 text-sm'>{errors.confirmPassword.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type='submit'
                className='w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 shadow-lg shadow-violet-500/40 hover:shadow-cyan-400/50'
              >
                Update Password
              </motion.button>
            </form>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
