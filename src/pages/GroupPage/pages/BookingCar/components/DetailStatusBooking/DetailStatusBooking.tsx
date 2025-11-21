import { LockOutlined, PlusOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons'
import { Card } from 'antd'

export default function DetailStatusBooking() {
  return (
    <>
      <Card className='shadow-2xl border-0 rounded-3xl hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.2)] transition-all duration-500 bg-gradient-to-r from-white via-cyan-50/10 to-white'>
        <div className='p-8'>
          <h3 className='text-center text-lg font-black text-gray-700 mb-6 uppercase tracking-wider'>
            explain all status
          </h3>
          <div className='grid grid-cols-5 gap-6'>
            {[
              {
                icon: <PlusOutlined style={{ fontSize: '18px', color: 'white' }} />,
                bg: 'bg-gradient-to-br from-cyan-500 to-blue-500 p-2 rounded-xl shadow-lg',
                border: 'border-[#22D3EE]',
                label: 'can booking',
                description: 'Click to book'
              },
              {
                icon: <UserOutlined style={{ fontSize: '18px', color: 'white' }} />,
                bg: 'bg-gradient-to-br from-[#06B6D4] to-[#22D3EE]',
                border: '',
                label: 'You booked',
                description: 'Your slot'
              },
              {
                icon: <UserOutlined style={{ fontSize: '18px', color: 'white' }} />,
                bg: 'bg-gradient-to-br from-slate-400 to-slate-500',
                border: '',
                label: 'Booked',
                description: 'Someone else booked'
              },
              {
                icon: <ToolOutlined style={{ fontSize: '18px' }} />,
                bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
                border: 'border-[#22D3EE]',
                label: 'Maintenance',
                description: 'Unavailable'
              },
              {
                icon: <LockOutlined style={{ fontSize: '18px', color: '#9CA3AF' }} />,
                bg: 'bg-gradient-to-br from-gray-100 to-gray-200',
                border: '',
                label: 'Locked',
                description: 'Time in the past'
              },

              {
                icon: <UserOutlined style={{ fontSize: '24px', color: '#22c55e' }} />,
                bg: 'bg-gradient-to-br from-green-100 to-teal-100 border-2 border-green-300 shadow-lg ring-2 ring-green-200/50',
                border: '',
                label: 'Completed booking',
                description: 'Completed booking'
              },
              {
                icon: <UserOutlined style={{ fontSize: '24px', color: '#c522ba' }} />,
                bg: 'bg-gradient-to-br from-purple-400 to-purple-500-100 border-2 border-purple-300 shadow-lg ring-2 ring-purple-200/50',
                border: '',
                label: 'Completed check-in other',
                description: 'Completed check-in other'
              },
              {
                icon: <UserOutlined style={{ fontSize: '24px', color: '#70136a' }} />,
                bg: 'bg-gradient-to-br from-pink-100 to-pink-500-100 border-2 border-pink-300 shadow-lg ring-2 ring-pink-200/50',
                border: '',
                label: 'Completed check-in myself',
                description: 'Completed check-in myself'
              },
              {
                icon: <UserOutlined style={{ fontSize: '24px', color: '#ce1313' }} />,
                bg: 'bg-gradient-to-br from-red-100 to-red-500-100 border-2 border-red-300 shadow-lg ring-2 ring-red-200/50',
                border: '',
                label: 'awaiting review technician check',
                description: 'awaiting review technician check'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className='flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-50/50 transition-all duration-300 hover:scale-105'
              >
                <div
                  className={`w-16 h-16 ${item.bg} ${item.border ? `border-2 ${item.border}` : ''} rounded-2xl shadow-lg flex items-center justify-center`}
                >
                  {item.icon}
                </div>
                <div className='text-center'>
                  <div className='text-sm font-black text-gray-800 mb-1'>{item.label}</div>
                  <div className='text-xs text-gray-500 font-medium'>{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  )
}
