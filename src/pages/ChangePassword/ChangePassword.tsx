import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// 🔒 Yup schema validation
const schema = yup.object({
  currentPassword: yup.string().required('Vui lòng nhập mật khẩu hiện tại'),
  newPassword: yup.string().required('Vui lòng nhập mật khẩu mới').min(6, 'Mật khẩu mới phải ít nhất 6 ký tự'),
  confirmPassword: yup
    .string()
    .required('Vui lòng xác nhận mật khẩu')
    .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
})

type FormValues = yup.InferType<typeof schema>

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  })

  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  })

  const toggleShow = (field: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted:', data)
    // TODO: call API đổi mật khẩu
  }

  // 👁️ icon SVG
  const EyeIcon = ({ open }: { open: boolean }) =>
    open ? (
      <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
        />
      </svg>
    ) : (
      <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.957 9.957 0 012.669-4.045M9.88 9.88a3 3 0 104.24 4.24'
        />
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6.1 6.1L17.9 17.9' />
      </svg>
    )

  const Field = ({
    label,
    name,
    type,
    error
  }: {
    label: string
    name: keyof FormValues
    type: keyof typeof show
    error?: string
  }) => (
    <motion.div className='space-y-1'>
      <label className='text-sm text-gray-300'>{label}</label>
      <div className='relative'>
        <input
          type={show[type] ? 'text' : 'password'}
          {...register(name)}
          placeholder={label}
          className={`w-full px-4 py-3 rounded-xl 
                     bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950
                     border ${error ? 'border-red-500' : 'border-indigo-600/50'} 
                     text-white placeholder-gray-500
                     focus:outline-none focus:ring-2 ${
                       error ? 'focus:ring-red-400' : 'focus:ring-indigo-400'
                     } focus:border-transparent`}
        />
        <button
          type='button'
          onClick={() => toggleShow(type)}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-300'
        >
          <EyeIcon open={show[type]} />
        </button>
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className='text-xs text-red-400'>
          {error}
        </motion.p>
      )}
    </motion.div>
  )

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
          <Field
            label='Current Password'
            name='currentPassword'
            type='currentPassword'
            error={errors.currentPassword?.message}
          />
          <Field label='New Password' name='newPassword' type='newPassword' error={errors.newPassword?.message} />
          <Field
            label='Confirm Password'
            name='confirmPassword'
            type='confirmPassword'
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
