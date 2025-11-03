import { LockOutlined, PlusOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons'
import { Card } from 'antd'

export default function DetailStatusBooking() {
  return (
    <>
      <Card className='shadow-2xl border-0 rounded-3xl hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.2)] transition-all duration-500 bg-gradient-to-r from-white via-cyan-50/10 to-white'>
        <div className='p-8'>
          <h3 className='text-center text-lg font-black text-gray-700 mb-6 uppercase tracking-wider'>Chú thích</h3>
          <div className='grid grid-cols-5 gap-6'>
            {[
              {
                icon: <PlusOutlined style={{ fontSize: '18px', color: 'white' }} />,
                bg: 'bg-gradient-to-br from-cyan-500 to-blue-500 p-2 rounded-xl shadow-lg',
                border: 'border-[#22D3EE]',
                label: 'Có thể đặt',
                description: 'Click để đặt xe'
              },
              {
                icon: <UserOutlined style={{ fontSize: '18px', color: 'white' }} />,
                bg: 'bg-gradient-to-br from-[#06B6D4] to-[#22D3EE]',
                border: '',
                label: 'Bạn đã đặt',
                description: 'Slot của bạn'
              },
              {
                icon: <UserOutlined style={{ fontSize: '18px', color: 'white' }} />,
                bg: 'bg-gradient-to-br from-slate-400 to-slate-500',
                border: '',
                label: 'Đã đặt',
                description: 'Người khác đặt'
              },
              {
                icon: <ToolOutlined style={{ fontSize: '18px' }} />,
                bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
                border: 'border-[#22D3EE]',
                label: 'Bảo dưỡng',
                description: 'Không khả dụng'
              },
              {
                icon: <LockOutlined style={{ fontSize: '18px', color: '#9CA3AF' }} />,
                bg: 'bg-gradient-to-br from-gray-100 to-gray-200',
                border: '',
                label: 'Khóa',
                description: 'thời gian trong quá khứ '
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
