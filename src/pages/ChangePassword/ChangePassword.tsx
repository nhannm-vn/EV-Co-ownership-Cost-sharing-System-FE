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
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema)
  })

  const [show, setShow] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  })

  const toggleShow = (field: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const navigate = useNavigate()

  const changePasswordMutation = useMutation({
    mutationFn: (body: ChangePasswordSchema) => authApi.changePassword(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log('Change password payload:', data)

    changePasswordMutation.mutate(data, {
      onSuccess: (response) => {
        console.log('Change password success:', response)
        toast.success('Change password successful', {
          autoClose: 1000
        })
        navigate(path.dashBoard)
      },
      onError: (error) => {
        console.log('Change password failed:', error)
        toast.error('Change password failed', {
          autoClose: 1000
        })
      }
    })
  })

  return (
    <div className='min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-600 relative overflow-hidden'>
      {/* Holographic Background Effects */}
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

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='relative z-10 w-full max-w-md'
      >
        {/* Form */}
        <form
          onSubmit={onSubmit}
          className='relative backdrop-blur-[60px] bg-gradient-to-br from-white/22 via-white/16 to-white/20 rounded-[2rem] shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] border-[4px] border-white/60 p-8 space-y-8 overflow-hidden'
        >
          {/* Top Gradient Bar */}
          <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />

          {/* Header Section */}
          <HeaderSection />

          {/* Input Fields */}
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
              <div className='flex-1 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent' />
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none' className='text-cyan-200/60'>
                <path d='M12 5v14M5 12h14' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
              </svg>
              <div className='flex-1 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent' />
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

          {/* Submit Button */}
          <Button />

          {/* Bottom Gradient Bar */}
          <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
        </form>
      </motion.div>
    </div>
  )
}
