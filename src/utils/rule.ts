import * as yup from 'yup'
import regex from '../constants/regex'

//File này sẽ chứa các rule validate cho form

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(5, 'Password must be at least 5 characters').required('Password is required')
})

export const registerSchema = yup.object({
  fullName: yup.string().min(3, 'Full Name must be at least 3 characters').required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{9,11}$/, 'Phone must be 9–11 digits')
    .required('Phone is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required')
})

export const userInfoSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),

  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^[0-9]{10,11}$/, 'Phone must be 10-11 digits'),

  dob: yup.date().max(new Date(), 'Date of birth cannot be in the future'),

  location: yup.string().required('Location is required').min(3, 'Location must be at least 3 characters')
})

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required('Old password is required').min(6, 'Password must be at least 6 characters'),

  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters')
    .notOneOf([yup.ref('currentPassword')], 'New password must be different from current password'),

  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'ConfirmPassword must match Password')
})

export const resetPasswordSchema = yup.object({
  newPassword: yup.string().required('Vui lòng nhập mật khẩu mới').min(6, 'Mật khẩu ít nhất 6 ký tự'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Mật khẩu nhập lại không khớp')
    .required('Vui lòng xác nhận mật khẩu mới')
})

// rule cho file hình ảnh
const MAX_SIZE = 2 * 1024 * 1024 // 2MB
const MAX_FILE = 2
const imageFileSchema = yup
  // vì yup không hỗ trợ kiểu file nên phải đẻ mix nền dih
  .mixed<FileList>()

  .nullable() // Cho phép null khi chưa chọn file
  // không được để trong file trống
  .test('required', 'File is required', (value) => {
    // nếu không có value thì return luôn
    if (!value || value.length === 0) return false
    return true
  })
  .test('MaxCount', `You can upload up to ${MAX_FILE} files`, (value) => {
    // nếu không có value thì return luôn
    if (!value || value.length === 0) return false
    // nếu  update dưới hoặc 3 thì oke
    return value.length <= MAX_FILE
  })
  // kiểm tra kích thước file
  .test('fileSize', 'File size is too large (maximum 2MB)', (value) => {
    // nếu không có value thì return luôn
    if (!value || value.length === 0) return false
    // nếu bé hơn 5mb thì oke
    return value[0].size <= MAX_SIZE
  })

export const createGroupSchema = yup.object({
  groupName: yup.string().required('Group name is required').min(3, 'Group name must be at least 3 characters'),

  assetValue: yup
    .number()
    .typeError('Giá tiền phải là số')
    .required('Vui lòng nhập giá tiền')
    .positive('Giá tiền phải lớn hơn 0')
    .defined(), // đảm bảo giá trị được định nghĩa,

  licensePlate: yup
    .string()
    .required('License plate is required')
    .test('validCarPlate', 'Invalid license plate format', (value) => {
      // nếu không có value thì dừng luôn
      if (!value) return false

      // các biển số các tỉnh thành hợp lệ
      const validProvinceCodes = [
        11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
        40, 41, 43, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
        72, 73, 74, 75, 76, 77, 78, 79, 81, 82, 83, 84, 85, 86, 88, 89, 90, 92, 93, 94, 95, 97, 98, 99
      ]

      // kiểm tra biển số nhập vào có chuẩn với regex không
      const match = value.match(regex.LICENSEPLATE)
      // nếu không match thì dừng luôn
      if (!match) return false
      // dựa vào regex thì match[0] = 30A-123.45 , match[1] = 30 , match[2] = A , match[3] = 123 , match[4] = 45
      // dấu - ,  \ không có lưu
      // match[1] = 2 số đầu biển số
      const provinceCode = parseInt(match[1])
      // nếu đúng return true
      return validProvinceCodes.includes(provinceCode)
    }),

  chassisNumber: yup
    // phải là chuỗi
    .string()
    // không cho bỏ trống
    .required('Chassis number is required')
    // regex kiểm tra khung xe
    .matches(regex.CHASSISNUMBER, 'Chassis number must be 17 characters and cannot contain I, O, Q'),

  // nhập số lượng thành viên tối thiểu 2 phút
  maxMembers: yup
    .number()
    .typeError('Value must be a number')
    .required('This field is required')
    .min(2, 'Minimum value is 2')
    .max(5, 'Maximum value is 5')
    .defined(),
  // đoạn script tối đa 100 ký tự
  description: yup.string().required('Description is required').max(100, 'Description must be at most 100 characters'),

  vehicleImage: imageFileSchema,
  registrationImage: imageFileSchema
})

// forgot password
export const forgotPasswordSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required')
})

export type ForgotPasswordType = yup.InferType<typeof forgotPasswordSchema>

export type LoginSchema = yup.InferType<typeof loginSchema>

export type RegisterSchema = yup.InferType<typeof registerSchema>

export type UserInfoSchema = yup.InferType<typeof userInfoSchema>

export type ResetPasswordType = yup.InferType<typeof resetPasswordSchema>

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>

export type CreateGroupSchema = yup.InferType<typeof createGroupSchema>
