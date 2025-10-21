/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react'
import { getAccessTokenFromLS, getEmailAccountFromLS, getRoleFromLS } from '../utils/auth'

// Định nghĩa context lưu dữ liệu kiểu gì hoặc nói cách khác là định nghĩa cho initialState
interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  reset: () => void
  emailAccount: string
  setEmailAccount: React.Dispatch<React.SetStateAction<string>>
  role: string
  setRole: React.Dispatch<React.SetStateAction<string>>
  groupId: string | null
  setGroupId: React.Dispatch<React.SetStateAction<string | null>>
}

// initialState giúp coi ban đầu sẽ lưu gì
const initialAppContext: AppContextInterface = {
  // Nếu lấy ra được access_token thì sẽ là true, còn là '' thì ép kiểu về false
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  reset: () => null,
  emailAccount: getEmailAccountFromLS(),
  setEmailAccount: () => null,
  role: getRoleFromLS(),
  setRole: () => null,
  groupId: null,
  setGroupId: () => null
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [emailAccount, setEmailAccount] = useState<string>(initialAppContext.emailAccount)
  const [role, setRole] = useState<string>(initialAppContext.role)

  // thêm state groupId
  const [groupId, setGroupId] = useState<string | null>(null)

  const reset = () => {
    setIsAuthenticated(false)
    // reset luôn group khi logout
    setGroupId(null)
  }

  // Nếu không có value thì nó sẽ lấy inititalAppContext
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        reset,
        emailAccount,
        setEmailAccount,
        role,
        setRole,
        groupId,
        setGroupId
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
