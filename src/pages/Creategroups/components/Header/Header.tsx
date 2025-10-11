import { TeamOutlined } from '@ant-design/icons'

export default function Header() {
  return (
    <div className='text-center mb-5'>
      <div className='inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl mb-3 shadow-lg shadow-purple-500/50'>
        <TeamOutlined className='text-white text-2xl' />
      </div>
      <h2 className='text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent'>
        Tạo Group Xe Điện
      </h2>
      <p className='mt-1 text-xs text-gray-400'>Quản lý đồng sở hữu và chi phí xe điện</p>
    </div>
  )
}
