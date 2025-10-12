import { yupResolver } from '@hookform/resolvers/yup'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { changePasswordSchema, type ChangePasswordSchema } from '../../utils/rule'
import FieldInput from './components/FieldInput'

export default function ChangePassword() {
  // Khởi tạo react-hook-form với schema validation từ Yup
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema)
  })

  // State quản lý ẩn/hiện password cho từng field
  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  })

  // Toggle ẩn/hiện cho từng field (current, new, confirm)
  const toggleShow = (field: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  // Hàm submit form
  const onSubmit = (data: ChangePasswordSchema) => {
    console.log('Form Submitted:', data)
    // TODO: gọi API đổi mật khẩu ở đây
  }

  return (
    <div
      // Nền gradient teal (xanh ngọc bích) đồng bộ với CreateGroups - năng lượng xe điện
      className='min-h-screen flex items-center justify-center 
                 bg-gradient-to-br from-[#002b36] via-[#014d4d] to-[#009688] p-6'
    >
      {/* Form có hiệu ứng motion fade-in + slide-up */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // Form trong suốt + bo tròn + border teal đậm + bóng mờ teal lung linh
        className='w-full max-w-md bg-white/5 backdrop-blur-xl 
                   rounded-2xl border-2 border-teal-400 
                   shadow-[0_0_35px_rgba(20,184,166,0.7)] 
                   p-8 space-y-6'
      >
        {/* Title của form */}
        <h2
          className='text-3xl font-extrabold text-center 
             text-white drop-shadow-[0_0_15px_rgba(94,234,212,0.6)] font-sans'
        >
          Change Password
        </h2>

        {/* Nhóm input */}
        <div className='space-y-4'>
          {/* Input mật khẩu hiện tại */}
          <FieldInput
            label='Current Password'
            name='currentPassword'
            type='currentPassword'
            register={register}
            show={show}
            toggleShow={toggleShow}
            error={errors.currentPassword?.message}
          />
          {/* Input mật khẩu mới */}
          <FieldInput
            label='New Password'
            name='newPassword'
            type='newPassword'
            register={register}
            show={show}
            toggleShow={toggleShow}
            error={errors.newPassword?.message}
          />
          {/* Input xác nhận mật khẩu */}
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

        {/* Nút submit */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type='submit'
          // Gradient teal đậm -> teal sáng, hover lung linh hơn
          className='w-full py-3 rounded-xl font-semibold text-white 
                     bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500
                     shadow-[0_0_25px_rgba(20,184,166,0.8)]
                     hover:shadow-[0_0_35px_rgba(94,234,212,0.9)]
                     hover:scale-[1.02] active:scale-95 transition-all'
        >
          Confirm
        </motion.button>
      </motion.form>
    </div>
  )
}
