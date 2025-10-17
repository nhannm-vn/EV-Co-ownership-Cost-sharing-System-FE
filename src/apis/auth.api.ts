import type { AuthResponse } from '../types/api/auth.type'

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
  // logout
  logout: (accessToken: string) => {
    return http.post(
      'api/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
  },
  // register
  register: (body: {
    fullName: string //
    email: string
    phone: string
    password: string
    confirmPassword: string
  }) => {
    return http.post<AuthResponse>('api/auth/register/request-otp', body)
  },

  // verify register OTP
  verifyRegisterOTP: (body: { otp: string }) => {
    return http.post<AuthResponse>('api/auth/register/verify-otp', body)
  },
  // resend OTP
  resendRegisterOTP: (body: { email: string }) => {
    return http.post<AuthResponse>('api/auth/register/resend-otp', body)
  }
}

export default authApi
