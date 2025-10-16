import { Card } from 'antd'
import { groupListData } from '../../data/test-data'

export default function HeroSection() {
  // Tính toán số lượng groups theo trạng thái
  const getTotalGroups = () => groupListData.length

  const getStatusGroup = (status: string) => () =>
    groupListData.filter((group) => group.status.toLowerCase() === status.toLowerCase()).length

  return (
    <Card className='mb-6 bg-gradient-to-br from-slate-800/80 via-teal-800/80 to-teal-700/80 border-2 border-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.6)] backdrop-blur-lg'>
      <div className='text-center py-8'>
        <h1 className='text-4xl font-bold mb-3 text-white drop-shadow-lg bg-gradient-to-r from-teal-300 to-teal-200 bg-clip-text text-transparent'>
          EV Groups Management
        </h1>
        <p className='text-slate-200 mb-8 text-lg'>View all electric vehicle sharing groups</p>

        {/* Thống kê trạng thái */}
        <div className='flex justify-center items-center gap-8 flex-wrap'>
          {/* Total Groups */}
          <div className='bg-slate-700/40 backdrop-blur-md px-6 py-4 rounded-xl border-2 border-teal-400 w-32 text-center hover:bg-slate-600/40 transition-all duration-300 shadow-lg'>
            <div className='text-3xl font-bold text-white'>{getTotalGroups()}</div>
            <div className='text-sm text-slate-300 font-medium'>Total Groups</div>
          </div>

          {/* Active Groups */}
          <div className='bg-green-600/30 backdrop-blur-md px-6 py-4 rounded-xl border-2 border-green-400 w-32 text-center hover:bg-green-600/40 transition-all duration-300 shadow-lg'>
            <div className='text-3xl font-bold text-green-200'>{getStatusGroup('active')()}</div>
            <div className='text-sm text-green-300 font-medium'>Active</div>
          </div>

          {/* Pending Groups */}
          <div className='bg-yellow-600/30 backdrop-blur-md px-6 py-4 rounded-xl border-2 border-yellow-400 w-32 text-center hover:bg-yellow-600/40 transition-all duration-300 shadow-lg'>
            <div className='text-3xl font-bold text-yellow-200'>{getStatusGroup('pending')()}</div>
            <div className='text-sm text-yellow-300 font-medium'>Pending</div>
          </div>

          {/* Rejected Groups */}
          <div className='bg-red-600/30 backdrop-blur-md px-6 py-4 rounded-xl border-2 border-red-400 w-32 text-center hover:bg-red-600/40 transition-all duration-300 shadow-lg'>
            <div className='text-3xl font-bold text-red-200'>{getStatusGroup('reject')()}</div>
            <div className='text-sm text-red-300 font-medium'>Rejected</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
