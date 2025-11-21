import { UserAddOutlined } from '@ant-design/icons'
import type { Member } from '../../../../../../types/api/group.type'

interface IHeaderProps {
  members: Member[]
  isAdmin: boolean
  amount: number
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ members, isAdmin, amount, setShowModal }: IHeaderProps) {
  // member là  sách các tai khoản trong group
  // amont là số lượng thành viên tối đa trong group
  // isAdmin là người dùng hiện tại có phải admin không
  // setShowModal là hàm để hiển thị modal mời thành viên
  console.log(members?.length, amount)

  return (
    <div className='flex justify-between items-center mb-8'>
      <h1 className='text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]'>Member Group</h1>
      {/* đủ rồi không cho mờivà admin group mới hiện*/}

      {members.length < amount && isAdmin && (
        <button
          onClick={() => setShowModal(true)}
          className='m-6 px-6 py-3 bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-500 hover:to-sky-600 text-white rounded-xl font-bold transition-all duration-400 shadow-[0_8px_25px_rgba(6,182,212,0.5)] hover:shadow-[0_10px_35px_rgba(6,182,212,0.7)] border-[2px] border-white/40 flex items-center gap-2'
        >
          <UserAddOutlined className='text-lg drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]' />
          Invite Member
        </button>
      )}
    </div>
  )
}
