import { ArrowLeftOutlined, ReloadOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useOTPLogic } from '../../hooks/useOTPInput'

// Props của component - hoàn toàn độc lập
interface OTPInputProps {
  length?: number
  email?: string
}

function OTPInput({ length = 6, email = 'user***@gmail.com' }: OTPInputProps) {
  // Sử dụng custom hook để quản lý tất cả logic
  const {
    otp,
    countdown,
    canResend,
    isVerifying,
    checkComplete,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleResend,
    handleVerify,
    handleBack
  } = useOTPLogic({ length })

  return (
    // min-h-screen chiều cao tối thiểu (full Page)
    // bg-gradient-to-br nền chạy từ trái sang br là botton right

    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      {/* Container chính */}
      <div className='relative w-full max-w-md'>
        {/* Nút Back - Vị trí chuẩn UX: Top-left corner */}
        <button
          onClick={handleBack}
          className='group absolute -top-6 -left-6 w-11 h-11 rounded-xl bg-gradient-to-br from-slate-700/90 to-slate-800/95 backdrop-blur-md border border-slate-500/40 hover:border-cyan-400/60 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 z-10'
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
            <div className='w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(6,182,212,0.3)]'>
              <CheckCircleOutlined className='text-2xl text-white' />
            </div>
            <h1 className='text-2xl font-bold text-white mb-2'>Xác thực OTP</h1>
            <p className='text-slate-300 text-sm'>
              Nhập mã 6 số được gửi đến
              <br />
              <span className='text-cyan-400 font-semibold'>{email}</span>
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
            onClick={() => handleVerify()}
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
            <p className='text-slate-300 text-sm mb-2'>Không nhận được mã?</p>

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

        {/* Footer */}
        <div className='text-center mt-6'>
          <p className='text-slate-400 text-xs'>
            Bằng cách tiếp tục, bạn đồng ý với{' '}
            <span className='text-cyan-400 hover:text-cyan-300 cursor-pointer'>Điều khoản dịch vụ</span> của chúng tôi
          </p>
        </div>
      </div>
    </div>
  )
}

export default OTPInput
