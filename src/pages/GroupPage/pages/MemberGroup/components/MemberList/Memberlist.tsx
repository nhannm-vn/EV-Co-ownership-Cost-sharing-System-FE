import { TeamOutlined, DeleteOutlined, ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons'
import type { Member } from '../../../../../../types/api/group.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import groupApi from '../../../../../../apis/group.api'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface IMemberlistProps {
  members: Member[]
  amount: number | 0
  groupId: string
  currentUserRole?: string
}

export default function Memberlist({ members, amount, groupId, currentUserRole }: IMemberlistProps) {
  const queryClient = useQueryClient()
  // mở modal xóa thành viên
  const [isModalOpen, setIsModalOpen] = useState(false)
  // lưu thành viên bị xóa
  const [selectedMember, setSelectedMember] = useState<{ userId: number; userName: string } | null>(null)

  const deleteMemberMuation = useMutation({
    mutationFn: ({ groupId, userId }: { groupId: string; userId: number }) => {
      return groupApi.deleteMember(groupId, userId.toString())
    },
    onSuccess: () => {
      toast.success('Xóa thành viên thành công!')
      queryClient.invalidateQueries({ queryKey: ['members', groupId] })
      setIsModalOpen(false)
      setSelectedMember(null)
    }
  })

  const handleOpenModal = (userId: number, userName: string) => {
    if (currentUserRole !== 'ADMIN') return
    setSelectedMember({ userId, userName })
    setIsModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedMember && currentUserRole === 'ADMIN') {
      deleteMemberMuation.mutate({ groupId, userId: selectedMember.userId })
    }
  }

  const handleCloseModal = () => {
    if (!deleteMemberMuation.isPending) {
      setIsModalOpen(false)
      setSelectedMember(null)
    }
  }

  return (
    <>
      <div className='bg-white/10 backdrop-blur-xl rounded-3xl border-[3px] border-white/40 overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.4),inset_0_1px_15px_rgba(255,255,255,0.15)]'>
        {/* Header */}
        <div className='px-6 py-5 border-b-[2px] border-white/20 bg-gradient-to-r from-white/10 to-white/5'>
          <h2 className='text-xl font-bold text-white flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]'>
            <TeamOutlined className='text-2xl text-cyan-200 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' />
            List member group
            <span className='ml-auto px-3 py-1 bg-cyan-400/25 text-cyan-100 text-sm rounded-full border border-cyan-200/40 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'>
              {members.length} / {amount || 0}
            </span>
          </h2>
        </div>

        {/* Danh sách thành viên */}
        {members.length > 0 ? (
          <ul className='divide-y divide-white/10'>
            {members.map((member) => (
              <li
                key={member.userId}
                className='px-6 py-5 flex items-center justify-between transition-all duration-300 hover:bg-white/15 group'
              >
                <div className='flex items-center gap-4'>
                  {/* Info */}
                  <div>
                    <div className='flex items-center gap-2'>
                      <h4 className='text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]'>
                        {member.userName}
                      </h4>
                      {member.groupRole === 'ADMIN' && (
                        <span className='px-2.5 py-0.5 bg-gradient-to-r from-purple-400/30 to-pink-400/30 text-white text-xs font-bold rounded-full border border-purple-300/40 shadow-[0_0_10px_rgba(168,85,247,0.4)]'>
                          Admin group
                        </span>
                      )}
                    </div>
                    <p className='text-sm text-white/70 mt-0.5'>{member.userEmail}</p>
                  </div>
                </div>

                {/* Nút xóa thành viên */}
                {member.groupRole !== 'ADMIN' && member.userId !== undefined && currentUserRole !== 'MEMBER' && (
                  <button
                    onClick={() => handleOpenModal(member.userId!, member.userName || 'Member')}
                    className='ml-6 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-200 hover:text-white border-2 border-red-400/40 hover:border-red-300/60 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transform hover:scale-105'
                  >
                    <span className='flex items-center gap-2'>
                      <DeleteOutlined className='text-base' />
                      DELETE
                    </span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          // neu khong co thanh vien
          <div className='py-24 px-6 flex flex-col items-center justify-center'>
            <div className='w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-sky-500/20 border-[3px] border-cyan-200/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]'>
              <TeamOutlined className='text-6xl text-cyan-200/70 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]' />
            </div>
            <h3 className='text-2xl font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'>
              Chưa có thành viên nào
            </h3>
            <p className='text-white/75 text-center max-w-md mb-6 font-medium'>
              Hãy bắt đầu bằng cách mời thành viên đầu tiên vào nhóm của bạn. Họ sẽ nhận được email mời và có thể tham
              gia ngay.
            </p>
          </div>
        )}
      </div>

      {/* Modal xác nhận xóa */}
      {isModalOpen && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl shadow-2xl w-[500px] max-w-[90vw] overflow-hidden'>
            {/* Header */}
            <div className='px-6 py-4 bg-red-500 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <ExclamationCircleOutlined className='text-2xl text-white' />
                <h3 className='text-lg font-bold text-white'>Xác nhận xóa thành viên</h3>
              </div>
              <button
                onClick={handleCloseModal}
                disabled={deleteMemberMuation.isPending}
                className='text-white/80 hover:text-white transition-colors disabled:opacity-50'
              >
                <CloseOutlined className='text-lg' />
              </button>
            </div>

            {/* Content */}
            <div className='px-6 py-6'>
              <p className='text-gray-700 text-base mb-2'>
                Bạn có chắc chắn muốn xóa thành viên{' '}
                <span className='font-bold text-red-600'>"{selectedMember?.userName}"</span> khỏi nhóm?
              </p>
              <p className='text-gray-500 text-sm'>Hành động này không thể hoàn tác.</p>
            </div>

            {/* Footer */}
            <div className='px-6 py-4 bg-gray-50 flex gap-3 justify-end'>
              <button
                onClick={handleCloseModal}
                disabled={deleteMemberMuation.isPending}
                className='px-6 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteMemberMuation.isPending}
                className='px-6 py-2.5 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {deleteMemberMuation.isPending ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
