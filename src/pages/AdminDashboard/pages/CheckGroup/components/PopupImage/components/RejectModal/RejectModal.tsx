import { useForm } from 'react-hook-form'
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

interface RejectModalProps {
  onClose: () => void
  onConfirm: (reason: string) => void
}

interface FormValues {
  reason: string
}

export default function RejectModal({ onClose, onConfirm }: RejectModalProps) {
  // Khởi tạo react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: { reason: '' }
  })

  // Gửi form khi hợp lệ
  const onSubmit = (data: FormValues) => {
    onConfirm(data.reason.trim())
  }

  return (
    // Lớp overlay tối + căn giữa modal
    <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 p-4' onClick={onClose}>
      {/* tránh hiện tượng click bên trong modal làm đóng */}
      <div
        className='w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        {/* ------------------- Header ------------------- */}
        <div className='flex items-center justify-between border-b bg-red-50 px-8 py-6'>
          <div className='flex items-center gap-3'>
            {/* Icon tròn đỏ */}
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-red-500'>
              <CloseOutlined className='text-lg text-white' />
            </div>
            <h3 className='text-xl font-bold text-gray-800'>Lý do từ chối</h3>
          </div>

          {/* Nút đóng */}
          <button onClick={onClose} aria-label='Đóng' className='text-gray-400 transition-colors hover:text-gray-600'>
            <CloseOutlined className='text-xl' />
          </button>
        </div>

        {/* ------------------- Form ------------------- */}
        {/* handleSubmit tự động lấy dữ liệu bỏ vào onSubmit */}
        <form onSubmit={handleSubmit(onSubmit)} className='p-8' noValidate>
          {/* Label hướng dẫn */}
          <label className='mb-3 block text-sm font-semibold text-gray-700'>
            Vui lòng nhập lý do từ chối nhóm này <span className='text-red-500'>*</span>
          </label>

          {/* Textarea nhập lý do */}
          <textarea
            {...register('reason', {
              required: 'Vui lòng nhập lý do từ chối',
              minLength: {
                value: 10,
                message: 'Lý do từ chối phải có ít nhất 10 ký tự'
              }
            })}
            rows={4}
            placeholder='Ví dụ: Ảnh không rõ nét, không đúng định dạng, thiếu thông tin...'
            autoFocus
            className={`w-full resize-none rounded-lg border-2 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-red-500 ${
              errors.reason ? 'border-red-500' : 'border-gray-300'
            }`}
          />

          {/*  Hiển thị lỗi validate */}
          {errors.reason && (
            <div className='mt-2 flex items-center gap-2 text-red-500'>
              <ExclamationCircleOutlined className='text-base' />
              <p className='text-sm font-medium'>{errors.reason.message}</p>
            </div>
          )}

          {/* ------------------- Buttons ------------------- */}
          <div className='mt-6 flex gap-3'>
            {/* Nút Hủy */}
            <button
              type='button'
              onClick={onClose}
              className='flex-1 rounded-lg bg-gray-200 px-5 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-300'
            >
              Hủy
            </button>

            {/* Nút Xác nhận */}
            <button
              type='submit'
              className='flex-1 rounded-lg bg-red-500 px-5 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-red-600'
            >
              Xác nhận từ chối
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
