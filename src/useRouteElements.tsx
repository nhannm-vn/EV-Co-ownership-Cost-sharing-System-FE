import { useRoutes } from 'react-router'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ForgotPassword from './pages/Forgot-password'
import path from './constants/path'
import LearnmoreLayout from './layouts/LearnmoreLayout'
import Learnmore from './pages/Learnmore'
import NotFound from './pages/NotFound'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Viewgroups from './pages/Viewgroups'
import User from './pages/User'
import OTPInput from './pages/UI-OTP'

function useRouteElements() {
  const routeElements = useRoutes([
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
      path: path.dashBoard,
      element: (
        <MainLayout>
          <Dashboard />
        </MainLayout>
      )
    },
    {
      path: path.forgotPassword,
      element: (
        <RegisterLayout>
          <ForgotPassword />
        </RegisterLayout>
      )
    },
    {
      path: path.viewGroups,
      element: (
        <MainLayout>
          <Viewgroups />
        </MainLayout>
      )
    },
    {
      path: path.learnMore,
      element: (
        <LearnmoreLayout>
          <Learnmore />
        </LearnmoreLayout>
      )
    },
    {
      path: path.user,
      element: (
        <MainLayout>
          <User />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <RegisterLayout>
          <NotFound />
        </RegisterLayout>
      )
    },
    {
      path: '/demoOTP',
      element: <OTPInput />
    }
  ])
  return routeElements
}

export default useRouteElements
