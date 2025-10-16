import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import authApi from '../../apis/auth.api'
import path from '../../constants/path'
import { setAccessTokenToLS } from '../../utils/auth'
import { registerSchema, type RegisterSchema } from '../../utils/rule'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: yupResolver(registerSchema)
  })

  // const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const registerMutation = useMutation({
    mutationFn: (body: RegisterSchema) => authApi.register(body)
  })

  const onSubmit = handleSubmit((response: RegisterSchema) => {
    registerMutation.mutate(response, {
      onSuccess: (response) => {
        console.log('Register successfully:', response)
        console.log(response.data.accessToken)
        setAccessTokenToLS(response.data.accessToken as string)
        // setIsAuthenticated(true)
        navigate(path.OTP)
      }
    })
  })

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 via-cyan-500 to-indigo-600'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='container'
      >
        <div className='grid grid-cols-1 lg:grid-cols-2 min-h-[650px] rounded-3xl overflow-hidden shadow-2xl'>
          {/* Left form */}
          <div className='flex items-center justify-center bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-lg p-10'>
            <motion.form
              onSubmit={onSubmit}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='w-full max-w-xl space-y-6'
            >
              <h2 className='text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-400 drop-shadow-lg'>
                Create Account
              </h2>
              <p className='text-center text-gray-300'>Register a new account</p>

              {/* Full Name */}
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-300'>Full Name</label>
                <input
                  {...register('fullName')}
                  type='text'
                  className='w-full rounded-lg border border-gray-600 bg-slate-800/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition'
                  placeholder='Enter your full name'
                />
                {errors.fullName && <p className='text-red-400 text-sm mt-1'>{errors.fullName.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-300'>Email</label>
                <input
                  {...register('email')}
                  type='email'
                  className='w-full rounded-lg border border-gray-600 bg-slate-800/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition'
                  placeholder='Enter your email'
                />
                {errors.email && <p className='text-red-400 text-sm mt-1'>{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-300'>Phone</label>
                <input
                  {...register('phone')}
                  type='tel'
                  className='w-full rounded-lg border border-gray-600 bg-slate-800/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition'
                  placeholder='Enter your phone'
                />
                {errors.phone && <p className='text-red-400 text-sm mt-1'>{errors.phone.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-300'>Password</label>
                <input
                  {...register('password')}
                  type='password'
                  className='w-full rounded-lg border border-gray-600 bg-slate-800/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                  placeholder='Enter your password'
                />
                {errors.password && <p className='text-red-400 text-sm mt-1'>{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-300'>Confirm Password</label>
                <input
                  {...register('confirmPassword')}
                  type='password'
                  className='w-full rounded-lg border border-gray-600 bg-slate-800/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition'
                  placeholder='Enter the same password'
                />
                {errors.confirmPassword && (
                  <p className='text-red-400 text-sm mt-1'>{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34,211,238,0.6)' }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                className='w-full rounded-lg bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-300'
              >
                Register
              </motion.button>

              <p className='text-center text-sm text-gray-400'>
                Already have an account?{' '}
                <Link to={path.login} className='text-cyan-300 hover:underline'>
                  Sign in
                </Link>
              </p>
            </motion.form>
          </div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='bg-[url("src/assets/ev-scaled.jpg")] bg-cover bg-center hidden lg:block'
          ></motion.div>
        </div>
      </motion.div>
    </div>
  )
}
