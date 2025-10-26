import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import staffApi from '../../../../apis/staff.api'
import type { groupStaffItem } from '../../../../types/api/staff.type'
import PaginationButton from './components/PaginationButton'
import PropupImage from './components/PopupImage'
import StatusBadge from './components/StatusBadge'

export default function CheckGroup() {
  const [currentPage, setCurrentPage] = useState(0)
  const pageSize = 10 // kích thước trang cố định

  const [selectedGroup, setSelectedGroup] = useState<groupStaffItem | null>(null)
  const groupListQuery = useQuery({
    queryKey: ['groupList', { page: currentPage, size: pageSize }],
    // vẫn giữ lại dữ liệu trang 1 trong lấy trang 2
    queryFn: () => staffApi.getAllGroupStaff(currentPage, pageSize)
  })

  const groupData: groupStaffItem[] = groupListQuery.data?.data?.content || []

  // tổng số trang
  const totalPages: number = groupListQuery.data?.data?.totalPages || 0
  // pagenumber hiện tại
  const pageNumber: number = groupListQuery.data?.data?.pageable.pageNumber || 0
  //totalElements
  const totalElements: number = groupListQuery.data?.data?.totalElements || 0

  console.log(groupListQuery.data?.data)
  // hầm chuyển trang
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage) // Cập nhật state (0, 1, 2...)
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-sans'>
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
                  onClick={() => {
                    setSelectedGroup(group)
                  }}
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
        <div className='mt-6 pt-4 border-t flex flex-col items-center'>
          <PaginationButton currentPage={pageNumber + 1} totalPages={totalPages} onPageChange={handlePageChange} />
          <div className='text-sm text-gray-500 mt-2'>
            Trang {pageNumber + 1} / {totalPages} (Tổng {totalElements} mục)
          </div>
        </div>
      </div>

      {selectedGroup && <PropupImage group={selectedGroup} onClose={() => setSelectedGroup(null)} />}
    </div>
  )
}
