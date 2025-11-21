import { StarFilled, ToolOutlined, WarningOutlined } from '@ant-design/icons'

type VehicleStatus = 'Good' | 'Under Maintenance' | 'Has Issues' | ''

const getConditionConfig = ({ vehicleStatus }: { vehicleStatus: VehicleStatus }) => {
  switch (vehicleStatus) {
    case 'Good':
      return {
        icon: <StarFilled style={{ fontSize: '28px', color: 'white' }} />,
        text: 'Good',
        bgColor: 'from-[#06B6D4] via-[#0EA5E9] to-[#22D3EE]'
      }

    case 'Under Maintenance':
      return {
        icon: <ToolOutlined style={{ fontSize: '28px', color: 'white' }} />,
        text: 'Maintenance',
        bgColor: 'from-[#0EA5E9] via-[#3B82F6] to-[#06B6D4]'
      }
    case 'Has Issues':
      return {
        icon: <WarningOutlined style={{ fontSize: '28px', color: 'white' }} />,
        text: 'needs Repair',
        bgColor: 'from-[#3B82F6] via-[#6366F1] to-[#0EA5E9]'
      }
    default:
      return {
        icon: <StarFilled style={{ fontSize: '28px', color: 'white' }} />,
        text: 'not Available',
        bgColor: 'from-gray-400 to-gray-500'
      }
  }
}

export default getConditionConfig
