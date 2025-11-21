import { CalendarOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Statistic } from 'antd'

interface StatsBarsProps {
  totalBookings: number | null
  quotaUser: {
    totalSlots: number
    usedSlots: number
    remainingSlots: number
  }
}

export default function Statsbar({ totalBookings, quotaUser }: StatsBarsProps) {
  return (
    <>
      <Card className='mb-8 shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.2)] transition-all duration-500 bg-gradient-to-r from-white via-cyan-50/20 to-white'>
        <div className='grid grid-cols-3 divide-x divide-gray-200'>
          <div className='px-10 py-6 text-center hover:bg-gradient-to-br hover:from-cyan-50/50 hover:to-transparent transition-all duration-300'>
            <Statistic
              title={
                <span className='text-xs font-black text-gray-600 uppercase tracking-wider'>
                  total booking of group in the week{' '}
                </span>
              }
              value={totalBookings || 0}
              suffix='slot'
              valueStyle={{ color: '#06B6D4', fontWeight: 900, fontSize: '36px' }}
              prefix={<CalendarOutlined style={{ fontSize: '24px' }} />}
            />
          </div>
          <div className='px-10 py-6 text-center hover:bg-gradient-to-br hover:from-sky-50/50 hover:to-transparent transition-all duration-300'>
            <Statistic
              title={
                <span className='text-xs font-black text-gray-600 uppercase tracking-wider'>
                  Number of slots you have used
                </span>
              }
              value={quotaUser.usedSlots}
              suffix='slot'
              valueStyle={{ color: '#0EA5E9', fontWeight: 900, fontSize: '36px' }}
              prefix={<UserOutlined style={{ fontSize: '24px' }} />}
            />
          </div>
          <div className='px-10 py-6 text-center hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-transparent transition-all duration-300'>
            <Statistic
              title={
                <span className='text-xs font-black text-gray-600 uppercase tracking-wider'>
                  Percentage of slots used
                </span>
              }
              value={(quotaUser.usedSlots / quotaUser.totalSlots) * 100}
              precision={0}
              suffix='%'
              valueStyle={{ color: '#3B82F6', fontWeight: 900, fontSize: '36px' }}
              prefix={<TrophyOutlined style={{ fontSize: '24px' }} />}
            />
          </div>
        </div>
      </Card>
    </>
  )
}
