// ResponseApi là interface bao đóng cho tổng thể sẽ có 2 thằng chính là message và data

import type { User } from './user.type'

// AuthResponse là kiểu dữ liệu mà server  trả về cụ thể cho register/login luôn
export type AuthResponse = {
  accessToken?: string
  refreshToken?: string
  expires?: string
  user?: User
  email?: string
  message?: string
  type?: string
}
