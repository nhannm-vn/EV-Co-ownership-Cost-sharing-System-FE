import classNames from 'classnames'
import { Link, NavLink, useLocation } from 'react-router'

function RegisterHeader() {
  // Lấy route hiện tại trên đường dẫn để active trang home
  const route = useLocation()

  return (
    <header className='bg-white top-0 z-50 overflow-x-auto'>
      <div className='flex justify-between items-center px-6'>
        <Link to='/' className='flex w-28 h-28 items-center mr-24'>
          <img
            src='src/assets/z7049220448378_8b2ec9fc4f2ed8a19a620e26db5eb64f.jpg'
            alt='logo'
            className='block w-full h-full object-contain'
          />
          <div className='ml-2 text-lg font-semibold text-black text-[14px]'>EVShare</div>
        </Link>

        <div className='flex  justify-between items-center'>
          <NavLink
            to='/login'
            className={({ isActive }) =>
              classNames(
                ' font-semibold text-center w-32 text-[14px] px-5 py-3 rounded  transition duration-300 hover:bg-[#17a984] mr-2',
                {
                  'text-[#fff] bg-gradient-to-r from-ev to-cyan-500 px-6': isActive,
                  'text-gray-600': !isActive
                }
              )
            }
          >
            Login
          </NavLink>
          <NavLink
            to='/register'
            className={({ isActive }) =>
              classNames(
                ' font-semibold  text-center w-32 text-[14px] px-5 py-3 rounded transition duration-300  hover:bg-[#17a984]',
                {
                  'text-[#fff] bg-gradient-to-r from-ev to-cyan-500 px-6': isActive,
                  'text-gray-600': !isActive,
                  'text-[#fff] bg-gradient-to-r from-ev to-cyan-500 px-6 ': route.pathname === '/'
                }
              )
            }
          >
            Register
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default RegisterHeader
