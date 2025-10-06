import { Card } from 'antd'
import { groupListData } from '../../data/test-data'

export default function HeroSection() {
  // Tính toán số lượng groups theo trạng thái
  const getTotalGroups = () => groupListData.length

  const getStatusGroup = (status: string) => () =>
    groupListData.filter((group) => group.status.toLowerCase() === status.toLowerCase()).length

  return (
    <Card className='mb-6 bg-blue-600 text-white'>
      <div className='text-center py-6'>
        <h1 className='text-3xl font-bold mb-2'>EV Groups Management</h1>
        <p className='text-blue-100 mb-6'>View all electric vehicle sharing groups</p>

        {/* Thống kê trạng thái */}
        <div className='flex justify-center items-center gap-6 flex-wrap'>
          {/* Total Groups */}
          <div className='bg-blue-500/30 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/30 w-28 text-center'>
            <div className='text-2xl font-bold text-white'>{getTotalGroups()}</div>
            <div className='text-sm text-blue-100'>Total Groups</div>
          </div>

          {/* Active Groups */}
          <div className='bg-green-500/25 backdrop-blur-sm px-4 py-3 rounded-lg border border-green-400/60 w-28 text-center'>
            <div className='text-2xl font-bold text-green-300'>{getStatusGroup('active')()}</div>
            <div className='text-sm text-green-200'>Active</div>
          </div>

          {/* Pending Groups */}
          <div className='bg-yellow-500/25 backdrop-blur-sm px-4 py-3 rounded-lg border border-yellow-400/60 w-28 text-center'>
            <div className='text-2xl font-bold text-yellow-300'>{getStatusGroup('pending')()}</div>
            <div className='text-sm text-yellow-200'>Pending</div>
          </div>

          {/* Rejected Groups */}
          <div className='bg-red-500/25 backdrop-blur-sm px-4 py-3 rounded-lg border border-red-400/60 w-28 text-center'>
            <div className='text-2xl font-bold text-red-300'>{getStatusGroup('reject')()}</div>
            <div className='text-sm text-red-200'>Rejected</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
