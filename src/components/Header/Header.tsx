import { Link } from 'react-router'
import path from '../../constants/path'
import NavHeader from '../NavHeader'

export default function Header() {
  return (
    <header className='flex flex-row justify-between items-center px-6 py-1 bg-gradient-to-r from-[#0a1f2e] via-[#0d1b2a] to-[#111827] shadow-2xl border-b border-gray-800/50'>
      {/* Logo */}
      <Link to={path.dashBoard} className='flex w-28 h-28 items-center mr-24 transition-transform hover:scale-90'>
        <img
          src='src/assets/z7052214352472_9110bb340043f5ad4f507f5a29909fc3.png'
          alt='logo'
          className='block w-full h-full object-contain'
        />
        <div className='ml-2 text-lg font-bold text-gray-100 hover:text-teal-400 transition-colors duration-300'>
          EVShare
        </div>
      </Link>

      {/* NavHeader */}
      <NavHeader />
    </header>
  )
}
