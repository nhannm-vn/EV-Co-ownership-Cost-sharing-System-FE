import { useQuery } from '@tanstack/react-query'
import staffApi from '../../../../apis/staff.api'
import type { groupStaffItem } from '../../../../types/api/staff.type'

const statusStyles = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  ACTIVE: 'bg-green-100 text-green-800',
  UNACTIVE: 'bg-red-100 text-red-800'
}

const statusText = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  UNACTIVE: 'UNACTIVE'
}

type GroupStatus = keyof typeof statusStyles
export default function Demo1() {
  const groupListQuery = useQuery({
    queryKey: ['groupList'],
    queryFn: staffApi.getAllGroupStaff
  })

  const groupRequestsData: groupStaffItem[] = groupListQuery.data?.data?.content || []

  function StatusBadge({ status }: { status: GroupStatus }) {
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>{statusText[status]}</span>
    )
  }

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
              {groupRequestsData.map((group) => (
                <div
                  key={group.groupId}
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
    </div>
  )
}
