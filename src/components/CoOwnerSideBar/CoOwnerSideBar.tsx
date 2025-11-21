import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import groupApi from '../../apis/group.api'
import path from '../../constants/path'
import type { GroupItem } from '../../types/api/group.type'
import { clearGroupInfoLS } from '../../utils/auth'

export default function CoOwnerSideBar() {
  const { groupId } = useParams<{ groupId: string }>()
  const navigate = useNavigate()
  const idGroupQuery = useQuery({
    queryKey: ['id-groups', groupId],
    queryFn: () => groupApi.getGroupById(groupId as string),
    enabled: !!groupId
  })

  const contractQuery = useQuery({
    queryKey: ['contracts', groupId],
    queryFn: () => groupApi.getStatusContract(groupId as string),
    enabled: !!groupId
  })

  // useEffect xử lý lỗi khi không có quyền truy cập group nếu admin kick mình ra khỏi group
  useEffect(() => {
    if (contractQuery.error) {
      const error = contractQuery.error as { response?: { status?: number } }
      if (error.response?.status === 403) {
        clearGroupInfoLS()
        navigate(path.dashBoard)
      }
    }
  }, [contractQuery.error, navigate])

  const isApprovalStatus = contractQuery.data?.data?.approvalStatus === 'APPROVED'

  const group: GroupItem = idGroupQuery?.data?.data as GroupItem

  const navItems = [
    { to: `viewGroups/${group?.groupId}/dashboardGroup`, label: 'Group Setup' },
    { to: `viewGroups/${group?.groupId}/viewMembers`, label: 'Members' },
    { to: `viewGroups/${group?.groupId}/ownershipPercentage`, label: 'Percentage' },
    { to: `viewGroups/${group?.groupId}/ownershipRatio`, label: 'Ownership Ratio' },
    { to: `viewGroups/${group?.groupId}/createContract`, label: 'Contract' },
    { to: `viewGroups/${group?.groupId}/paymentDeposit`, label: 'Deposit' }
  ]
  const navApprovedItems = [
    { to: `viewGroups/${group?.groupId}/booking`, label: 'Booking Car' },
    { to: `viewGroups/${group?.groupId}/mybooking`, label: 'My Booking' },
    { to: `viewGroups/${group?.groupId}/ownershipRatio`, label: 'Ownership Ratio' },
    { to: `viewGroups/${group?.groupId}/check-QR`, label: 'QR Check' },
    { to: `viewGroups/${group?.groupId}/voting`, label: 'Voting' },
    { to: `viewGroups/${group?.groupId}/fund-ownership`, label: 'Fund and deposit' },
    { to: `viewGroups/${group?.groupId}/group-expense`, label: 'Vehicle Billing' }
  ]

  return (
    <nav className='max-w-4xl mx-auto'>
      <ul className='flex items-center gap-2'>
        {(isApprovalStatus ? navApprovedItems : navItems).map((item, index) => {
          return (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `
                    inline-flex items-center justify-center
                    px-4 py-2.5 rounded-xl
                    text-xs font-semibold whitespace-nowrap
                    transition-all duration-300
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2
                    w-32
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
