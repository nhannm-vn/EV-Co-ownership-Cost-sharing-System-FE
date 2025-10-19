import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from '../utils/auth'

// Định nghĩa context lưu dữ liệu kiểu gì hoặc nói cách khác là định nghĩa cho initialState
interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  reset: () => void
  emailAccount: string
  setEmailAccount: React.Dispatch<React.SetStateAction<string>>
}

// initialState giúp coi ban đầu sẽ lưu gì
const initialAppContext: AppContextInterface = {
  // Nếu lấy ra được access_token thì sẽ là true, còn là '' thì ép kiểu về false
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  reset: () => null,
  emailAccount: '',
  setEmailAccount: () => null
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [emailAccount, setEmailAccount] = useState<string>(initialAppContext.emailAccount)

  const reset = () => {
    setIsAuthenticated(false)
  }

  // Nếu không có value thì nó sẽ lấy inititalAppContext
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        reset,
        emailAccount,
        setEmailAccount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
