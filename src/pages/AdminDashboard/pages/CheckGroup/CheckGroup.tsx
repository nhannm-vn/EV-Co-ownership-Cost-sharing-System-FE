import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import staffApi from '../../../../apis/staff.api'
import type { groupStaffItem } from '../../../../types/api/staff.type'
import PaginationButton from './components/PaginationButton'
import PropupImage from './components/PopupImage'
import StatusBadge from './components/StatusBadge'
import Skeleton from '../../../../components/Skeleton'
import EmptyState from '../EmptyState'
import { InfoCircleOutlined, RightOutlined, TeamOutlined } from '@ant-design/icons'

export default function CheckGroup() {
  const [currentPage, setCurrentPage] = useState(0)
  const pageSize = 10 // fixed page size

  const [selectedGroup, setSelectedGroup] = useState<groupStaffItem | null>(null)

  const groupListQuery = useQuery({
    queryKey: ['groupList', { page: currentPage, size: pageSize }],
    // keep previous page data while fetching the next one
    queryFn: () => staffApi.getAllGroupStaff(currentPage, pageSize)
  })

  const { isPending } = groupListQuery

  const groupData: groupStaffItem[] = groupListQuery.data?.data?.content || []

  // total pages
  const totalPages: number = groupListQuery.data?.data?.totalPages || 0
  // current page number from backend (0-based)
  const pageNumber: number = groupListQuery.data?.data?.pageable.pageNumber || 0
  console.log(pageNumber)

  // total elements
  const totalElements: number = groupListQuery.data?.data?.totalElements || 0

  // handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage) // update state (0, 1, 2...)
  }

  if (groupData.length === 0) {
    return <EmptyState />
  }

  return isPending ? (
    <Skeleton />
  ) : (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-sans'>
      <div className='container mx-auto p-4 md:p-8'>
        <header className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>Group Approval Page</h1>
          <p className='text-gray-500 mt-2'>Choose a group from the list below to view detailed information.</p>
        </header>

        <main>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-xl font-semibold mb-4 border-b pb-2'>Pending groups</h2>
            <div className='divide-y divide-gray-100'>
              {groupData.map((group, index) => (
                <div
                  key={group.groupId}
                  onClick={() => {
                    setSelectedGroup(group)
                  }}
                  className='group p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer border-l-4 border-transparent hover:border-blue-500'
                >
                  <div className='flex items-center justify-between gap-4'>
                    {/* Left Section - Group Info */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-3 mb-3'>
                        <div className='flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md'>
                          {index + 1 + pageNumber * pageSize}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='text-lg font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors'>
                            {group.groupName}
                          </h3>
                        </div>
                      </div>

                      {/* Description & Capacity */}
                      <div className='ml-13 space-y-1.5'>
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                          <InfoCircleOutlined className='text-gray-400' />
                          <span className='truncate'>
                            <span className='text-gray-500'>Description:</span>{' '}
                            <span className='text-gray-500'>{group.description}</span>
                          </span>
                        </div>
                        <div className='flex items-center gap-2 text-sm'>
                          <TeamOutlined className='text-indigo-600' />
                          <span className='font-medium text-indigo-600'>Total members: {group.memberCapacity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Status & Action */}
                    <div className='flex items-center gap-4 flex-shrink-0'>
                      <StatusBadge status={group.status} />
                      <div className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md group-hover:bg-blue-700 group-hover:shadow-lg transform group-hover:scale-105 transition-all duration-200'>
                        <span className='text-sm'>View details</span>
                        <RightOutlined className='text-xs' />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <div className='mt-6 pt-4 border-t flex flex-col items-center'>
          <PaginationButton currentPage={pageNumber + 1} totalPages={totalPages} onPageChange={handlePageChange} />
          <div className='text-sm text-gray-500 mt-2'>
            Page {pageNumber + 1} / {totalPages} (Total {totalElements} items)
          </div>
        </div>
      </div>

      {selectedGroup && <PropupImage group={selectedGroup} onClose={() => setSelectedGroup(null)} />}
    </div>
  )
}
