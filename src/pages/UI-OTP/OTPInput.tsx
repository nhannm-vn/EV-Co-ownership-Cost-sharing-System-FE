import { ArrowLeftOutlined, CheckCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import authApi from '../../apis/auth.api'
import Skeleton from '../../components/Skeleton'
import path from '../../constants/path'
import { useOTPLogic } from '../../hooks/useOTPInput'

// Props của component - hoàn toàn độc lập
interface OTPInputProps {
  length?: number
  email?: string
}

function OTPInput({ length = 6 }: OTPInputProps) {
  // Sử dụng custom hook để quản lý tất cả logic
  // hàm xử lí khi xác thực OTP

  const location = useLocation()

  const { message, email, type: initialType } = location.state || { message: '', email: '', type: '' }
  const [type, setType] = useState<string>(initialType || '')

  const navigate = useNavigate()
  const OTPMutation = useMutation({
    mutationFn: (otp: string) =>
      authApi.verifyOTP({
        otp: otp,
        type: type
      })
  })
  const handleVerify = (otp: string) => {
    OTPMutation.mutate(otp, {
      onSuccess: (response) => {
        // console.log('OTP verified successfully:', response.data)
        // console.log(response.data?.accessToken)
        if (type === 'REGISTRATION') {
          toast.success('Xác thực OTP thành công', {
            autoClose: 1000
          })

          navigate(path.login)
        } else if (type === 'PASSWORD_RESET') {
          toast.success('Xác thực OTP thành công, vui lòng đặt lại mật khẩu mới', {
            autoClose: 1000
          })
          console.log(response.data?.resetToken)

          navigate(path.resetPassword, {
            state: {
              resetToken: response.data?.resetToken // chuyền resetToken qua trang đặt lại mật khẩu mới
            }
          })
        }
      }
    })
  }

  const {
    otp,
    countdown,
    canResend,
    checkComplete,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    resetOTP,
    handleBack
  } = useOTPLogic({ length, onComplete: handleVerify })

  const isVerifying = OTPMutation.isPending

  // console.log(message, email)

  // resend OTP
  const resendOTPMutation = useMutation({
    mutationFn: (email: string) => authApi.resendOTP({ email: email, type: type })
  })

  const handleResend = () => {
    if (!email) {
      toast.error('Email không tồn tại, không thể gửi lại OTP', {
        autoClose: 1000
      })
      return
    }
    resetOTP()
    resendOTPMutation.mutate(email, {
      onSuccess: (response) => {
        toast.success('Mã OTP đã được gửi lại', {
          autoClose: 1000
        })
        if (response.data?.type) {
          setType(response.data.type)
        }
      },
      onError: () =>
        toast.error('Gửi lại OTP thất bại, vui lòng thử lại', {
          autoClose: 1000
        })
    })
  }

  return OTPMutation.isPending ? (
    <Skeleton />
  ) : (
    <div className='min-h-screen bg-gradient-to-br from-[#0d2524] to-[#0f3433] flex flex-col items-center justify-center p-4 font-sans'>
      {/* Container chính */}
      <div className='relative w-full max-w-md'>
        {/* Nút Back - Vị trí chuẩn UX: Top-left corner */}
        <button
          onClick={handleBack}
          className='absolute top-6 left-6 w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 transition-colors group'
        >
          <ArrowLeftOutlined className='text-base group-hover:transform group-hover:-translate-x-0.5 transition-all duration-300' />

          {/* Tooltip chuẩn UX */}
          <div className='absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-slate-800/95 backdrop-blur-sm text-cyan-300 text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-cyan-400/30 shadow-lg whitespace-nowrap'>
            Quay lại
            <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800/95 border-l border-t border-cyan-400/30 rotate-45'></div>
          </div>
        </button>

        {/* Header - Centered content */}
        <div className='text-center mb-8'>
          <div className='mb-6'>
            <div className='w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-teal-500/20'>
              <CheckCircleOutlined className='text-4xl text-white' />
            </div>
            <h1 className='text-2xl font-bold text-white mb-2'>Xác thực OTP</h1>
            <p className='text-teal-300 font-semibold text-base'>
              {message} : {email}
            </p>
          </div>

          {/* Input Fields - UI viết inline, không tách component */}
          <div className='flex justify-center gap-3 mb-8'>
            {otp.map((digit, index) => (
              <input
                key={index}
                // gán tham chiều vào ô input này vào mảng inputRefs( để sau có thể focus và quay lại giữa các ô khi bấm Backspace)
                ref={(element) => {
                  inputRefs.current[index] = element
                }}
                // chỉ cho nhập số
                type='tel'
                // mỗi ô 1 kí tự
                maxLength={1}
                // giá trị trong mảng OTP
                value={digit}
                // khi người dùng nhập hàm dùng hàm handleChange
                onChange={(e) => handleChange(index, e.target.value)}
                // gọi hàm handleKeyDown xử lí backSpace
                onKeyDown={(e) => handleKeyDown(index, e)}
                // dùng khi người dùng copy dán
                onPaste={handlePaste}
                className={`
        w-12 h-14 text-center text-xl font-bold border-2 rounded-xl
        bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-500
        transition-all duration-300 focus:outline-none
        
        ${
          //  nếu đã nhập kí tự thì viền màu xanh và có shadow, chưa nhập thì viền xám và hover có hiệu ứng
          digit
            ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-slate-700/70'
            : 'border-slate-600 hover:border-slate-500 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
        }
      `}
                placeholder=''
                // hỗ trợ tự động điền trên mobile
                autoComplete='one-time-code'
              />
            ))}
          </div>

          {/* Nút xác thực */}
          <button
            // background nút theo gradient
            type='button'
            // luôn bật chứ không làm vô hiệu nó đi (nhưng vẫn check complete để style)
            disabled={!checkComplete(otp) || isVerifying}
            onClick={() => handleVerify(otp.join(''))}
            className={`
    w-full h-12 rounded-xl font-semibold text-base mb-6 border-0 transition-all duration-300 relative overflow-hidden
    ${
      checkComplete(otp)
        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-[0_0_20px_rgba(6,182,212,0.4)] text-white cursor-pointer'
        : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-gray-300 cursor-not-allowed'
    }
    ${isVerifying ? 'opacity-80' : ''}
  `}
          >
            {/* thêm cái này hiển thị vòng xoay xoay khi đang verify */}
            {isVerifying && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                Đang xác thực...
              </div>
            )}
            {!isVerifying && 'Xác thực OTP'}
          </button>

          {/* Phần gửi lại */}
          <div className='text-center'>
            {canResend ? (
              <button
                onClick={handleResend}
                className='text-cyan-400 hover:text-cyan-300 font-semibold text-sm flex items-center justify-center gap-2 mx-auto transition-colors'
              >
                <ReloadOutlined />
                Gửi lại mã OTP
              </button>
            ) : (
              <p className='text-slate-400 text-sm'>
                Gửi lại sau <span className='text-cyan-400 font-semibold'>{countdown}s</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTPInput
