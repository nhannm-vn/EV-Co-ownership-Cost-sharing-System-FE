import { UsergroupAddOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import groupApi from '../../../../../../apis/group.api'
import { GroupContext } from '../../../../../../hooks/useGroupList'
import type { GroupItem } from '../../../../../../types/api/group.type'
import { getStatusStyle } from './utils/getStatusStyle'

export default function TableBody() {
  const navigate = useNavigate()
  const groupListData = useContext(GroupContext)

  const handleRowClick = async (group: GroupItem) => {
    if (group?.status !== 'ACTIVE' || !group.groupId) return

    try {
      // Gọi API trực tiếp để check contract của group đang click
      const statusContract = await groupApi.getStatusContract(group.groupId.toString())
      const isApprovalStatus = statusContract.data?.approvalStatus === 'APPROVED'

      if (isApprovalStatus) {
        navigate(`/dashboard/viewGroups/${group.groupId}/booking`)
      } else {
        navigate(`/dashboard/viewGroups/${group.groupId}/dashboardGroup`)
      }
    } catch (error) {
      console.error('Error checking contract status:', error)
      navigate(`/dashboard/viewGroups/${group.groupId}/dashboardGroup`)
    }
  }

  return (
    <tbody>
      {groupListData.map((group, index) => {
        const statusStyle = getStatusStyle(group.status ?? '')
        const description = group.description || ''
        const truncatedDescription = description.length > 50 ? `${description.substring(0, 50)}...` : group.description

        return (
          <tr
            key={group.groupId || index}
            className='hover:bg-white/30 transition-all duration-300 cursor-pointer border-b border-white/10'
            onClick={() => handleRowClick(group)}
          >
            {/* Group ID */}
            <td className='px-4 py-3'>
              <span className='font-mono text-cyan-100 font-bold bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-200/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]'>
                #{group.groupId}
              </span>
            </td>

            {/* Group Name */}
            <td className='px-4 py-3'>
              <div className='flex items-center space-x-3'>
                <Avatar
                  size='large'
                  className='bg-gradient-to-br from-cyan-400 to-sky-500 border-2 border-white/50 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                  icon={<UsergroupAddOutlined />}
                />
                <div>
                  <div className='font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'>
                    {group.groupName}
                  </div>
                  <div className='text-sm text-white/70 font-medium'>EV Sharing Group</div>
                </div>
              </div>
            </td>

            {/* Status */}
            <td className='px-4 py-3'>
              <span
                className={`inline-flex items-center justify-center w-20 px-3 py-1.5 rounded-lg text-xs font-bold border backdrop-blur-md ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}
              >
                {statusStyle.label}
              </span>
            </td>

            {/* Description */}
            <td className='px-4 py-3'>
              {description.length > 50 ? (
                <Tooltip title={description} placement='topLeft'>
                  <span className='text-white/75 cursor-help hover:text-white transition-colors duration-300'>
                    {truncatedDescription}
                  </span>
                </Tooltip>
              ) : (
                <span className='text-white/75'>{group.description}</span>
              )}
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}
