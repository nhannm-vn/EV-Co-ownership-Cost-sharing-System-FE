import { Navigate, Outlet } from 'react-router-dom'
import path from '../../constants/path' // Chỉnh lại path nếu cần
import { getRoleFromLS } from '../../utils/auth'

// Định nghĩa các role của bạn
type UserRole = 'STAFF' | 'CO_OWNER'

interface RoleCheckProps {
  allowedRoles: UserRole[] // Danh sách các role được phép vào
}

export default function RoleCheck({ allowedRoles }: RoleCheckProps) {
  //  lấy danh sách role trong local storage
  const role = getRoleFromLS()

  if (role && allowedRoles.includes(role as UserRole)) {
    // 1. NẾU CÓ user VÀ role CÓ trong danh sách cho phép
    // -> Cho đi tiếp
    return <Outlet />
  }

  // 2. NẾU KHÔNG
  // -> Đá về trang dashboard mặc định của họ
  const defaultPath = role === 'STAFF' ? path.adminDashboard : path.dashBoard

  // Dùng `replace` để không lưu vào lịch sử trình duyệt
  return <Navigate to={defaultPath} replace />
}
