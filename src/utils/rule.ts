import * as yup from 'yup'

//File này sẽ chứa các rule validate cho form

export const userInfoSchema = yup.object().shape({
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

export type UserInfoSchema = yup.InferType<typeof userInfoSchema>

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>
