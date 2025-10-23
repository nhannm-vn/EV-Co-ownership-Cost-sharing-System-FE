import { useQuery } from '@tanstack/react-query'
import { NavLink, useParams } from 'react-router-dom'
import groupApi from '../../apis/group.api'
import type { GroupItem } from '../../types/api/group.type'

export default function CoOwnerSideBar() {
  const base =
    'flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-400 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cyan-300/50 backdrop-blur-lg'

  const { groupId } = useParams<{ groupId: string }>()

  const idGroupQuery = useQuery({
    queryKey: ['id-groups', groupId],
    queryFn: () => groupApi.getGroupById(groupId as string),
    enabled: !!groupId
  })

  const group: GroupItem = idGroupQuery?.data?.data as GroupItem

  const navItems = [
    { to: `viewGroups/${group?.groupId}/dashboardGroup`, label: 'Group Setup' },
    { to: `viewGroups/${group?.groupId}/createContract`, label: 'Create Contract', end: true },
    { to: `viewGroups/${group?.groupId}/viewMembers`, label: 'View Members' },
    { to: `viewGroups/${group?.groupId}/ownershipPercentage`, label: 'Enter Co-ownership Percentage' },
    { to: `viewGroups/${group?.groupId}/ownershipRatio`, label: 'Ownership Ratio' }
  ]

  return (
    <aside aria-label='Navbar' className='col-span-1 mb-6 mt-6'>
      <ul className='flex flex-row items-center gap-3 overflow-x-auto whitespace-nowrap'>
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) => {
                const activeClasses =
                  'bg-gradient-to-r from-cyan-400 to-sky-500 text-white shadow-[0_8px_25px_rgba(6,182,212,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]'
                const inactiveClasses =
                  'bg-white/90 text-gray-800 hover:bg-white hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'

                return `${base} ${isActive ? activeClasses : inactiveClasses}`
              }}
            >
              {({ isActive }) => (
                <span className={isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]' : ''}>{item.label}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
