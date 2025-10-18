import { Navigate, Outlet } from 'react-router'
import path from '../../constants/path'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.dashBoard} replace />
}

export default RejectedRoute
