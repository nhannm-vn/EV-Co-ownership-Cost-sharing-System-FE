import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import getSlotStyle from './utils/getSlotStyle'
import getTooltip from './utils/getTooltip'

export interface Slot {
  time: string
  bookedBy: string | null
  type: 'AVAILABLE' | 'MAINTENANCE' | 'BOOKED_SELF' | 'BOOKED_OTHER' | ''
  onBook: (time: string) => void
  onCancel: (time: string) => void
}

export default function BookingSlotCell({ time, bookedBy, type, onBook, onCancel }: Slot) {
  const handleClick = () => {
    if (type === 'AVAILABLE') {
      onBook(time)
    } else if (type === 'BOOKED_SELF') {
      onCancel(time)
    }
  }

  return (
    <div className={`py-6 px-4 rounded-2xl ${getSlotStyle(type)}`} onClick={handleClick}>
      <Tooltip title={getTooltip({ type, bookedBy })} placement='top'>
        <div>
          {type === 'AVAILABLE' && (
            <div className='flex flex-col items-center gap-2'>
              <div className='bg-gradient-to-br from-cyan-500 to-blue-500 p-2 rounded-xl shadow-lg'>
                <PlusOutlined style={{ fontSize: '20px', color: 'white' }} />
              </div>
              <span className='text-xs text-cyan-700 font-bold'>Đặt xe</span>
            </div>
          )}
          {type === 'BOOKED_SELF' && (
            <div className='text-center'>
              <div className='bg-white/20 backdrop-blur-sm p-2 rounded-xl mb-2 inline-block'>
                <UserOutlined style={{ fontSize: '20px' }} />
              </div>
              <div className='text-xs font-bold'>Bạn đã đặt</div>
            </div>
          )}
          {type === 'BOOKED_OTHER' && (
            <div className='flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-slate-400 to-slate-500 rounded-2xl text-white p-2'>
              <UserOutlined style={{ fontSize: '24px', marginBottom: '8px' }} />
              <div className='text-sm font-black'> Đã đặt</div>
              <div className='text-xs opacity-90'>Người khác đặt</div>
            </div>
          )}
        </div>
      </Tooltip>
    </div>
  )
}
