import { Link } from 'react-router'

function RegisterHeader() {
  return (
    <header className='bg-[#0000] sticky top-0 z-50'>
      <div className='flex justify-between items-center px-6'>
        <div className='flex w-14 h-14 items-center '>
          <img src='src\assets\RegisterLogo.png' alt='logo' className='block w-full h-full object-contain' />
          <span className='ml-2 text-lg font-semibold text-black text-[14px]'>EVShare</span>
        </div>

        <div className='flex  justify-between items-center'>
          <Link to='/' className='text-[#1CC29F] px-6 py-2 rounded'>
            Login
          </Link>
          <Link to='/' className='text-[#fff] font-semibold bg-[#1CC29F] w-32 text-[14px] px-6 py-2 rounded'>
            Registration
          </Link>
        </div>
      </div>
    </header>
  )
}

export default RegisterHeader
