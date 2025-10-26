const path = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  learnMore: '/learn-more',
  resetPassword: '/resetPassword',

  // Dashboard và các route con
  dashBoard: '/dashboard',
  viewGroups: 'viewGroups', // Relative path
  createGroups: 'createGroups', // Relative path
  issueReport: 'issueReport', // Relative path
  profile: 'profile', // Relative path
  uploadLicense: 'uploadLicense', // Relative path
  changePassword: 'changePassword', // Relative path

  // Group routes

  groupDashboard: 'DashboardGroup', // Relative path
  createContract: 'createContract', // Relative path
  viewMembers: 'viewMembers', // Relative path
  groupDetails: 'viewGroups/:groupId', // Relative path
  ownershipPercentage: 'ownershipPercentage', // Relative path
  ownershipRatio: 'ownershipRatio', // Relative path
  paymentDeposit: 'paymentDeposit', // Relative path

  //OTP
  OTP: '/demoOTP',

  // admin and staff dashboard
  adminDashboard: '/manager'
} as const

export default path
