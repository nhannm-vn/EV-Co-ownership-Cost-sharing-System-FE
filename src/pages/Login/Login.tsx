import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { motion } from 'framer-motion'
import path from '../../constants/path'
import { loginSchema, type LoginSchema } from '../../utils/rule'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import { setAccessTokenToLS } from '../../utils/auth'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema)
  })

  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  // loginMutation sử dụng react-query dùng để fetch api đăng ký tài khoảng
  const loginMutation = useMutation({
    mutationFn: (body: LoginSchema) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log('Payload gửi lên:', data)
    loginMutation.mutate(data, {
      // *Data trong onSuccess là data trả về từ server sau khi call api
      onSuccess: (data) => {
        console.log('Login thành công:', data)
        // Mục đích set luôn là để cho nó đồng bộ luôn chứ lúc đầu nó đâu có sẵn mà lấy từ LS
        //phải ctrl r mới có sẽ bị bất đồng bộ
        console.log(data.data.data?.accessToken)
        setAccessTokenToLS(data.data.data?.accessToken as string)
        setIsAuthenticated(true)
        navigate(path.dashBoard)
      },
      onError: (error) => {
        console.log('Login thất bại:', error)
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
          {/* Left image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='bg-[url("/src/assets/abec5c14-53b6-4b29-bf4d-04dabd4233ec.png")] bg-cover bg-center hidden lg:block'
          ></motion.div>

          {/* Right form */}
          <div className='flex items-center justify-center bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-lg p-10'>
            <motion.form
              onSubmit={onSubmit}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='w-full max-w-xl space-y-6'
            >
              <h2 className='text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-400 drop-shadow-lg'>
                Welcome Back
              </h2>
              <p className='text-center text-gray-300'>Login to your account</p>

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

              {/* Password */}
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-300'>Password</label>
                <input
                  {...register('password')}
                  type='password'
                  className='w-full rounded-lg border border-gray-600 bg-slate-800/50 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition'
                  placeholder='Enter your password'
                />
                {errors.password && <p className='text-red-400 text-sm mt-1'>{errors.password.message}</p>}
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34,211,238,0.6)' }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                className='w-full rounded-lg bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-300'
              >
                Login
              </motion.button>

              <p className='text-center text-sm text-gray-400'>
                Don’t have an account?{' '}
                <Link to={path.register} className='text-cyan-300 hover:underline'>
                  Sign up
                </Link>
              </p>
              <div className='text-center text-sm text-gray-400'>
                <Link to={path.forgotPassword} className='text-emerald-300 hover:underline'>
                  Forgot password?
                </Link>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
