import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import { Navigate, Outlet } from 'react-router'
import path from '../../constants/path'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} replace />
}
export default ProtectedRoute
