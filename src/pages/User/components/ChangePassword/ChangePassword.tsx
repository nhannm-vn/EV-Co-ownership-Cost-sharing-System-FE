import { motion } from 'framer-motion'
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from 'react-hook-form'
import type { ChangePasswordInputs } from '../../User'
import { Input } from 'antd'

interface Props {
  handleChangePasswordSubmit: UseFormHandleSubmit<ChangePasswordInputs, ChangePasswordInputs>
  registerChangePassword: UseFormRegister<ChangePasswordInputs>
  changePasswordErrors: FieldErrors<ChangePasswordInputs>
  watch: UseFormWatch<ChangePasswordInputs>
}

export default function ChangePassword({
  handleChangePasswordSubmit,
  changePasswordErrors,
  registerChangePassword,
  watch
}: Props) {
  const onChangePasswordSubmit = (data: ChangePasswordInputs) => {
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
      <h3 className='text-xl font-semibold mb-4'>Change Password</h3>
      <form onSubmit={handleChangePasswordSubmit(onChangePasswordSubmit)} className='space-y-5'>
        <div>
          <label className='block text-sm mb-1 text-slate-300'>Current Password</label>
          <Input.Password
            {...registerChangePassword('currentPassword', { required: 'Required' })}
            style={{ boxShadow: 'none' }} //Tắt bóng sáng focus
            className='w-full px-4 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white [&>input]:text-white [&>input:focus]:text-black transition-colors
          !shadow-none focus:!shadow-none'
          />
          {changePasswordErrors.currentPassword && (
            <p className='text-red-400 text-sm'>{changePasswordErrors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <label className='block text-sm mb-1 text-slate-300'>New Password</label>
          <Input.Password
            {...registerChangePassword('newPassword', {
              required: 'Required',
              minLength: { value: 6, message: 'Min 6 chars' }
            })}
            style={{ boxShadow: 'none' }} //Tắt bóng sáng focus
            className='w-full px-4 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white [&>input]:text-white [&>input:focus]:text-black transition-colors
          !shadow-none focus:!shadow-none'
          />
          {changePasswordErrors.newPassword && (
            <p className='text-red-400 text-sm'>{changePasswordErrors.newPassword.message}</p>
          )}
        </div>

        <div>
          <label className='block text-sm mb-1 text-slate-300'>Confirm Password</label>
          <Input.Password
            {...registerChangePassword('confirmPassword', {
              validate: (val) => val === watch('newPassword') || 'Passwords do not match'
            })}
            style={{ boxShadow: 'none' }} //Tắt bóng sáng focus
            className='w-full px-4 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white [&>input]:text-white [&>input:focus]:text-black transition-colors
          !shadow-none focus:!shadow-none'
          />
          {changePasswordErrors.confirmPassword && (
            <p className='text-red-400 text-sm'>{changePasswordErrors.confirmPassword.message}</p>
          )}
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
  )
}
