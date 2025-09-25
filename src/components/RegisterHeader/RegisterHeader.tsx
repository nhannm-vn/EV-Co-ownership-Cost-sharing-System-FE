import { Link } from 'react-router'

function RegisterHeader() {
  return (
    <header className='bg-white top-0 z-50 p-1 overflow-x-auto'>
      <div className='flex justify-between items-center px-6'>
        <div className='flex w-24 h-24 items-center mr-24'>
          <img src='src\assets\RegisterLogo.png' alt='logo' className='block w-full h-full object-contain' />
          <div className='ml-2 text-lg font-semibold text-black text-[14px]'>EVShare</div>
        </div>

        <div className='flex  justify-between items-center'>
          <Link to='/' className='text-[#1CC29F] px-6 py-2 rounded'>
            Login
          </Link>
          <Link
            to='/'
            className='text-[#fff] font-semibold bg-[#1CC29F] text-center w-32 text-[14px] px-5 py-3 rounded transition duration-300 hover:bg-[#17a984]'
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  )
}

export default RegisterHeader
