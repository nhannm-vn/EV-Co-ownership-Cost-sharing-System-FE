// src/components/RoleCheck.tsx
import { Navigate, Outlet } from 'react-router-dom'
import path from '../../constants/path'
import { getRoleFromLS } from '../../utils/auth'

type UserRole = 'STAFF' | 'CO_OWNER' | 'ADMIN'

interface RoleCheckProps {
  allowedRoles: UserRole[]
}

export default function RoleCheck({ allowedRoles }: RoleCheckProps) {
  const role = getRoleFromLS()

  if (!role) {
    return <Navigate to={path.login} replace />
  }

  if (allowedRoles.includes(role as UserRole)) {
    return <Outlet />
  }

  const defaultPath = role === 'ADMIN' || role === 'STAFF' ? path.adminDashboard : path.dashBoard

  return <Navigate to={defaultPath} replace />
}
