import { Tooltip, Avatar, Card } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons'
import { groupListData } from '../../data/test-data'
import { useNavigate } from 'react-router'
import path from '../../../../constants/path'

// ===== TYPES =====
type StatusType = 'active' | 'pending' | 'reject'

interface GroupData {
  id: string
  name: string
  status: string
  description: string
}

// ===== CONSTANTS =====
const DESCRIPTION_MAX_LENGTH = 50

const STATUS_STYLES = {
  active: {
    bg: 'bg-green-500/20',
    border: 'border-green-400/50',
    text: 'text-green-300',
    label: 'ACTIVE'
  },
  pending: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-400/50',
    text: 'text-yellow-300',
    label: 'PENDING'
  },
  reject: {
    bg: 'bg-red-500/20',
    border: 'border-red-400/50',
    text: 'text-red-300',
    label: 'REJECTED'
  }
} as const

// ===== UTILITY FUNCTIONS =====
const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

const getStatusStyle = (status: string) => {
  const normalizedStatus = status.toLowerCase() as StatusType
  return STATUS_STYLES[normalizedStatus] || STATUS_STYLES.pending
}

// ===== RENDER COMPONENTS =====
const GroupIdBadge = ({ id }: { id: string }) => (
  <span className='font-mono text-cyan-300 font-bold bg-slate-700/50 px-3 py-2 rounded-lg border border-cyan-400/30 shadow-sm'>
    #{id}
  </span>
)

const GroupNameDisplay = ({ name }: { name: string }) => (
  <div className='flex items-center space-x-3'>
    <Avatar
      size='large'
      className='bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-indigo-400/40'
      icon={<UsergroupAddOutlined />}
    />
    <div>
      <div className='font-bold text-white'>{name}</div>
      <div className='text-sm text-slate-300'>EV Sharing Group</div>
    </div>
  </div>
)

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyle = getStatusStyle(status)

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border backdrop-blur-sm ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}
    >
      {statusStyle.label}
    </span>
  )
}

const DescriptionText = ({ description }: { description: string }) => {
  const isLongText = description.length > DESCRIPTION_MAX_LENGTH

  if (!isLongText) {
    return <span className='text-slate-300'>{description}</span>
  }

  const truncatedText = truncateText(description, DESCRIPTION_MAX_LENGTH)

  return (
    <Tooltip title={description} placement='topLeft'>
      <span className='text-slate-300 cursor-help hover:text-white transition-colors'>{truncatedText}</span>
    </Tooltip>
  )
}

// ===== TABLE COMPONENTS =====
const TableHeader = () => (
  <thead>
    <tr className='bg-slate-700/50 border-b border-slate-600/30'>
      <th className='px-4 py-3 text-left font-semibold text-slate-200 text-sm'>Group ID</th>
      <th className='px-4 py-3 text-left font-semibold text-slate-200 text-sm'>Group Name</th>
      <th className='px-4 py-3 text-left font-semibold text-slate-200 text-sm'>Status</th>
      <th className='px-4 py-3 text-left font-semibold text-slate-200 text-sm'>Description</th>
    </tr>
  </thead>
)

const TableRow = ({ group, onClick }: { group: GroupData; onClick: () => void }) => (
  <tr
    key={group.id}
    className='hover:bg-slate-700/30 transition-colors cursor-pointer border-b border-slate-700/20'
    onClick={onClick}
  >
    <td className='px-4 py-3'>
      <GroupIdBadge id={group.id} />
    </td>
    <td className='px-4 py-3'>
      <GroupNameDisplay name={group.name} />
    </td>
    <td className='px-4 py-3'>
      <StatusBadge status={group.status} />
    </td>
    <td className='px-4 py-3'>
      <DescriptionText description={group.description} />
    </td>
  </tr>
)

const TableBody = ({ data, onRowClick }: { data: GroupData[]; onRowClick: () => void }) => (
  <tbody>
    {data.map((group) => (
      <TableRow key={group.id} group={group} onClick={onRowClick} />
    ))}
  </tbody>
)

// ===== MAIN COMPONENT =====
export default function DataTable() {
  const navigate = useNavigate()

  const handleRowClick = () => {
    navigate(path.dashBoard)
  }

  return (
    <Card className='min-h-96 border-slate-600/40 shadow-[0_0_25px_rgba(79,70,229,0.4)] bg-slate-800/80 backdrop-blur-lg rounded-xl overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <TableHeader />
          <TableBody data={groupListData} onRowClick={handleRowClick} />
        </table>
      </div>
    </Card>
  )
}
