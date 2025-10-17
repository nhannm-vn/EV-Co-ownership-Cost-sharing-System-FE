import type { AuthResponse } from '../types/api/auth.type'
import type { SuccessResponse } from '../types/api/utils.type'
import http from '../utils/http'

// Gom thành obj cho tiện dễ xài
const authApi = {
  // login
  login: (body: {
    email: string //
    password: string
  }) => {
    return http.post<AuthResponse>('api/auth/login', body)
  },

  // register
  register: (body: {
    fullName: string //
    email: string
    phone: string
    password: string
    confirmPassword: string
  }) => {
    return http.post<SuccessResponse<AuthResponse>>('api/auth/register/request-otp', body)
  },

  // verify register OTP
  verifyRegisterOTP: (body: { otp: string }) => {
    return http.post<AuthResponse>('api/auth/register/verify-otp', body)
  }
}

export default authApi
