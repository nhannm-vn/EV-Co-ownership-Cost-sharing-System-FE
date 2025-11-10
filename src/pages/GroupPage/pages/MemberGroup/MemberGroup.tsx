import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import groupApi from '../../../../apis/group.api'
import { inviteSchema, type InviteSchema } from '../../../../utils/rule'
import GroupHeader from '../../components/GroupHeader'
import Header from './components/HeaderMembers'
import Memberlist from './components/MemberList/Memberlist'
import Modalinvite from './components/ModalinviteMember'

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

  // lấy danh sách thành viên
  const members = membersQuery.data?.data.groupSummary?.members || []
  // lấy số lượng thành viên tối đa
  const amount = membersQuery.data?.data.groupSummary?.memberCapacity || 0
  console.log(membersQuery.data?.data)

  // mời người dùng vào group
  const inviteMutation = useMutation({
    mutationFn: ({ groupId, inviteeEmail }: { groupId: string; inviteeEmail: string }) =>
      groupApi.inviteMember(groupId, inviteeEmail)
  })

  // hàm submit mời thành viên vào nhóm
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

  // check admin
  const isAdmin = members.some(
    (member) => member.userId === membersQuery.data?.data.userOwnership?.userId && member.groupRole === 'ADMIN'
  )

  // lấy role của user hiện tại
  const currentUserRole = membersQuery?.data?.data.groupSummary?.currentUserRole
  return (
    <>
      {/* Wrapper Container */}

      <div className='max-w-6xl mx-auto backdrop-blur-[60px] bg-gradient-to-br from-white/22 via-white/16 to-white/20 rounded-[2rem] border-[4px] border-white/60 shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] p-6 sm:p-8 lg:p-10 relative overflow-hidden'>
        {/* group header để tăng UX người trong group detail */}
        <GroupHeader groupId={groupId} />
        {/* Top Gradient Bar */}

        <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />

        {/* Header */}

        <Header members={members} isAdmin={isAdmin} amount={amount} setShowModal={setShowModal} />
        {/* Member List Card */}
        <Memberlist members={members} amount={amount} groupId={groupId as string} currentUserRole={currentUserRole} />

        {/* Bottom Gradient Bar */}
        <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
      </div>

      {/* Modal */}
      {showModal && (
        <Modalinvite
          setShowModal={setShowModal}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          reset={reset}
          isPending={inviteMutation.isPending}
        />
      )}
    </>
  )
}
