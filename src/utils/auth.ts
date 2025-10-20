// demo event target
export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

export const setEmailAccountToLS = (accessToken: string) => {
  localStorage.setItem('emailAccount', accessToken)
}

export const setRoleToLS = (role: string) => {
  localStorage.setItem('role', role)
}

export const clearLS = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('emailAccount')
  localStorage.removeItem('role')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem('accessToken') || ''
export const getEmailAccountFromLS = () => localStorage.getItem('emailAccount') || ''
export const getRoleFromLS = () => localStorage.getItem('role') || ''
