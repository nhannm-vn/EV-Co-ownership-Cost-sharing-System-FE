import { Link, NavLink } from 'react-router'
import path from '../../constants/path'
import classNames from 'classnames'

export default function LearnmoreHeader() {
  return (
    <header className='bg-black top-0 z-50 overflow-x-auto '>
      <div className='flex justify-between items-center px-6'>
        <Link to={path.home} className='flex w-28 h-28 items-center mr-24 hover:scale-90 transition-transform'>
          <img src='src/assets/black.png' alt='logo' className='block w-full h-full object-contain' />
          <div className='ml-2 text-lg font-semibold text-slate-100 text-[14px]'>EVShare</div>
        </Link>

        <div className='flex  justify-between items-center'>
          <NavLink
            to={path.learnMore}
            className={({ isActive }) =>
              classNames(
                ' font-semibold text-center w-32 text-[14px]  py-3 rounded-lg  transition duration-300 hover:bg-red-600 mr-2',
                {
                  'bg-red-600 text-[#fff]': isActive,
                  'text-[#fff]': !isActive
                }
              )
            }
          >
            FAQ'S
          </NavLink>
          <NavLink
            to={path.home.concat('#about')}
            className={({ isActive }) =>
              classNames(
                ' font-semibold text-center w-32 text-[14px] py-3 rounded-lg transition duration-300  hover:bg-red-600',
                {
                  'bg-red-600': isActive,
                  'text-[#fff]': !isActive
                }
              )
            }
          >
            ABOUT US
          </NavLink>
        </div>
      </div>
    </header>
  )
}
