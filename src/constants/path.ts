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
  booking: 'booking', // Relative path
  mybooking: 'mybooking', // Relative path
  depositHistory: 'payment-result', // Relative path
  checkIn: 'check-in', // Relative path
  checkInResult: 'check-in-result/:status/:startTime/:endTime/:brand/:licensePlate',
  checkInResultFail: 'check-in-result/:status',
  checkOutResultFail: 'check-out-result/:status',
  checkOutResult: 'check-out-result/:status/:bookingId',
  voting: 'voting',
  pendingCheckout: 'pending-checkout/:bookingId',
  fundOwnership: 'fund-ownership', // Relative path

  //OTP
  OTP: '/demoOTP',

  // admin and staff dashboard
  adminDashboard: '/manager',
  checkLicense: 'checkLicense',
  checkBooking: 'checkBooking',
  bookingQr: 'bookingQr/:userId/:groupId'
} as const

export default path
