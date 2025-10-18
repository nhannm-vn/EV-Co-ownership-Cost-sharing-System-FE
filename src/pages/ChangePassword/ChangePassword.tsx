import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import authApi from '../../apis/auth.api'
import { changePasswordSchema, type ChangePasswordSchema } from '../../utils/rule'
import Button from './components/Button/Button'
import FieldInput from './components/FieldInput'
import HeaderSection from './components/HeaderSection'
import { toast } from 'react-toastify'
import path from '../../constants/path'

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
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  })

  // Toggle ẩn/hiện cho từng field (current, new, confirm)
  const toggleShow = (field: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  // call API

  const navigate = useNavigate()

  const changePasswordMutation = useMutation({
    mutationFn: (body: ChangePasswordSchema) => authApi.changePassword(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log('Payload gửi lên:', data)

    changePasswordMutation.mutate(data, {
      onSuccess: (response) => {
        console.log('Change password thành công:', response)
        toast.success('Change password successful', {
          autoClose: 1000
        })
        navigate(path.dashBoard)
      },
      onError: (error) => {
        toast.error('Change password failed', {
          autoClose: 1000
        })
        console.log('Change password thất bại:', error)
      }
    })
  })

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002b36] via-[#014d4d] to-[#009688] p-6 relative overflow-hidden'>
      {/* Animated Background Effects */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className='absolute -top-20 -right-20 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl'
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className='absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl'
        />
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='relative z-10 w-full max-w-md'
      >
        {/* Glow Effect Background */}
        <div className='absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl' />

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className='relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl rounded-3xl border-2 border-teal-400/50 shadow-[0_0_60px_rgba(20,184,166,0.4)] p-8 space-y-8 overflow-hidden'
        >
          {/* Top Border Glow */}
          <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent' />

          {/* Bottom Corner Accent */}
          <div className='absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-teal-500/10 to-transparent rounded-tl-full' />

          {/* Header Section: chứa icon lock và title với hiệu ứng motion */}
          <HeaderSection />

          {/* Input Fields with Stagger Animation */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.4 }
              }
            }}
            className='space-y-5'
          >
            <motion.div variants={{ hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
              <FieldInput
                label='Old Password'
                name='oldPassword'
                type='oldPassword'
                register={register}
                show={show}
                toggleShow={toggleShow}
                error={errors.oldPassword?.message}
              />
            </motion.div>

            {/* Decorative Divider */}
            <div className='flex items-center gap-3 py-1'>
              <div className='flex-1 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent' />
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none' className='text-teal-400/50'>
                <path d='M12 5v14M5 12h14' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
              </svg>
              <div className='flex-1 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent' />
            </div>

            <motion.div variants={{ hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
              <FieldInput
                label='New Password'
                name='newPassword'
                type='newPassword'
                register={register}
                show={show}
                toggleShow={toggleShow}
                error={errors.newPassword?.message}
              />
            </motion.div>

            <motion.div variants={{ hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
              <FieldInput
                label='Confirm Password'
                name='confirmPassword'
                type='confirmPassword'
                register={register}
                show={show}
                toggleShow={toggleShow}
                error={errors.confirmPassword?.message}
              />
            </motion.div>
          </motion.div>

          {/* Submit Button with Shine Effect - Không cần custom CSS */}
          <Button />
        </form>
      </motion.div>
    </div>
  )
}
