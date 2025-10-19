import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from '../../apis/auth.api'
import path from '../../constants/path'
import { resetPasswordSchema, type ResetPasswordType } from '../../utils/rule'

interface IResetPassword {
  resetToken: string
  newPassword: string
  confirmPassword: string
}

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordType>({
    resolver: yupResolver(resetPasswordSchema)
  })

  const resetPasswordMutation = useMutation({
    mutationFn: (body: IResetPassword) => authApi.resetPassword(body)
  })

  const navigate = useNavigate()

  const location = useLocation()

  const onSubmit = handleSubmit((data) => {
    resetPasswordMutation.mutate(
      {
        resetToken: location.state?.resetToken, //
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      },
      {
        onSuccess: (response) => {
          toast.success(response.data.message, {
            autoClose: 1000
          })
          navigate(path.login)
        },
        onError: (error) => {
          console.log('Reset password failed:', error)
        }
      }
    )
  })

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-300 via-teal-400 to-blue-400'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-md rounded-2xl shadow-2xl bg-slate-900/80 backdrop-blur-lg px-10 py-12 flex flex-col items-center'
      >
        <img src='src/assets/z7052214352472_9110bb340043f5ad4f507f5a29909fc3.png' alt='logo' className='w-14 mb-3' />
        <h2 className='text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-indigo-400 mb-3'>
          Reset your password
        </h2>
        <p className='text-gray-300 text-center mb-8'>Nhập mật khẩu mới của bạn bên dưới.</p>

        <form className='w-full flex flex-col gap-4' onSubmit={onSubmit}>
          <div>
            <label className='block text-sm text-gray-300 mb-2'>Mật khẩu mới</label>
            <input
              type='password'
              {...register('newPassword')}
              className='w-full px-4 py-3 rounded-lg border border-gray-600 bg-slate-800/80 text-white focus:ring-2 focus:ring-cyan-400 outline-none'
              placeholder='Nhập mật khẩu mới'
            />
            {errors.newPassword && <p className='text-red-400 text-xs mt-1'>{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className='block text-sm text-gray-300 mb-2'>Nhập lại mật khẩu</label>
            <input
              type='password'
              {...register('confirmPassword')}
              className='w-full px-4 py-3 rounded-lg border border-gray-600 bg-slate-800/80 text-white focus:ring-2 focus:ring-indigo-400 outline-none'
              placeholder='Xác nhận lại mật khẩu'
            />
            {errors.confirmPassword && <p className='text-red-400 text-xs mt-1'>{errors.confirmPassword.message}</p>}
          </div>

          <button
            type='submit'
            className='w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-white font-bold shadow mt-6 hover:scale-[1.04] transition'
          >
            Đổi mật khẩu
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default ResetPassword
