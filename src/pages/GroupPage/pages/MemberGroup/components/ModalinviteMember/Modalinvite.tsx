import { CloseCircleOutlined, CloseOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons'
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import type { InviteSchema } from '../../../../../../utils/rule'

interface IModalinviteProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: UseFormHandleSubmit<
    {
      inviteeEmail: string
    },
    {
      inviteeEmail: string
    }
  >
  onSubmit: (data: InviteSchema) => void
  register: UseFormRegister<{
    inviteeEmail: string
  }>
  errors: FieldErrors<{
    inviteeEmail: string
  }>
  reset: () => void
  isPending: boolean
}

export default function Modalinvite({
  setShowModal,
  handleSubmit,
  onSubmit,
  register,
  errors,
  reset,
  isPending
}: IModalinviteProps) {
  return (
    <div className='fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4'>
      <div
        className='backdrop-blur-xl bg-gradient-to-br from-white/25 via-white/18 to-white/22 rounded-3xl p-8 max-w-md w-full border-[3px] border-white/50 shadow-[0_20px_80px_rgba(6,182,212,0.6),0_0_100px_rgba(14,165,233,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] transform transition-all relative overflow-hidden'
        onClick={(e) => e.stopPropagation()} // ngăn sự kiện click lan truyền
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
          {/* nếu bấm vào nút close thì sẽ tắt modal và reset form */}
          <button
            disabled={isPending}
            onClick={() => {
              setShowModal(false)
              reset()
            }}
            className='w-8 h-8 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-all duration-300'
          >
            <CloseOutlined className='text-lg' />
          </button>
        </div>
        {/* /handle submit lấy email từ register */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            {/* hiển thị ô input nhập mail */}
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
  )
}
