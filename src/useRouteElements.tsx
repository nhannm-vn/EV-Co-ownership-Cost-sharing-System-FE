import { createBrowserRouter } from 'react-router'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ForgotPassword from './pages/Forgot-password'
import path from './constants/path'

export const router = createBrowserRouter([
  {
    path: path.home,
    element: (
      <RegisterLayout>
        <Home />
      </RegisterLayout>
    ),
    index: true
  },
  {
    path: path.login,
    element: (
      <RegisterLayout>
        <Login />
      </RegisterLayout>
    )
  },
  {
    path: path.register,
    element: (
      <RegisterLayout>
        <Register />
      </RegisterLayout>
    )
  },
  {
    path: path.forgotPassword,
    element: (
      <RegisterLayout>
        <ForgotPassword />
      </RegisterLayout>
    )
  }
])
