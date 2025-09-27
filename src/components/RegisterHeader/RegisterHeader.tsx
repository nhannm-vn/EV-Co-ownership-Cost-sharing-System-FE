import classNames from 'classnames'
import { Link, NavLink, useLocation } from 'react-router'
import path from '../../constants/path'

function RegisterHeader() {
  // Lấy route hiện tại trên đường dẫn để active trang home
  const route = useLocation()

  return (
    <header className='bg-white top-0 z-50 overflow-x-auto'>
      <div className='flex justify-between items-center px-6'>
        <Link to={path.home} className='flex w-28 h-28 items-center mr-24'>
          <img
            src='src/assets/z7052214352472_9110bb340043f5ad4f507f5a29909fc3.png'
            alt='logo'
            className='block w-full h-full object-contain'
          />
          <div className='ml-2 text-lg font-semibold text-black text-[14px]'>EVShare</div>
        </Link>

        <div className='flex  justify-between items-center'>
          <NavLink
            to={path.login}
            className={({ isActive }) =>
              classNames(
                ' font-semibold border border-gray-300 text-center w-32 text-[14px]  py-3 rounded-lg  transition duration-300 hover:bg-[#17a984] mr-2',
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
            to={path.register}
            className={({ isActive }) =>
              classNames(
                ' font-semibold border border-gray-300 text-center w-32 text-[14px] py-3 rounded-lg transition duration-300  hover:bg-[#17a984]',
                {
                  'text-[#fff] bg-gradient-to-r from-ev to-cyan-500 px-6': isActive,
                  'text-gray-600': !isActive,
                  'text-[#fff] bg-gradient-to-r from-ev to-cyan-500 px-6 ': route.pathname === path.home
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
