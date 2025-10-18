import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import authApi from '../../apis/auth.api'
import { forgotPasswordSchema, type ForgotPasswordType } from '../../utils/rule'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router'
import path from '../../constants/path'

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordType>({
    resolver: yupResolver(forgotPasswordSchema)
  })
  const navigate = useNavigate()

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword({ email })
  })

  const onSubmit = handleSubmit((data: ForgotPasswordType) => {
    forgotPasswordMutation.mutate(data.email, {
      onSuccess: (response) => {
        console.log('Forgot password request successful:', response)
        navigate(path.OTP, {
          state: {
            message: response.data.message, //
            email: response.data.email,
            type: response.data.type
          }
        })
      }
    })
  })

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 font-sans'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='flex flex-col items-center justify-center p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl text-white w-[380px]'
      >
        {/* Logo */}
        <motion.img
          src='src/assets/z7052214352472_9110bb340043f5ad4f507f5a29909fc3.png'
          alt='Forgot Password'
          className='w-24 h-24 mb-5 object-contain'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />

        {/* Text */}
        <h1 className='text-2xl font-bold mb-2 bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent'>
          Reset your password
        </h1>
        <p className='text-sm text-gray-300 text-center mb-6'>
          Enter your email address and we’ll send an OTP to reset your password
        </p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='w-full'
        >
          <label className='block mb-2 text-gray-200 text-sm font-medium'>Your email address</label>
          <input
            type='email'
            className='w-full p-2 mb-4 rounded-md border border-gray-600 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
            placeholder='Enter your email'
            required
            autoComplete='email'
            {...register('email')}
          />
          {errors.email && <p className='text-red-400 text-sm mb-3'>{errors.email.message}</p>}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type='submit'
            onClick={onSubmit}
            className='w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-300 hover:to-blue-400 text-white font-bold py-2 rounded-md shadow-md transition-all'
          >
            {forgotPasswordMutation.isPending ? 'Sending...' : 'Reset Password'}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  )
}
