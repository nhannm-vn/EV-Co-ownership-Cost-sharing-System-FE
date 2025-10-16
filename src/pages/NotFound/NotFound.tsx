import { FaCarSide } from 'react-icons/fa'
import { Link } from 'react-router'

export default function NotFound() {
  return (
    <main className='relative flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-teal-200 via-white to-emerald-100 overflow-hidden'>
      {/* Hiệu ứng background mờ */}
      <div className='absolute -top-20 -left-20 h-72 w-72 rounded-full bg-teal-300 opacity-30 blur-3xl'></div>
      <div className='absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-emerald-400 opacity-30 blur-3xl'></div>

      {/* Mã lỗi */}
      <h1 className='text-[8rem] font-extrabold tracking-widest text-emerald-700 drop-shadow-lg'>404</h1>

      {/* Thông báo */}
      <div className='relative mt-4 rotate-3 rounded bg-emerald-600 px-4 py-1 text-sm font-semibold text-white shadow-lg'>
        Page Not Found
      </div>

      {/* Icon xe điện */}
      <FaCarSide className='mt-6 text-emerald-500 animate-bounce text-6xl drop-shadow-md' />

      {/* Nút quay về */}
      <Link
        to='/'
        className='mt-10 group relative inline-block text-sm font-semibold text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-400'
      >
        <span className='absolute inset-0 translate-x-1.5 translate-y-1.5 bg-emerald-400 transition-transform group-hover:translate-x-0 group-hover:translate-y-0 rounded-lg' />
        <span className='relative block border border-emerald-700 bg-white px-10 py-3 rounded-lg shadow-md'>
          <span className='flex items-center gap-2'>
            <FaCarSide className='text-emerald-500' />
            Go Home
          </span>
        </span>
      </Link>
    </main>
  )
}
