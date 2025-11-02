import { NavLink, Outlet } from 'react-router-dom'
import { getRoleFromLS } from '../../utils/auth'
import path from '../../constants/path'

export default function AdminDashboard() {
  const role = getRoleFromLS()
  return (
    <div className='grid min-h-screen grid-cols-4'>
      <aside className='col-span-1' aria-label='Sidebar'>
        <div className='flex h-full flex-col overflow-y-auto bg-gray-100 py-2 mt-4 px-3 shadow-lg'>
          <ul className='space-y-2'>
            <li>
              <NavLink
                to=''
                end
                className={({ isActive }) => {
                  const activeClass = isActive ? 'bg-gray-300' : ''
                  return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
                }}
              >
                {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>CheckGroup</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={path.checkLicense}
                className={({ isActive }) => {
                  const activeClass = isActive ? 'bg-gray-300' : ''
                  return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
                }}
              >
                {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>CheckLicense</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={path.checkBooking}
                className={({ isActive }) => {
                  const activeClass = isActive ? 'bg-gray-300' : ''
                  return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
                }}
              >
                {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>CheckBooking</span>}
              </NavLink>
            </li>
            {role === 'ADMIN' && (
              <li>
                <NavLink
                  to='checkContract'
                  className={({ isActive }) => {
                    const activeClass = isActive ? 'bg-gray-300' : ''
                    return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
                  }}
                >
                  {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>CheckContract</span>}
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </aside>
      <main className='col-span-3 h-full py-4 px-3'>
        <Outlet />
      </main>
    </div>
  )
}
