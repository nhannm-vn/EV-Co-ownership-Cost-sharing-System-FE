import type { groupStaffItem } from '../../../../../../../../types/api/staff.type'
import StatusBadge from '../../../StatusBadge'

export default function Header({ group }: { group: groupStaffItem }) {
  return (
    <div className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl px-8 py-6 relative'>
      <div className='flex items-center gap-4'>
        <h2 className='text-2xl font-bold text-white'>{group.groupName}</h2>
        <StatusBadge status={group.status} />
      </div>
    </div>
  )
}
