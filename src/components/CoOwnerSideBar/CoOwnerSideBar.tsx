import { NavLink } from 'react-router-dom'

export default function CoOwnerSideBar() {
  const base =
    'flex items-center rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30'
  return (
    <aside aria-label='Navbar' className='col-span-1'>
      <div className='bg-transparent'>
        <ul className='flex flex-row items-center gap-2 overflow-x-auto whitespace-nowrap'>
          <li>
            <NavLink
              to='.'
              className={({ isActive }) =>
                [
                  base,
                  'text-slate-200 hover:bg-white/10 hover:text-white',
                  isActive ? 'bg-white/20 text-white' : ''
                ].join(' ')
              }
            >
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/group/createContract'
              end
              className={({ isActive }) =>
                [
                  base,
                  'text-slate-200 hover:bg-white/10 hover:text-white',
                  isActive ? 'bg-white/20 text-white' : ''
                ].join(' ')
              }
            >
              <span>Create Constract</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/group/viewMembers'
              className={({ isActive }) =>
                [
                  base,
                  'text-slate-200 hover:bg-white/10 hover:text-white',
                  isActive ? 'bg-white/20 text-white' : ''
                ].join(' ')
              }
            >
              <span>View Members</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/group/ownershipPercentage'
              className={({ isActive }) =>
                [
                  base,
                  'text-slate-200 hover:bg-white/10 hover:text-white',
                  isActive ? 'bg-white/20 text-white' : ''
                ].join(' ')
              }
            >
              <span>Enter Co-ownership Percentage</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/group/ownershipRatio'
              className={({ isActive }) =>
                [
                  base,
                  'text-slate-200 hover:bg-white/10 hover:text-white',
                  isActive ? 'bg-white/20 text-white' : ''
                ].join(' ')
              }
            >
              <span>Ownership Ratio</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  )
}
