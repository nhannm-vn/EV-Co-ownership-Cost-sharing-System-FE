const path = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  learnMore: '/learn-more',

  // Dashboard và các route con
  dashBoard: '/dashboard',
  viewGroups: 'viewGroups', // Relative path
  createGroups: 'createGroups', // Relative path
  issueReport: 'issueReport', // Relative path
  profile: 'profile', // Relative path
  uploadLicense: 'uploadLicense', // Relative path
  changePassword: 'changePassword', // Relative path

  // Group routes
  group: '/group',
  groupDashboard: '', // index route
  createContract: 'createContract', // Relative path
  viewMembers: 'viewMembers', // Relative path
  ownershipPercentage: 'ownershipPercentage', // Relative path
  ownershipRatio: 'ownershipRatio' // Relative path
} as const

export default path
