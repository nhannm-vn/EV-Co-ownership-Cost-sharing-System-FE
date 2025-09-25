import { Link } from 'react-router'

export default function Login() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-400 via-white to-teal-500 flex items-center justify-center '>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 min-h-[650px] rounded-2xl overflow-hidden shadow-2xl'>
          {/* Left image */}
          <div className='bg-[url("/src/assets/abec5c14-53b6-4b29-bf4d-04dabd4233ec.png")] bg-cover bg-center hidden lg:block'></div>

          {/* Right form */}
          <div className='flex items-center justify-center bg-gradient-to-br from-slate-800/70 to-slate-900/80 backdrop-blur-md p-10'>
            <form className='w-full max-w-xl space-y-6 animate-fadeInUp'>
              <h2 className='text-4xl font-extrabold text-center text-ev drop-shadow-lg'>Welcome Back</h2>
              <p className='text-center text-gray-300'>Login to your account</p>

              {/* Email */}
              <div>
                <label className='text-left block mb-2 text-sm font-medium text-gray-300'>Email</label>
                <input
                  type='email'
                  className='w-full rounded-lg border border-gray-600 bg-slate-800/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ev transition'
                  placeholder='Enter your email'
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className='text-left block mb-2 text-sm font-medium text-gray-300'>Password</label>
                <input
                  type='password'
                  className='w-full rounded-lg border border-gray-600 bg-slate-800/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-ev transition'
                  placeholder='Enter your password'
                  required
                />
              </div>

              {/* Button */}
              <button
                type='submit'
                className='w-full rounded-lg bg-gradient-to-r from-ev to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg hover:scale-[1.02] hover:shadow-ev/40 transition-transform duration-300'
              >
                Login
              </button>

              <p className='text-center text-sm text-gray-400'>
                Don’t have an account?{' '}
                <Link to='/register' className='text-ev hover:underline'>
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
