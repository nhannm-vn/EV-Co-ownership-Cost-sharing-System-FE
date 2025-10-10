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
import OTPInput from './pages/UI-OTP'
import MyAccount from './pages/MyAccount'
import ChangePassword from './pages/ChangePassword'
import CreateGroups from './pages/Creategroups'
import UploadLicense from './pages/UploadLicense'

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
        <MainLayout>
          <ForgotPassword />
        </MainLayout>
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
      path: path.profile,
      element: (
        <MainLayout>
          <MyAccount />
        </MainLayout>
      )
    },
    {
      path: path.changePassword,
      element: (
        <MainLayout>
          <ChangePassword />
        </MainLayout>
      )
    },
    {
      path: path.uploadLicense,
      element: (
        <MainLayout>
          <UploadLicense />
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
    },
    {
      path: path.createGroups,
      element: (
        <MainLayout>
          <CreateGroups />
        </MainLayout>
      )
    }
  ])
  return routeElements
}

export default useRouteElements
