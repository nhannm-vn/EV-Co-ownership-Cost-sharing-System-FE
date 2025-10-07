import { DatePicker, Input } from 'antd'
import { motion } from 'framer-motion'
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { type ProfileInputs } from '../../User'
import dayjs from 'dayjs'

interface Props {
  handleProfileSubmit: UseFormHandleSubmit<ProfileInputs, ProfileInputs>
  registerProfile: UseFormRegister<ProfileInputs>
  profileErrors: FieldErrors<ProfileInputs>
  setValue: UseFormSetValue<ProfileInputs>
}

export default function Profile({ handleProfileSubmit, registerProfile, profileErrors, setValue }: Props) {
  const onProfileSubmit = (data: ProfileInputs) => {
    console.log(data)
    alert('Profile info updated!')
  }

  return (
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
            defaultValue={dayjs('2004-17-17')}
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
  )
}
