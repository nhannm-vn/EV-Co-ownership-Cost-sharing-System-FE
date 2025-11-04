import { useQuery } from '@tanstack/react-query'
import { Avatar, Pagination } from 'antd'
import { motion } from 'framer-motion'
import { useState } from 'react'
import staffApi from '../../../../apis/staff.api'
import Skeleton from '../../../../components/Skeleton'
import type { GetGroupById, UserOfStaff } from '../../../../types/api/staff.type'
import { useNavigate } from 'react-router'
import EmptyState from '../EmptyState'

const ITEMS_PER_PAGE = 10

export default function CheckBooking() {
  const [page, setPage] = useState(1)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [groups, setGroups] = useState<Record<number, GetGroupById[]>>({})

  const navigate = useNavigate()

  // Fetch users
  const { data = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await staffApi.getUsers()
      return Array.isArray(res?.data) ? res.data : []
    }
  })

  // Pagination
  const start = (page - 1) * ITEMS_PER_PAGE
  const users = data.slice(start, start + ITEMS_PER_PAGE)
  const total = Math.ceil(data.length / ITEMS_PER_PAGE)

  // Fetch groups
  // function call api
  const handleExpand = async (userId: number | undefined) => {
    if (!userId) return

    // Nếu đã fetch rồi → toggle expand/collapse
    if (groups[userId]) {
      setExpanded(expanded === userId ? null : userId)
      return
    }

    // Fetch API
    try {
      const res = await staffApi.getAllGroupsByUserId(userId)
      setGroups((prev) => ({
        ...prev,
        [userId]: Array.isArray(res?.data) ? res.data : []
      }))
      setExpanded(userId)
    } catch (err) {
      console.error('Error:', err)
      setGroups((prev) => ({ ...prev, [userId]: [] }))
      setExpanded(userId)
    }
  }

  // Helpers
  const getInitials = (name?: string) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const moveToBookingQrPage = ({ userId, groupId }: { userId: number; groupId: number }) => {
    navigate(`/manager/bookingQr/${userId}/${groupId}`)
  }

  // Render
  if (isLoading) return <Skeleton />
  if (!data.length) return <EmptyState />

  return (
    <div className='p-5 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <h1 className='text-3xl font-bold mb-1'>Co-Owners</h1>
        <p className='text-gray-600 text-sm mb-6'>
          Total {data.length} • Page {page}/{total}
        </p>

        {/* Users List */}
        <div className='space-y-3'>
          {users.map((user: UserOfStaff) => (
            <motion.div
              key={user.userId}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition'
            >
              {/* User Row */}
              <div
                onClick={() => handleExpand(user.userId)}
                className='flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50'
              >
                <div className='flex items-center gap-3 flex-1'>
                  <Avatar size={40} className='bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0'>
                    {getInitials(user.fullName)}
                  </Avatar>
                  <div className='min-w-0 flex-1'>
                    <p className='font-semibold text-sm truncate'>{user.fullName}</p>
                    <p className='text-xs text-gray-600 truncate'>{user.email}</p>
                  </div>
                </div>

                {/* Chevron */}
                <motion.svg
                  animate={{ rotate: expanded === user.userId ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className='w-5 h-5 text-gray-400 flex-shrink-0'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </motion.svg>
              </div>

              {/* Groups Dropdown */}
              {expanded === user.userId && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className='border-t border-gray-100'
                >
                  <div className='p-4 bg-blue-50 space-y-2'>
                    {groups[user.userId || 0]?.length > 0 ? (
                      groups[user.userId || 0].map((group, idx) => (
                        <motion.div
                          key={group.groupId}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className='bg-white border border-blue-200 rounded p-3 hover:bg-blue-50'
                          onClick={() =>
                            moveToBookingQrPage({
                              userId: user.userId as number,
                              groupId: group.groupId
                            })
                          }
                        >
                          <p className='text-sm font-medium text-blue-900'>{group.groupName}</p>
                        </motion.div>
                      ))
                    ) : (
                      <p className='text-sm text-gray-500'>No groups</p>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {total > 1 && (
          <div className='mt-8 flex justify-center'>
            <Pagination
              current={page}
              total={data.length}
              pageSize={ITEMS_PER_PAGE}
              onChange={(p) => {
                setPage(p)
                setExpanded(null)
              }}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  )
}
