import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface ConfirmModalProps {
  title: string
  message: string
  onConfirm: () => void
  onClose: () => void
  confirmText: string
  confirmColor: 'green' | 'red'
}

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onClose,
  confirmText,
  confirmColor
}: ConfirmModalProps) {
  const isGreen = confirmColor === 'green'

  const styles = {
    button: isGreen ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600',
    iconBg: isGreen ? 'bg-green-100' : 'bg-red-100',
    icon: isGreen ? 'text-green-500' : 'text-red-500'
  }

  return (
    <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 p-4' onClick={onClose}>
      <div
        className='w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className='flex justify-center pt-8 pb-4'>
          <div className={`flex h-16 w-16 items-center justify-center rounded-full ${styles.iconBg}`}>
            {isGreen ? (
              <CheckOutlined className={`text-3xl ${styles.icon}`} />
            ) : (
              <CloseOutlined className={`text-3xl ${styles.icon}`} />
            )}
          </div>
        </div>

        {/* Content */}
        <div className='px-8 pb-8 text-center'>
          <h3 className='mb-3 text-2xl font-bold text-gray-800'>{title}</h3>
          <p className='mb-6 text-gray-600'>{message}</p>

          {/* Buttons */}
          <div className='flex gap-3'>
            <button
              onClick={onClose}
              className='flex-1 rounded-lg bg-gray-200 px-4 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-300'
            >
              Hủy
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 rounded-lg px-4 py-3 font-semibold text-white shadow-lg transition-colors ${styles.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
