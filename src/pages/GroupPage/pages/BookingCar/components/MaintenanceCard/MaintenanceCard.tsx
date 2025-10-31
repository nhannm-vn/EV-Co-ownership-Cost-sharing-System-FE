import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'
import { Card } from 'antd'

interface MaintenanceCardProps {
  lastMaintenanceDate: string
  nextMaintenanceDate: string
  maintenanceStatus: 'NO_ISSUE' | 'NEEDS_MAINTENANCE' | ''
}

export default function MaintenanceCard({
  lastMaintenanceDate,
  nextMaintenanceDate,
  maintenanceStatus
}: MaintenanceCardProps) {
  return (
    <>
      <Card className='shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)] transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/20'>
        <div className='bg-gradient-to-br from-[#3B82F6] via-[#6366F1] to-[#0EA5E9] -m-6 p-7 h-full relative overflow-hidden'>
          <div className='absolute inset-0 bg-white/5'></div>
          <div className='absolute top-0 left-0 w-36 h-36 bg-white/10 rounded-full blur-3xl'></div>
          <div className='relative z-10 flex flex-col justify-between h-full min-h-[300px]'>
            <div className='text-white text-sm font-black uppercase tracking-widest text-center mb-4'>Bảo dưỡng</div>

            <div className='flex-1 flex flex-col justify-center space-y-4'>
              <div className='bg-white/25 backdrop-blur-md rounded-2xl p-5 border-l-4 border-white/50 shadow-lg ring-1 ring-white/20 hover:bg-white/30 transition-all'>
                <div className='text-white/95 text-xs font-bold uppercase mb-2'>Gần nhất</div>
                <div className='text-white text-xl font-black'>{lastMaintenanceDate}</div>
              </div>
              <div className='bg-white/25 backdrop-blur-md rounded-2xl p-5 border-l-4 border-white/50 shadow-lg ring-1 ring-white/20 hover:bg-white/30 transition-all'>
                <div className='text-white/95 text-xs font-bold uppercase mb-2'>Tiếp theo</div>
                <div className='text-white text-xl font-black'>{nextMaintenanceDate}</div>
              </div>
            </div>

            {maintenanceStatus === 'NO_ISSUE' ? (
              <div className='bg-white/25 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center gap-3 shadow-lg ring-1 ring-white/30'>
                <CheckCircleOutlined style={{ fontSize: '22px', color: 'white' }} />
                <span className='text-white font-black text-sm uppercase'>Không có vấn đề</span>
              </div>
            ) : (
              <div className='space-y-2'>
                <div className='bg-white/15 backdrop-blur-sm border-l-4 border-white/40 p-3 rounded-xl text-white text-xs font-bold'>
                  <WarningOutlined style={{ marginRight: '6px' }} />
                  cần bảo trì ngay
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  )
}
