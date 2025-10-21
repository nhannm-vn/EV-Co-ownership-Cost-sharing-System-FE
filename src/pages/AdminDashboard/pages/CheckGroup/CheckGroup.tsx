import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import staffApi from '../../../../apis/staff.api'
import type { groupStaffItem } from '../../../../types/api/staff.type'
import PropupImage from './components/PopupImage'
import StatusBadge from './components/StatusBadge'

export default function CheckGroup() {
  const [selectedGroup, setSelectedGroup] = useState<groupStaffItem | null>(null)
  const groupListQuery = useQuery({
    queryKey: ['groupList'],
    queryFn: staffApi.getAllGroupStaff
  })

  const groupData: groupStaffItem[] = groupListQuery.data?.data?.content || []

  console.log(groupData)

  return (
    <div className='bg-gray-100 min-h-screen font-sans'>
      <div className='container mx-auto p-4 md:p-8'>
        <header className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>Trang Duyệt Yêu Cầu Nhóm</h1>
          <p className='text-gray-500 mt-2'>Chọn một nhóm từ danh sách bên dưới để xem thông tin chi tiết.</p>
        </header>

        <main>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-xl font-semibold mb-4 border-b pb-2'>Danh sách chờ duyệt</h2>
            <div className='space-y-3'>
              {groupData.map((group) => (
                <div
                  key={group.groupId}
                  onClick={() => setSelectedGroup(group)}
                  className='p-4 rounded-lg border cursor-pointer transition-all duration-200 flex justify-between items-center hover:bg-blue-50 hover:border-blue-300 hover:shadow-md'
                >
                  {/* Mục 1: Tên nhóm (Tự động ở bên trái) */}
                  <span className='font-medium text-gray-700'>{group.groupName}</span>

                  {/* Mục 2: Gộp 2 mục bên phải vào một div
                       (Div này sẽ tự động ở bên phải) */}
                  <div className='flex items-center gap-4'>
                    {' '}
                    {/* Dùng 'gap-4' để tạo khoảng cách */}
                    <StatusBadge status={group.status} />
                    <span className='text-sm text-blue-600 font-semibold'>Xem chi tiết</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {selectedGroup && <PropupImage group={selectedGroup} onClose={() => setSelectedGroup(null)} />}
    </div>
  )
}
