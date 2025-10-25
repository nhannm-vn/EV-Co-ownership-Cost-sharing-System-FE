import { useQuery } from '@tanstack/react-query'
import { NavLink, useParams } from 'react-router-dom'
import groupApi from '../../apis/group.api'
import type { GroupItem } from '../../types/api/group.type'

export default function CoOwnerSideBar() {
  const { groupId } = useParams<{ groupId: string }>()

  const idGroupQuery = useQuery({
    queryKey: ['id-groups', groupId],
    queryFn: () => groupApi.getGroupById(groupId as string),
    enabled: !!groupId
  })

  const group: GroupItem = idGroupQuery?.data?.data as GroupItem

  const navItems = [
    { to: `viewGroups/${group?.groupId}/dashboardGroup`, label: 'Group Setup' },
    { to: `viewGroups/${group?.groupId}/createContract`, label: 'View Contract', end: true },
    { to: `viewGroups/${group?.groupId}/viewMembers`, label: 'View Members' },
    { to: `viewGroups/${group?.groupId}/ownershipPercentage`, label: 'Enter Percentage' },
    { to: `viewGroups/${group?.groupId}/ownershipRatio`, label: 'Ownership Ratio' }
  ]

  return (
    <nav className='max-w-4xl mx-auto'>
      <ul className='flex items-center gap-2'>
        {navItems.map((item, index) => {
          return (
            <li key={index}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `
                    inline-flex items-center justify-center
                    px-5 py-2.5 rounded-xl
                    text-sm font-semibold whitespace-nowrap
                    transition-all duration-300
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 scale-105'
                        : 'bg-gray-50/80 text-gray-700 hover:bg-white hover:text-cyan-600 hover:shadow-md border border-gray-200/80'
                    }
                  `.trim()
                }
              >
                {item.label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
