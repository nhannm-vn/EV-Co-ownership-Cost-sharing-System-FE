import { yupResolver } from '@hookform/resolvers/yup'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { changePasswordSchema, type ChangePasswordSchema } from '../../utils/rule'
import FieldInput from './components/FieldInput'

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema)
  })

  //state logic giúp xử lí đóng bật xem mật khẩu
  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  })

  //field này sẽ là một trong "currentPassword" | "newPassword" | "confirmPassword"
  //con mắt của thằng nào bị chạm vào thì sẽ setState lại
  const toggleShow = (field: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const onSubmit = (data: ChangePasswordSchema) => {
    console.log('Form Submitted:', data)
    // TODO: call API đổi mật khẩu
  }

  return (
    <div
      className='min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 p-6'
    >
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md bg-white/10 backdrop-blur-xl 
                   rounded-2xl shadow-2xl border border-white/10 p-8 space-y-6'
      >
        <h2
          className='text-2xl font-bold text-center 
                       bg-gradient-to-r from-indigo-400 to-purple-400 
                       bg-clip-text text-transparent'
        >
          Đổi mật khẩu
        </h2>

        <div className='space-y-4'>
          <FieldInput
            label='Current Password'
            name='currentPassword'
            type='currentPassword'
            register={register}
            show={show}
            toggleShow={toggleShow}
            error={errors.currentPassword?.message}
          />
          <FieldInput
            label='New Password'
            name='newPassword'
            type='newPassword'
            register={register}
            show={show}
            toggleShow={toggleShow}
            error={errors.newPassword?.message}
          />
          <FieldInput
            label='Confirm Password'
            name='confirmPassword'
            type='confirmPassword'
            register={register}
            show={show}
            toggleShow={toggleShow}
            error={errors.confirmPassword?.message}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type='submit'
          className='w-full py-3 rounded-xl font-semibold text-white 
                     bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-600
                     shadow-lg shadow-purple-900/40 hover:shadow-purple-700/60 transition-all'
        >
          Xác nhận đổi mật khẩu
        </motion.button>
      </motion.form>
    </div>
  )
}
