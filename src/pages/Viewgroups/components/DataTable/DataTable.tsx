import { Table, Tag, Tooltip, Avatar, Card } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons'
import { groupListData } from '../../data/test-data'
import { useNavigate } from 'react-router'
import path from '../../../../constants/path'

// ===== CONSTANTS =====
const STATUS_COLORS: Record<string, string> = {
  active: 'green',
  pending: 'orange',
  reject: 'red'
}

// ===== HELPER FUNCTIONS =====
const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status.toLowerCase()] || 'default'
}

// ===== RENDER FUNCTIONS =====
const renderGroupId = (id: string) => (
  <span className='font-mono text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded'>#{id}</span>
)

const renderGroupName = (name: string) => (
  <div className='flex items-center space-x-3'>
    <Avatar size='large' className='bg-blue-500' icon={<UsergroupAddOutlined />} />
    <div>
      <div className='font-bold text-gray-800'>{name}</div>
      <div className='text-sm text-gray-500'>EV Sharing Group</div>
    </div>
  </div>
)

const renderStatus = (status: string) => (
  <Tag color={getStatusColor(status)} className='font-semibold'>
    {status.toUpperCase()}
  </Tag>
)

const renderDescription = (description: string) => {
  const MAX_LENGTH = 50

  // Text dài - hiển thị rút gọn với tooltip
  const truncatedText = `${description.substring(0, MAX_LENGTH)}...`

  return description.length <= MAX_LENGTH ? (
    <span className='text-gray-600'>{description}</span>
  ) : (
    <Tooltip title={description} placement='topLeft'>
      <span className='text-gray-600 cursor-help hover:text-gray-800 transition-colors'>{truncatedText}</span>
    </Tooltip>
  )
}

// ===== TABLE CONFIGURATION =====
const columns = [
  {
    title: 'Group ID',
    dataIndex: 'id',
    key: 'id',
    width: 120,
    render: renderGroupId
  },
  {
    title: 'Group Name',
    dataIndex: 'name',
    key: 'name',
    width: 250,
    render: renderGroupName
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: renderStatus
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: renderDescription
  }
]

// ===== MAIN COMPONENT =====
export default function DataTable() {
  const navigate = useNavigate()
  return (
    <Card className='shadow-lg min-h-96'>
      <Table
        dataSource={groupListData}
        columns={columns}
        rowKey='id'
        pagination={false}
        scroll={{ x: 800 }}
        size='large'
        onRow={(_) => ({
          onClick: () => {
            navigate(path.dashBoard)
          }
        })}
      />
    </Card>
  )
}
