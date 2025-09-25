import { createBrowserRouter } from 'react-router'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Register from './pages/Register'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <RegisterLayout>
        <Login />
      </RegisterLayout>
    )
  },
  {
    path: '/register',
    element: (
      <RegisterLayout>
        <Register />
      </RegisterLayout>
    )
  }
])
