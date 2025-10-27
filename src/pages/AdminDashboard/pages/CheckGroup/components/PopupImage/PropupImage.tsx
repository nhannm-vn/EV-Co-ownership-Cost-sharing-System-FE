import { CheckOutlined, CloseOutlined, PictureOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import staffApi from '../../../../../../apis/staff.api'
import type { GroupImage, groupStaffItem, ReviewResponse } from '../../../../../../types/api/staff.type'
import ConfirmModal from './components/ConfirmModal'
import Header from './components/Header'
import ImageGroup from './components/ImageGroup/ImageGroup'
import RejectModal from './components/RejectModal/RejectModal'
import { groupImages } from './utils/classifyImagesType'

interface IPropupImageProps {
  group: groupStaffItem | null
  onClose: () => void
}

export type ImageStatus = 'APPROVED' | 'REJECTED'

export default function PropupImage({ group, onClose }: IPropupImageProps) {
  const queryClient = useQueryClient()
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)

  const imagesQuery = useQuery({
    queryKey: ['groupImages', group?.groupId],
    queryFn: () => staffApi.getGroupImages(group!.groupId),
    // kiểm tra groupId tồn tại mới gọi API
    enabled: !!group?.groupId
  })

  const images: GroupImage[] = imagesQuery.data?.data || []

  console.log(images)

  // Nhóm ảnh theo loại

  // hàm gọi khi xác nhận

  // nếu reject phải có lý do

  const submitImage = useMutation({
    mutationFn: ({ groupId, body }: { groupId: number; body: { status: ImageStatus; reason?: string } }) => {
      const payload = body.reason ? body : { status: body.status }
      return staffApi.submitImageReview(groupId, payload)
    },

    onSuccess: (response) => {
      const data: ReviewResponse = response?.data
      console.log(data.groupStatus)

      if (data.groupStatus === 'ACTIVE') {
        toast.success('Duyệt hình ảnh thành công', { autoClose: 1000 })
      } else if (data.groupStatus === 'INACTIVE') {
        toast.error('Từ chối hình ảnh nhóm này', { autoClose: 1000 })
      }
      // fetch lại danh sách nhóm để cập nhật trạng thái
      queryClient.invalidateQueries({ queryKey: ['groupList'] })
    },
    onError: (error) => {
      toast.error(error?.message || 'Có lỗi xảy ra khi gửi yêu cầu')
    },
    // sau khi thành công thì đóng popup
    onSettled: () => {
      // Luôn đóng cả hai modal xác nhận
      setShowApproveModal(false)
      setShowRejectModal(false)
      // Đóng popup hình ảnh
      onClose()
    }
  })

  const toggleHandle = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setState((pre) => !pre)
  }

  const confirmApprove = () => {
    // TODO: Gọi API duyệt toàn bộ nhóm
    console.log('Duyệt nhóm:', group?.groupId)

    submitImage.mutate({ groupId: group!.groupId, body: { status: 'APPROVED' } })
  }

  const confirmReject = (reason: string) => {
    // TODO: Gọi API từ chối toàn bộ nhóm với lý do
    console.log('Từ chối nhóm:', group?.groupId, 'Lý do:', reason)
    // dấu ! đảm bảo group không null
    submitImage.mutate({ groupId: group!.groupId, body: { status: 'REJECTED', reason } })
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
            {/* Nhóm hình ảnh theo loại và hiển thị */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {Object.entries(groupImages(images)).map(([type, imgs]) => (
                <ImageGroup key={type} label={type} images={imgs} />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className='bg-gray-50 rounded-b-xl px-8 py-5 flex justify-between items-center border-t'>
            {group.status === 'PENDING' && (
              //   bấm vào nút duyệt hoặc từ chối để hiện modal xác nhận
              <div className='flex gap-3'>
                <button
                  onClick={() => toggleHandle(setShowApproveModal)}
                  className='px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg'
                >
                  <CheckOutlined className='text-lg' />
                  Duyệt
                </button>
                <button
                  onClick={() => toggleHandle(setShowRejectModal)}
                  className='px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg'
                >
                  <CloseOutlined className='text-lg' />
                  Từ chối
                </button>
              </div>
            )}

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
