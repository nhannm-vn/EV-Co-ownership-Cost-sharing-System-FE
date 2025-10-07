import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Profile from './components/Profile'
import ChangePassword from './components/ChangePassword'

const currentUser = {
  id: 99,
  name: 'Nguyen Minh Nhan',
  email: 'nhamnmse182080@fpt.edu.vn',
  phone: '0947474747',
  dob: '2004-17-17',
  location: 'Rach Gia',
  avatar: 'src/assets/react.svg',
  role: 'Co-owner'
}

export type ChangePasswordInputs = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export type ProfileInputs = {
  name: string
  phone: string
  dob: string
  location: string
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

  // Security form
  const {
    register: registerChangePassword,
    handleSubmit: handleChangePasswordSubmit,
    watch,
    formState: { errors: changePasswordErrors }
  } = useForm<ChangePasswordInputs>()

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
          <Profile
            handleProfileSubmit={handleProfileSubmit}
            registerProfile={registerProfile}
            profileErrors={profileErrors}
            setValue={setValue}
          />
        )}

        {/* Security */}
        {tab === 'security' && (
          <ChangePassword
            handleChangePasswordSubmit={handleChangePasswordSubmit}
            registerChangePassword={registerChangePassword}
            changePasswordErrors={changePasswordErrors}
            watch={watch}
          />
        )}
      </motion.div>
    </div>
  )
}
