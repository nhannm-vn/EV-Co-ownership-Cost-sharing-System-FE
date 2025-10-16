export interface User {
  userId: number
  fullName: string
  email: string
  password: string
  phoneNumber: string
  avatarUrl: string | null
  roleId: number
  status: string
  createdAt: string
  updatedAt: string
}
