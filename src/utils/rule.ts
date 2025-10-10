import * as yup from 'yup'

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

export type LoginSchema = yup.InferType<typeof loginSchema>

export type RegisterSchema = yup.InferType<typeof registerSchema>

export type UserInfoSchema = yup.InferType<typeof userInfoSchema>

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>
