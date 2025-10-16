// ResponseApi là interface bao đóng cho tổng thể sẽ có 2 thằng chính là message và data

import type { User } from './user.type'
import type { SuccessResponse } from './utils.type'

// AuthResponse là kiểu dữ liệu mà server  trả về cụ thể cho register/login luôn
export type AuthResponse = SuccessResponse<{
  access_token?: string
  refresh_toke?: string
  expires?: string
  user?: User
}>
