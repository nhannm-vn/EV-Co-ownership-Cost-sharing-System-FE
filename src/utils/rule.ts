import * as yup from 'yup'
import regex from '../constants/regex'

//File này sẽ chứa các rule validate cho form

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

export const registerSchema = yup.object({
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
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

// rule cho file hình ảnh và pdf
const imageFileSchema = yup
  // vì yup không hỗ trợ kiểu file nên phải đẻ mix nền dih
  .mixed<File>()
  // không được để trong file
  .required('File is required')
  .nullable() // Cho phép null khi chưa chọn file
  .test('fileType', 'Only PDF or Image allowed', (value) => {
    // nếu không có file thì dừng luôn
    if (!value) return false
    // nếu đúng định dạng thì return true
    return ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)
  })
  // kiểm tra kích thước file
  .test('fileSize', 'File is too large (max 5MB)', (value) => {
    // nếu không có value thì return luôn
    if (!value) return false
    // nếu bé hơn 5mb thì oke
    return value.size <= 5 * 1024 * 1024
  })

export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required('Current password is required')
    .min(6, 'Password must be at least 6 characters'),

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

export const createGroupSchema = yup.object({
  groupName: yup.string().required('Group name is required').min(3, 'Group name must be at least 3 characters'),

  licensePlate: yup
    .string()
    .required('License plate is required')
    .test('validCarPlate', 'Biển số ô tô không đúng định dạng', (value) => {
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
    .matches(regex.CHASSISNUMBER, 'Số khung xe phải có 17 ký tự và không chứa I, O, Q'),

  // nhập số lượng thành viên tối thiểu 2 phút
  maxMembers: yup.number().required('Max members is required').min(2, 'Max members must be at least 2'),
  // đoạn script tối đ  a 100 kí tự
  description: yup.string().required('Description is required').max(100, 'Description must be at most 100 characters'),

  vehicleImage: imageFileSchema,
  registrationImage: imageFileSchema
})

export type LoginSchema = yup.InferType<typeof loginSchema>

export type RegisterSchema = yup.InferType<typeof registerSchema>

export type UserInfoSchema = yup.InferType<typeof userInfoSchema>

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>

export type CreateGroupSchema = yup.InferType<typeof createGroupSchema>
