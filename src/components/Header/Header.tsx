import { Link, useMatch } from 'react-router-dom'
import path from '../../constants/path'
import CoOwnerSideBar from '../CoOwnerSideBar'
import NavHeader from '../NavHeader'
import { LOGO_URL } from '../../constants/images'

export default function Header() {
  const isMatch = useMatch('/dashboard/viewGroups/:groupId/*')

  return (
    <header className='flex flex-row justify-between items-center px-6 py-1 bg-gradient-to-r bg-black shadow-2xl border-b border-gray-800/50'>
      {/* Logo */}
      <Link to={path.dashBoard} className='flex w-28 h-28 items-center mr-24 transition-transform hover:scale-90'>
        <img src={LOGO_URL.black} alt='logo' className='block w-full h-full object-contain' />
        <div className='ml-2 text-lg font-bold text-gray-100 hover:text-teal-400 transition-colors duration-300'>
          EVShare
        </div>
      </Link>

      {/* Chỉ hiển thị khi đang ở trang group detail */}
      {isMatch && <CoOwnerSideBar />}

      {/* NavHeader */}
      <NavHeader />
    </header>
  )
}
