import type { AuthResponse } from '../types/api/auth.type'
import http from '../utils/http'

// Gom thành obj cho tiện dễ xài
const authApi = {
  // login
  login: (body: {
    email: string //
    password: string
  }) => {
    return http.post<AuthResponse>('login', body)
  }
}

export default authApi
