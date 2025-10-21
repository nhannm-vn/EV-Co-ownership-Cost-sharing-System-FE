import { CloseCircleOutlined, CloseOutlined, MailOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import groupApi from '../../../../apis/group.api'
import { inviteSchema, type InviteSchema } from '../../../../utils/rule'

export default function MemberGroup() {
  const { groupId } = useParams<{ groupId: string }>()
  const [showModal, setShowModal] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InviteSchema>({
    resolver: yupResolver(inviteSchema)
  })

  const inviteMutation = useMutation({
    mutationFn: ({ groupId, inviteeEmail }: { groupId: string; inviteeEmail: string }) =>
      groupApi.inviteMember(groupId, inviteeEmail)
  })

  const onSubmit = (data: InviteSchema) => {
    inviteMutation.mutate(
      { groupId: groupId as string, inviteeEmail: data.inviteeEmail },
      {
        onSuccess: () => {
          console.log('Invite email:', data.inviteeEmail)
          setShowModal(false)
          reset()
          toast.success('Đã gửi lời mời thành công!')
        },
        onError: (error) => {
          console.error('Error inviting member:', error)
          toast.error('Đã có lỗi xảy ra khi gửi lời mời. Vui lòng thử lại.')
        }
      }
    )
  }

  return (
    <>
      {/* Wrapper Container */}
      <div className='max-w-6xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-6 sm:p-8 lg:p-10'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-white'>MemberGroup</h1>
          <button
            onClick={() => setShowModal(true)}
            className='px-6 py-3 bg-teal-400 hover:bg-teal-500 text-gray-900 rounded-xl font-semibold transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 flex items-center gap-2'
          >
            <UserAddOutlined className='text-lg' />
            Invite Member
          </button>
        </div>

        {/* Member List Card */}
        <div className='bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-lg'>
          <div className='px-6 py-5 border-b border-white/10 bg-white/5'>
            <h2 className='text-xl font-semibold text-white flex items-center gap-2'>
              <TeamOutlined className='text-teal-400' />
              Danh sách thành viên
              <span className='ml-2 px-2.5 py-0.5 bg-teal-500/20 text-teal-300 text-sm rounded-full'>0</span>
            </h2>
          </div>

          {/* Empty State */}
          <div className='py-24 px-6 flex flex-col items-center justify-center'>
            <div className='w-32 h-32 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border-2 border-teal-500/30 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20'>
              <TeamOutlined className='text-6xl text-teal-400/60' />
            </div>
            <h3 className='text-2xl font-semibold text-white mb-3'>Chưa có thành viên nào</h3>
            <p className='text-gray-400 text-center max-w-md mb-6'>
              Hãy bắt đầu bằng cách mời thành viên đầu tiên vào nhóm của bạn. Họ sẽ nhận được email mời và có thể tham
              gia ngay.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className='px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 flex items-center gap-2'
            >
              <UserAddOutlined className='text-lg' />
              Mời thành viên đầu tiên
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4'>
          <div
            className='bg-gradient-to-br from-[#0d5555] to-[#136666] rounded-3xl p-8 max-w-md w-full border border-teal-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.7)] transform transition-all'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-white flex items-center gap-3'>
                <div className='w-10 h-10 rounded-xl bg-teal-400/20 border border-teal-400/40 flex items-center justify-center'>
                  <UserAddOutlined className='text-teal-400 text-xl' />
                </div>
                Mời thành viên
              </h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  reset()
                }}
                className='w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all'
              >
                <CloseOutlined className='text-lg' />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2'
                >
                  <MailOutlined className='text-teal-400' />
                  Email người mời
                </label>
                <input
                  {...register('inviteeEmail')}
                  type='email'
                  placeholder='Nhập email người mời'
                  className='w-full px-4 py-3.5 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all'
                />
                {errors.inviteeEmail && (
                  <p className='mt-2.5 text-sm text-red-300 flex items-center gap-1.5'>
                    <CloseCircleOutlined />
                    {errors.inviteeEmail.message}
                  </p>
                )}
              </div>

              <div className='flex gap-3 pt-2'>
                <button
                  type='button'
                  onClick={() => {
                    setShowModal(false)
                    reset()
                  }}
                  className='flex-1 px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/30'
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  className='flex-1 px-4 py-3.5 bg-teal-400 hover:bg-teal-500 text-gray-900 rounded-xl font-semibold transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 flex items-center justify-center gap-2'
                >
                  <MailOutlined />
                  Gửi lời mời
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
