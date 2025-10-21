import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../contexts/app.context'

export default function CoOwnerSideBar() {
  const base =
    'flex items-center rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30'

  const { groupId } = useContext(AppContext)
  console.log(groupId)

  return (
    <aside aria-label='Navbar' className='col-span-1'>
      <div className='bg-transparent'>
        <ul className='flex flex-row items-center gap-2 overflow-x-auto whitespace-nowrap'>
          <li>
            <NavLink
              to={`viewGroups/${groupId}/dashboardGroup`}
              className={({ isActive }) =>
                [
                  base,
                  'text-slate-200 hover:bg-white/10 hover:text-white',
                  isActive ? 'bg-white/20 text-white' : ''
                ].join(' ')
              }
            >
              <span>Group Setup</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`viewGroups/${groupId}/createContract`}
              end
              className={({ isActive }) =>
                [
                  base,
                  'text-slate-200 hover:bg-white/10 hover:text-white',
                  isActive ? 'bg-white/20 text-white' : ''
                ].join(' ')
              }
            >
              <span>Create Contract</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`viewGroups/${groupId}/viewMembers`}
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
              to={`viewGroups/${groupId}/ownershipPercentage`}
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
              to={`viewGroups/${groupId}/ownershipRatio`}
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
