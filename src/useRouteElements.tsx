import { useRoutes } from 'react-router'
import path from './constants/path'
import GroupPageLayout from './layouts/GroupPageLayout'
import LearnmoreLayout from './layouts/LearnmoreLayout'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import ChangePassword from './pages/ChangePassword'
import CreateGroups from './pages/Creategroups'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/Forgot-password'
import GroupPage from './pages/GroupPage'
import CreateContract from './pages/GroupPage/pages/CreateContract'
import MemberGroup from './pages/GroupPage/pages/MemberGroup'
import Home from './pages/Home'
import Learnmore from './pages/Learnmore'
import Login from './pages/Login'
import MyAccount from './pages/MyAccount'
import NotFound from './pages/NotFound'

import CoOwnershipPercentage from './pages/GroupPage/pages/Co-ownershipPercentage/CoOwnershipPercentage'
import DashboardGP from './pages/GroupPage/pages/DashboardGP'
import OwnershipRatio from './pages/GroupPage/pages/OwnershipRatio'
import Register from './pages/Register'
import OTPInput from './pages/UI-OTP'
import UploadLicense from './pages/UploadLicense'
import Viewgroups from './pages/Viewgroups'

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
      path: '/issueReport',
      element: (
        <MainLayout>
          <IssueReport />
        </MainLayout>
      )
    },
    {
      path: path.createGroups,
      element: (
        <MainLayout>
          <CreateGroups />
        </MainLayout>
      )
    },
    // {
    //   path: '/ownershipRatio',
    //   element: (
    //     <MainLayout>
    //       <OwnershipRatio />
    //     </MainLayout>
    //   )
    // },
    {
      path: '/group',
      element: <GroupPageLayout />,
      children: [
        {
          element: <GroupPage />,
          children: [
            { index: true, element: <DashboardGP /> },
            { path: 'createContract', element: <CreateContract /> },
            { path: 'viewMembers', element: <MemberGroup /> },
            { path: 'ownershipPercentage', element: <CoOwnershipPercentage /> },
            { path: 'ownershipRatio', element: <OwnershipRatio /> }
          ]
        }
      ]
    }
  ])
  return routeElements
}

export default useRouteElements
