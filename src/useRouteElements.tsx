import { createBrowserRouter } from 'react-router'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RegisterLayout>
        <Home />
      </RegisterLayout>
    ),
    index: true
  },
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
