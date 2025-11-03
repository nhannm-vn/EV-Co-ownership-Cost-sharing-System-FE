import { motion } from 'framer-motion'
import type { UserOfStaff } from '../../../../../../types/api/staff.type'
import { Avatar } from 'antd'

interface IRow {
  user: UserOfStaff
  handleExpandToggle: (userId: number | undefined) => void
  expanded: number | null
}

export default function Row({ user, handleExpandToggle, expanded }: IRow) {
  // Safe initials
  //Đây là hàm giúp lấy chữ cái đầu tiên của mỗi từ trong tên và trả về tối đa hai chữ cái viết hoa.
  const getInitials = (name: string | undefined): string => {
    if (!name) return '?'
    return name
      .split(' ')
      .map((w) => w.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <motion.div
      key={user.userId}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-white border border-gray-200 rounded-lg'
    >
      {/* Row */}
      <div
        onClick={() => handleExpandToggle(user.userId)}
        className='flex items-center justify-between cursor-pointer hover:bg-gray-50 p-3 rounded-lg'
      >
        <div className='flex items-center gap-3 flex-1 min-w-0'>
          <Avatar size={36} className='bg-blue-400 font-bold flex-shrink-0'>
            {getInitials(user.fullName)}
          </Avatar>
          <div className='min-w-0 flex-1'>
            <p className='font-semibold text-sm truncate'>{user.fullName || 'N/A'}</p>
            <p className='text-xs text-gray-600 truncate'>{user.email || 'N/A'}</p>
          </div>
        </div>

        {/* Chevron */}
        <motion.svg
          animate={{ rotate: expanded === user.userId ? 90 : 0 }}
          className='w-4 h-4 text-gray-400 flex-shrink-0 ml-2'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </motion.svg>
      </div>

      {/* Dropdown */}
      {expanded === user.userId && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className='border-t p-3 text-xs text-gray-600'
        >
          Groups will display here
        </motion.div>
      )}
    </motion.div>
  )
}
