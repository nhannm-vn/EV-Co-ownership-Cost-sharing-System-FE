export default function ForgotPassword() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mb-4'>
        <img src='src/assets/RegisterLogo.png' alt='Forgot Password' className='mx-auto w-24 h-24 object-contain' />
      </div>
      <div className='mb-6 text-center'>
        <h1 className='text-2xl font-bold mb-2'>Reset your password</h1>
        <p className='text-gray-600 text-sm'>Enter your email address and we'll send OTP to reset your password</p>
      </div>
      <div className='w-full max-w-xs bg-white p-6 rounded-lg shadow-md'>
        <div className='flex border-b border-gray-200 mb-5'>
          <label className='flex-1 py-2 font-bold border-b-2 border-teal-400 bg-transparent cursor-pointer text-gray-900'>
            E-mail
          </label>
        </div>
        <form>
          <label className='block mb-2 text-gray-700 text-sm font-medium'>Your email address</label>
          <input
            type='email'
            className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-300'
            placeholder='Enter your email'
            required
            name='email'
            autoComplete='email'
          />
          <button
            type='submit'
            className='w-full bg-teal-400 hover:bg-teal-500 text-white rounded-md py-2 font-bold text-lg transition-colors'
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  )
}
