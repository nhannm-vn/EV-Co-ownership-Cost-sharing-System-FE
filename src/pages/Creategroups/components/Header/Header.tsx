import { TeamOutlined } from '@ant-design/icons'

export default function Header() {
  return (
    <div className='text-center mb-6'>
      <div className='inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-xl mb-3 shadow-[0_0_30px_rgba(6,182,212,0.6),0_0_50px_rgba(14,165,233,0.3)] border-[2px] border-white/50'>
        <TeamOutlined className='text-white text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]' />
      </div>
      <h2 className='text-2xl font-bold text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.7)] mb-2'>Create EV Group</h2>
      <p className='text-sm text-white/75 font-medium'>Manage EV co-ownership and expenses</p>
    </div>
  )
}
