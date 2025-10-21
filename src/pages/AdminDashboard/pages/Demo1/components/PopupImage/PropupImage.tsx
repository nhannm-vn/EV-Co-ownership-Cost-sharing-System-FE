import { CheckOutlined, CloseOutlined, PictureOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import staffApi from '../../../../../../apis/staff.api'
import type { GroupImage, groupStaffItem } from '../../../../../../types/api/staff.type'
import Header from './components/Header'
import ImageGroup from './components/ImageGroup/ImageGroup'
import { groupImages } from './components/utils/classifyImagesType'

interface IPropupImageProps {
  group: groupStaffItem | null
  onClose: () => void
}

export default function PropupImage({ group, onClose }: IPropupImageProps) {
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)

  const imagesQuery = useQuery({
    queryKey: ['groupImages', group?.groupId],
    queryFn: () => staffApi.getGroupImages(group!.groupId),
    enabled: !!group?.groupId
  })

  const images: GroupImage[] = imagesQuery.data?.data || []

  console.log(images)

  // Nhóm ảnh theo loại

  const handleApprove = () => {
    setShowApproveModal((pre) => !pre)
  }

  const handleReject = () => {
    setShowRejectModal((pre) => !pre)
  }

  const confirmApprove = () => {
    // TODO: Gọi API duyệt toàn bộ nhóm
    console.log('Duyệt nhóm:', group?.groupId)
    setShowApproveModal(false)
  }

  const confirmReject = (reason: string) => {
    // TODO: Gọi API từ chối toàn bộ nhóm với lý do
    console.log('Từ chối nhóm:', group?.groupId, 'Lý do:', reason)
    setShowRejectModal(false)
  }

  if (!group) return null

  return (
    <>
      <div
        className='fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start overflow-y-auto p-4'
        onClick={onClose}
      >
        <div
          className='bg-white rounded-xl shadow-2xl w-full max-w-6xl relative my-8'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header với gradient */}
          <Header group={group} />

          {/* Content */}
          <div className='p-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
              <PictureOutlined className='text-blue-500 text-2xl' />
              Thông Tin Hình Ảnh
            </h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {Object.entries(groupImages(images)).map(([type, imgs]) => (
                <ImageGroup key={type} label={type} images={imgs} />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className='bg-gray-50 rounded-b-xl px-8 py-5 flex justify-between items-center border-t'>
            <div className='flex gap-3'>
              <>
                <button
                  onClick={handleApprove}
                  className='px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg'
                >
                  <CheckOutlined className='text-lg' />
                  Duyệt
                </button>
                <button
                  onClick={handleReject}
                  className='px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg'
                >
                  <CloseOutlined className='text-lg' />
                  Từ chối
                </button>
              </>
            </div>
            <button
              onClick={onClose}
              className='px-6 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors'
            >
              Đóng
            </button>
          </div>
        </div>
      </div>

      {/* Modal xác nhận duyệt */}
      {showApproveModal && (
        <ConfirmModal
          title='Xác nhận duyệt'
          message='Bạn có chắc chắn muốn duyệt toàn bộ hình ảnh của nhóm này?'
          onConfirm={confirmApprove}
          onClose={() => setShowApproveModal(false)}
          confirmText='Duyệt'
          confirmColor='green'
        />
      )}

      {/* Modal nhập lý do từ chối */}
      {showRejectModal && <RejectModal onClose={() => setShowRejectModal(false)} onConfirm={confirmReject} />}
    </>
  )
}

// Component card ảnh

// Modal xác nhận
function ConfirmModal({
  title,
  message,
  onConfirm,
  onClose,
  confirmText,
  confirmColor
}: {
  title: string
  message: string
  onConfirm: () => void
  onClose: () => void
  confirmText: string
  confirmColor: 'green' | 'red'
}) {
  const colorClasses = {
    green: 'bg-green-500 hover:bg-green-600',
    red: 'bg-red-500 hover:bg-red-600'
  }

  const iconBgColor = {
    green: 'bg-green-100',
    red: 'bg-red-100'
  }

  const iconColor = {
    green: 'text-green-500',
    red: 'text-red-500'
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4' onClick={onClose}>
      <div
        className='bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon header */}
        <div className='flex justify-center pt-8 pb-4'>
          <div className={`w-16 h-16 rounded-full ${iconBgColor[confirmColor]} flex items-center justify-center`}>
            {confirmColor === 'green' ? (
              <CheckOutlined className={`text-3xl ${iconColor[confirmColor]}`} />
            ) : (
              <CloseOutlined className={`text-3xl ${iconColor[confirmColor]}`} />
            )}
          </div>
        </div>

        <div className='px-8 pb-8'>
          <h3 className='text-2xl font-bold text-gray-800 text-center mb-3'>{title}</h3>
          <p className='text-gray-600 text-center mb-6'>{message}</p>

          <div className='flex gap-3'>
            <button
              onClick={onClose}
              className='flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors'
            >
              Hủy
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-3 ${colorClasses[confirmColor]} text-white font-semibold rounded-lg transition-colors shadow-lg`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Modal từ chối
function RejectModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: (reason: string) => void }) {
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (reason.trim().length < 10) {
      setError('Lý do từ chối phải có ít nhất 10 ký tự')
      return
    }

    onConfirm(reason.trim())
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4' onClick={onClose}>
      <div
        className='bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='bg-red-50 px-8 py-6 border-b flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center'>
              <CloseOutlined className='text-white text-lg' />
            </div>
            <h3 className='text-xl font-bold text-gray-800'>Lý do từ chối</h3>
          </div>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-600 transition-colors' aria-label='Đóng'>
            <CloseOutlined className='text-xl' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-8'>
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-700 mb-3'>
              Vui lòng nhập lý do từ chối nhóm này <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
                setError('')
              }}
              placeholder='Ví dụ: Ảnh không rõ nét, không đúng định dạng, thiếu thông tin...'
              className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all'
              rows={4}
              autoFocus
            />
            {error && (
              <div className='mt-2 flex items-center gap-2 text-red-500'>
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                <p className='text-sm font-medium'>{error}</p>
              </div>
            )}
          </div>

          <div className='flex gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors'
            >
              Hủy
            </button>
            <button
              type='submit'
              className='flex-1 px-5 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-lg'
            >
              Xác nhận từ chối
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
