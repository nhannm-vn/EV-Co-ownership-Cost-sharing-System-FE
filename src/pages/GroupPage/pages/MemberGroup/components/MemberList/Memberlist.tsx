import { TeamOutlined } from '@ant-design/icons'
import type { Member } from '../../../../../../types/api/group.type'

interface IMemberlistProps {
  members: Member[]
  amount: number | 0
}

export default function Memberlist({ members, amount }: IMemberlistProps) {
  return (
    <div className='bg-white/10 backdrop-blur-xl rounded-2xl border-[3px] border-white/40 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3),inset_0_1px_15px_rgba(255,255,255,0.1)]'>
      <div className='px-6 py-5 border-b-[2px] border-white/20 bg-white/5'>
        <h2 className='text-xl font-bold text-white flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]'>
          <TeamOutlined className='text-cyan-200 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' />
          Danh sách thành viên
          <span className='ml-2 px-2.5 py-0.5 bg-cyan-400/20 text-cyan-100 text-sm rounded-full border border-cyan-200/30 font-bold'>
            {members.length} / {amount || 0}
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
                    <h4 className='text-lg font-bold text-white'>
                      {member.userName}
                      {member.groupRole === 'ADMIN' && <span className='text-cyan-100 text-sm ml-3'> Admin group</span>}
                    </h4>
                    <p className='text-sm text-white/70'>{member.userEmail}</p>
                  </div>
                </div>
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
    </div>
  )
}
