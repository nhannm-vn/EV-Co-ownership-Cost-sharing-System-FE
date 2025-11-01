import { StarFilled, ToolOutlined, WarningOutlined } from '@ant-design/icons'

type VehicleStatus = 'Good' | 'Under Maintenance' | 'Has Issues' | ''

const getConditionConfig = ({ vehicleStatus }: { vehicleStatus: VehicleStatus }) => {
  switch (vehicleStatus) {
    case 'Good':
      return {
        icon: <StarFilled style={{ fontSize: '28px', color: 'white' }} />,
        text: 'Tốt',
        bgColor: 'from-[#06B6D4] via-[#0EA5E9] to-[#22D3EE]'
      }

    case 'Under Maintenance':
      return {
        icon: <ToolOutlined style={{ fontSize: '28px', color: 'white' }} />,
        text: 'Bảo dưỡng',
        bgColor: 'from-[#0EA5E9] via-[#3B82F6] to-[#06B6D4]'
      }
    case 'Has Issues':
      return {
        icon: <WarningOutlined style={{ fontSize: '28px', color: 'white' }} />,
        text: 'Cần sửa',
        bgColor: 'from-[#3B82F6] via-[#6366F1] to-[#0EA5E9]'
      }
    default:
      return {
        icon: <StarFilled style={{ fontSize: '28px', color: 'white' }} />,
        text: 'Không xác định',
        bgColor: 'from-gray-400 to-gray-500'
      }
  }
}

export default getConditionConfig
