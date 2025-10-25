import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  exp: number
}

export const getToken = () => localStorage.getItem('access_token')

export const isTokenExpired = (): boolean => {
  const token = getToken()
  if (!token) return true

  try {
    const decoded = jwtDecode<JwtPayload>(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch {
    return true
  }
}
