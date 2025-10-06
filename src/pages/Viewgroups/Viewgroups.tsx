import { Table, Tag, Card, Avatar } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons'
import { groupListData } from './data/test-data'

export default function Viewgroups() {
  // ===== HELPER FUNCTIONS - Các hàm tiện ích =====

  // Tính toán số lượng groups theo trạng thái
  const getTotalGroups = () => groupListData.length
  const getActiveGroups = () => groupListData.filter((group) => group.status.toLowerCase() === 'active').length
  const getPendingGroups = () => groupListData.filter((group) => group.status.toLowerCase() === 'pending').length
  const getRejectedGroups = () => groupListData.filter((group) => group.status.toLowerCase() === 'reject').length

  // Xác định màu cho status tag
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green'
      case 'pending':
        return 'orange'
      case 'reject':
        return 'red'
      default:
        return 'default'
    }
  }

  // ===== RENDER FUNCTIONS - Các hàm render component =====
  // Định nghĩa các cột của bảng
  const columns = [
    {
      title: 'Group ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: string) => (
        <span className='font-mono text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded'>#{id}</span>
      )
    },
    {
      title: 'Group Name',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (name: string) => (
        <div className='flex items-center space-x-3'>
          <Avatar size='large' className='bg-blue-500' icon={<UsergroupAddOutlined />} />
          <div>
            <div className='font-bold text-gray-800'>{name}</div>
            <div className='text-sm text-gray-500'>EV Sharing Group</div>
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)} className='font-semibold'>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    }
  ]

  // ===== MAIN RENDER - Render chính của component =====
  return (
    <div className='p-6 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        {/* Tiêu đề trang */}
        <Card className='mb-6 bg-blue-600 text-white'>
          <div className='text-center py-6'>
            <h1 className='text-3xl font-bold mb-2'>EV Groups Management</h1>
            <p className='text-blue-100 mb-6'>View all electric vehicle sharing groups</p>

            {/* Thống kê trạng thái */}
            <div className='flex justify-center items-center gap-6 flex-wrap'>
              {/* Total Groups */}
              <div className='bg-blue-500/30 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/30 w-28 text-center'>
                <div className='text-2xl font-bold text-white'>{getTotalGroups()}</div>
                <div className='text-sm text-blue-100'>Total Groups</div>
              </div>

              {/* Active Groups */}
              <div className='bg-green-500/25 backdrop-blur-sm px-4 py-3 rounded-lg border border-green-400/60 w-28 text-center'>
                <div className='text-2xl font-bold text-green-300'>{getActiveGroups()}</div>
                <div className='text-sm text-green-200'>Active</div>
              </div>

              {/* Pending Groups */}
              <div className='bg-yellow-500/25 backdrop-blur-sm px-4 py-3 rounded-lg border border-yellow-400/60 w-28 text-center'>
                <div className='text-2xl font-bold text-yellow-300'>{getPendingGroups()}</div>
                <div className='text-sm text-yellow-200'>Pending</div>
              </div>

              {/* Rejected Groups */}
              <div className='bg-red-500/25 backdrop-blur-sm px-4 py-3 rounded-lg border border-red-400/60 w-28 text-center'>
                <div className='text-2xl font-bold text-red-300'>{getRejectedGroups()}</div>
                <div className='text-sm text-red-200'>Rejected</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Bảng hiển thị danh sách groups */}
        <Card className='shadow-lg min-h-96'>
          <Table dataSource={groupListData} columns={columns} pagination={false} scroll={{ x: 800 }} size='large' />
        </Card>
      </div>
    </div>
  )
}
