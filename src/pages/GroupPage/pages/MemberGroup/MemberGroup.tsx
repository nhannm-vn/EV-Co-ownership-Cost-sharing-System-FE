import { CloseCircleOutlined, CloseOutlined, MailOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import groupApi from '../../../../apis/group.api'
import { inviteSchema, type InviteSchema } from '../../../../utils/rule'
import GroupHeader from '../../components/GroupHeader'

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
  // hiển thị thông tin các member trong group

  const membersQuery = useQuery({
    queryKey: ['members', groupId],
    queryFn: () => groupApi.getMembersOfGroup(groupId as string),
    enabled: !!groupId
  })
  const members = membersQuery.data?.data.groupSummary?.members || []
  const amount = membersQuery.data?.data.groupSummary?.memberCapacity || 0
  console.log(membersQuery.data?.data)

  // mời người dùng vào group
  const inviteMutation = useMutation({
    mutationFn: ({ groupId, inviteeEmail }: { groupId: string; inviteeEmail: string }) =>
      groupApi.inviteMember(groupId, inviteeEmail)
  })

  const onSubmit = (data: InviteSchema) => {
    inviteMutation.mutate(
      { groupId: groupId as string, inviteeEmail: data.inviteeEmail },
      {
        onSuccess: () => {
          setShowModal(false)
          reset()
          toast.success('Đã gửi lời mời thành công!')
        },
        onError: () => {
          toast.error('Đã có lỗi xảy ra khi gửi lời mời. Vui lòng thử lại.')
        }
      }
    )
  }

  return (
    <>
      {/* Wrapper Container */}

      <div className='max-w-6xl mx-auto backdrop-blur-[60px] bg-gradient-to-br from-white/22 via-white/16 to-white/20 rounded-[2rem] border-[4px] border-white/60 shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] p-6 sm:p-8 lg:p-10 relative overflow-hidden'>
        <GroupHeader groupId={groupId} />
        {/* Top Gradient Bar */}

        <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />

        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]'>MemberGroup</h1>
          {/* đủ rồi không cho mời  */}
          {members.length < amount && (
            <button
              onClick={() => setShowModal(true)}
              className='m-6 px-6 py-3 bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-500 hover:to-sky-600 text-white rounded-xl font-bold transition-all duration-400 shadow-[0_8px_25px_rgba(6,182,212,0.5)] hover:shadow-[0_10px_35px_rgba(6,182,212,0.7)] border-[2px] border-white/40 flex items-center gap-2'
            >
              <UserAddOutlined className='text-lg drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]' />
              Invite Member
            </button>
          )}
        </div>

        {/* Member List Card */}
        <div className='bg-white/10 backdrop-blur-xl rounded-2xl border-[3px] border-white/40 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3),inset_0_1px_15px_rgba(255,255,255,0.1)]'>
          <div className='px-6 py-5 border-b-[2px] border-white/20 bg-white/5'>
            <h2 className='text-xl font-bold text-white flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]'>
              <TeamOutlined className='text-cyan-200 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' />
              Danh sách thành viên
              <span className='ml-2 px-2.5 py-0.5 bg-cyan-400/20 text-cyan-100 text-sm rounded-full border border-cyan-200/30 font-bold'>
                {members.length} / {membersQuery.data?.data.groupSummary?.memberCapacity || 0}
              </span>
            </h2>

            {/* Danh sách thành viên */}
            {members.length > 0 ? (
              <ul>
                {members.map((member) => (
                  <li
                    key={member.userId}
                    className='px-6 py-5 flex items-center justify-between transition-all duration-300 hover:bg-white/10'
                  >
                    <div className='flex items-center gap-4'>
                      <div>
                        <h4 className='text-lg font-bold text-white'>{member.userName}</h4>
                        <p className='text-sm text-white/70'>{member.userEmail}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='py-24 px-6 flex flex-col items-center justify-center'>
                <div className='w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-sky-500/20 border-[3px] border-cyan-200/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]'>
                  <TeamOutlined className='text-6xl text-cyan-200/70 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]' />
                </div>
                <h3 className='text-2xl font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'>
                  Chưa có thành viên nào
                </h3>
                <p className='text-white/75 text-center max-w-md mb-6 font-medium'>
                  Hãy bắt đầu bằng cách mời thành viên đầu tiên vào nhóm của bạn. Họ sẽ nhận được email mời và có thể
                  tham gia ngay.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Gradient Bar */}
        <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
      </div>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4'>
          <div
            className='backdrop-blur-xl bg-gradient-to-br from-white/25 via-white/18 to-white/22 rounded-3xl p-8 max-w-md w-full border-[3px] border-white/50 shadow-[0_20px_80px_rgba(6,182,212,0.6),0_0_100px_rgba(14,165,233,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] transform transition-all relative overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gradient bar */}
            <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200' />

            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-white flex items-center gap-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'>
                <div className='w-10 h-10 rounded-xl bg-cyan-400/20 backdrop-blur-sm border-[2px] border-cyan-200/40 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]'>
                  <UserAddOutlined className='text-cyan-100 text-xl drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' />
                </div>
                Mời thành viên
              </h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  reset()
                }}
                className='w-8 h-8 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-all duration-300'
              >
                <CloseOutlined className='text-lg' />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div>
                <label htmlFor='email' className='block text-sm font-bold text-white mb-3 flex items-center gap-2'>
                  <MailOutlined className='text-cyan-200 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]' />
                  Email người mời
                </label>
                <input
                  {...register('inviteeEmail')}
                  type='email'
                  placeholder='Nhập email người mời'
                  className='w-full px-4 py-3.5 bg-white/15 backdrop-blur-lg border-[2px] border-white/40 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-[3px] focus:ring-cyan-300/50 focus:border-cyan-200/60 transition-all duration-400 shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]'
                />
                {errors.inviteeEmail && (
                  <p className='mt-2.5 text-sm text-red-200 flex items-center gap-1.5 font-medium'>
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
                  className='flex-1 px-4 py-3.5 bg-white/15 hover:bg-white/25 text-white rounded-xl font-bold transition-all duration-400 border-[2px] border-white/40'
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  className='flex-1 px-4 py-3.5 bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-500 hover:to-sky-600 text-white rounded-xl font-bold transition-all duration-400 shadow-[0_8px_25px_rgba(6,182,212,0.5)] hover:shadow-[0_10px_35px_rgba(6,182,212,0.7)] border-[2px] border-white/40 flex items-center justify-center gap-2'
                >
                  <MailOutlined className='drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]' />
                  Gửi lời mời
                </button>
              </div>
            </form>

            {/* Bottom gradient bar */}
            <div className='absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200' />
          </div>
        </div>
      )}
    </>
  )
}
