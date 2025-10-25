import { useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { isTokenExpired } from '../../utils/tokenUtils'
import { clearLS } from '../../utils/auth'
import { AppContext } from '../../contexts/app.context'

const AuthChecker = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { setIsAuthenticated } = useContext(AppContext)

  useEffect(() => {
    // Check mỗi khi route thay đổi
    if (isTokenExpired()) {
      clearLS()
      setIsAuthenticated(false)
    }
  }, [location, navigate, setIsAuthenticated])

  return null // Component này không render gì
}

export default AuthChecker
