import { motion } from 'framer-motion'
import path from '../../../../constants/path'
import DashboardCardElement from './DashboardCardElement'
import { useMutation } from '@tanstack/react-query'
import groupApi from '../../../../apis/group.api'
import { useRef } from 'react'
import { useNavigate } from 'react-router'

export default function DashboardCardList() {
  const otp = useRef<HTMLInputElement>(null)
  const inviteMutation = useMutation({
    mutationFn: (otp: string) => groupApi.verifyMember(otp)
  })
  const navigate = useNavigate()

  const handleVerify = (otp: string) => {
    inviteMutation.mutate(otp, {
      onSuccess: (response) => {
        console.log('OTP verified successfully:', response?.data)
        const groupId = response?.data?.groupId
        if (groupId) {
          navigate(`/dashboard/viewGroups/${groupId}`)
        }
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }

export default function DashboardCardList({ allowAccess }: { allowAccess: boolean }) {
  return (
    <motion.div
      initial='hidden'
      animate='show'
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
      className='grid md:grid-cols-3 gap-8'
    >
      {/* Create Group */}
      <DashboardCardElement
        allowAccess={allowAccess}
        color={{
          boxShadow: 'rgba(20,184,166,0.5)',
          classDivBorder: 'border-2 border-teal-400/70 hover:border-teal-400 transition-all duration-300',
          classHColor: 'drop-shadow-[0_0_15px_rgba(20,184,166,0.5)] text-teal-200',
          classButtonColor:
            'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-[0_4px_20px_rgba(20,184,166,0.4)] hover:shadow-[0_6px_30px_rgba(20,184,166,0.6)] transition-all duration-300'
        }}
        moveLink={path.createGroups}
        content={{
          title: 'Create Group',
          body: 'Tạo nhóm mới để quản lý và chia sẻ thông tin về xe điện.',
          button: 'Create'
        }}
      />

      {/* View Groups */}
      <DashboardCardElement
        allowAccess={allowAccess}
        color={{
          boxShadow: 'rgba(20,184,166,0.5)',
          classDivBorder: 'border-2 border-teal-400/70 hover:border-teal-400 transition-all duration-300',
          classHColor: 'drop-shadow-[0_0_15px_rgba(20,184,166,0.5)] text-teal-200',
          classButtonColor:
            'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-[0_4px_20px_rgba(20,184,166,0.4)] hover:shadow-[0_6px_30px_rgba(20,184,166,0.6)] transition-all duration-300'
        }}
        moveLink={path.viewGroups}
        content={{
          title: 'View Groups',
          body: 'Xem danh sách các nhóm xe điện mà bạn đã tham gia.',
          button: 'View'
        }}
      />

      {/* Enter Code */}
      <DashboardCardElement
        handleVerify={() => handleVerify(otp.current?.value || '')}
        allowAccess={allowAccess}
        color={{
          boxShadow: 'rgba(20,184,166,0.5)',
          classDivBorder: 'border-2 border-teal-400/70 hover:border-teal-400 transition-all duration-300',
          classHColor: 'drop-shadow-[0_0_15px_rgba(20,184,166,0.5)] text-teal-200',
          classButtonColor:
            'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-[0_4px_20px_rgba(20,184,166,0.4)] hover:shadow-[0_6px_30px_rgba(20,184,166,0.6)] transition-all duration-300'
        }}
        moveLink=''
        content={{
          title: 'Enter Code',
          body: 'Nhập mã nhóm để tham gia vào cộng đồng EV của bạn.',
          button: 'Join'
        }}
      >
        <div className='relative mb-4'>
          <input
            ref={otp}
            type='text'
            placeholder='Enter group code'
            className='w-full px-5 py-3 rounded-lg border-2 border-teal-400/50 bg-slate-900/60 text-teal-100 placeholder-teal-300/50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300 backdrop-blur-sm shadow-inner'
          />
        </div>
      </DashboardCardElement>
    </motion.div>
  )
}
