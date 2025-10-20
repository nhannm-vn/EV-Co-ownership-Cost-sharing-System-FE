import { UsergroupAddOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import { useNavigate } from 'react-router'
import path from '../../../../../../constants/path'

import { getStatusStyle } from './utils/getStatusStyle'
import { useContext } from 'react'
import { GroupContext } from '../../../../../../hooks/useGroupList'

export default function TableBody() {
  const navigate = useNavigate()

  const handleRowClick = () => {
    navigate(path.dashBoard)
  }
  const groupListData = useContext(GroupContext)
  return (
    <tbody>
      {groupListData.map((group) => {
        const statusStyle = getStatusStyle(group.status)

        const truncatedDescription =
          group.description.length > 50 ? `${group.description.substring(0, 50)}...` : group.description

        return (
          <tr
            key={group.groupId}
            /*
             * hover:bg-slate-700/30 - Nền xám đen khi hover với độ trong suốt 30%
             * transition-colors - Hiệu ứng chuyển màu mượt
             * cursor-pointer - Con trỏ chuột thành hình bàn tay
             * border-b - Viền dưới
             * border-slate-700/20 - Viền xám đen với độ trong suốt 20%
             */
            className='hover:bg-slate-700/100 transition-colors cursor-pointer border-b border-slate-700/20'
            onClick={handleRowClick}
          >
            {/* Group ID */}
            <td
              /* px-4: padding ngang 16px, py-3: padding dọc 12px */
              className='px-4 py-3'
            >
              <span
                /*
                 * font-mono - Font chữ monospace như code
                 * text-teal-300 - Màu chữ teal sáng
                 * font-bold - Chữ đậm
                 * bg-slate-700/50 - Nền xám đen với độ trong suốt 50%
                 * px-3 py-2 - Padding 12px ngang, 8px dọc
                 * rounded-lg - Bo góc lớn 8px
                 * border border-teal-400/30 - Viền teal với độ trong suốt 30%
                 * shadow-sm - Bóng đổ nhỏ
                 */
                className='font-mono text-teal-300 font-bold bg-slate-700/50 px-3 py-2 rounded-lg border border-teal-400/30 shadow-sm'
              >
                #{group.groupId}
              </span>
            </td>

            {/* Group Name */}
            <td
              /* px-4: padding ngang 16px, py-3: padding dọc 12px */
              className='px-4 py-3'
            >
              <div
                /*
                 * flex - Display flex
                 * items-center - Căn giữa theo trục dọc
                 * space-x-3 - Khoảng cách ngang giữa các phần tử 12px
                 */
                className='flex items-center space-x-3'
              >
                <Avatar
                  size='large'
                  /*
                   * bg-gradient-to-br - Gradient từ trên-trái xuống dưới-phải
                   * from-teal-500 to-teal-600 - Từ màu teal sáng sang teal đậm
                   * border-2 - Viền dày 2px
                   * border-teal-400/40 - Viền teal với độ trong suốt 40%
                   */
                  className='bg-gradient-to-br from-teal-500 to-teal-600 border-2 border-teal-400/40'
                  icon={<UsergroupAddOutlined />}
                />
                <div>
                  {/* font-bold: chữ đậm, text-white: chữ trắng */}
                  <div className='font-bold text-white'>{group.groupName}</div>
                  {/* text-sm: cỡ chữ 14px, text-slate-300: xám sáng */}
                  <div className='text-sm text-slate-300'>EV Sharing Group</div>
                </div>
              </div>
            </td>

            {/* Status */}
            <td
              /* px-4: padding ngang 16px, py-3: padding dọc 12px */
              className='px-4 py-3'
            >
              <span
                /*
                 * inline-flex items-center justify-center - Layout flex và căn giữa
                 * w-20 - Chiều rộng cố định 80px để tất cả badge cùng kích thước
                 * px-3 py-1.5 - Padding 12px ngang, 6px dọc
                 * rounded-lg - Bo góc 8px
                 * text-xs - Cỡ chữ rất nhỏ 12px
                 * font-semibold - Chữ hơi đậm
                 * border - Viền
                 * backdrop-blur-sm - Hiệu ứng blur nền nhỏ
                 * ${statusStyle.*} - Màu động theo status (green/yellow/red)
                 */
                className={`inline-flex items-center justify-center w-20 px-3 py-1.5 rounded-lg text-xs font-semibold border backdrop-blur-sm ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}
              >
                {statusStyle.label}
              </span>
            </td>

            {/* Description */}
            <td
              /* px-4: padding ngang 16px, py-3: padding dọc 12px */
              className='px-4 py-3'
            >
              {group.description.length > 50 ? (
                <Tooltip title={group.description} placement='topLeft'>
                  <span
                    /*
                     * text-slate-300 - Màu chữ xám sáng
                     * cursor-help - Con trỏ thành dấu ? khi hover
                     * hover:text-white - Khi hover chữ chuyển thành trắng
                     * transition-colors - Hiệu ứng chuyển màu mượt
                     */
                    className='text-slate-300 cursor-help hover:text-white transition-colors'
                  >
                    {truncatedDescription}
                  </span>
                </Tooltip>
              ) : (
                /* text-slate-300: màu chữ xám sáng */
                <span className='text-slate-300'>{group.description}</span>
              )}
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}
