import { CalendarOutlined, CarOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Modal } from 'antd'

interface ModalConfirmProps {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
  selectedSlot: {
    day: string
    timeRange: string
  } | null
  quotaUser: {
    usedSlots: number
    totalSlots: number
    remainingSlots: number
  }
}

export default function ModalConfirm({ visible, onConfirm, onCancel, selectedSlot, quotaUser }: ModalConfirmProps) {
  return (
    <Modal
      title={
        <div className='flex items-center gap-4'>
          <div className='bg-gradient-to-br from-[#06B6D4] to-[#0EA5E9] p-4 rounded-2xl shadow-xl'>
            <CalendarOutlined style={{ fontSize: '28px', color: 'white' }} />
          </div>
          <span className='text-3xl font-black text-[#06B6D4] tracking-tight'>Xác nhận đặt xe </span>
        </div>
      }
      open={visible}
      onCancel={onCancel} // Xử lý khi bấm Hủy
      footer={[
        <button
          key='cancel'
          onClick={onCancel}
          className='bg-gray-100 text-gray-800 font-semibold text-base h-12 px-6 rounded-xl hover:bg-gray-200 transition'
        >
          Hủy
        </button>,
        <button
          key='confirm'
          onClick={onConfirm}
          className='bg-gradient-to-br from-[#06B6D4] to-[#0EA5E9] text-white font-bold text-base h-12 px-6 rounded-xl hover:opacity-90 transition'
        >
          Xác nhận
        </button>
      ]}
      width={750}
    >
      {selectedSlot && (
        <div className='space-y-5 py-6'>
          {[
            { icon: <CarOutlined />, label: 'Xe', value: 'VinFast VF8 Plus (30A-123.45)' },
            {
              icon: <ClockCircleOutlined />,
              label: 'Thời gian',
              value: `${selectedSlot.day} - ${selectedSlot.timeRange}`
            },
            {
              icon: <UserOutlined />,
              label: 'Quota sau',
              value: `${quotaUser.usedSlots + 1}/${quotaUser.totalSlots} (còn ${quotaUser.remainingSlots - 1})`
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className='bg-gradient-to-br from-cyan-50 to-blue-50/30 p-7 rounded-2xl border-l-4 border-[#06B6D4] hover:shadow-xl transition-all shadow-md ring-1 ring-cyan-100'
            >
              <div className='flex items-center gap-3 text-[#06B6D4] font-bold text-base mb-3'>
                {item.icon} {item.label}
              </div>
              <div className='text-gray-800 font-black text-2xl tracking-tight'>{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}
