import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import path from '../constants/path'
import LearnmoreLayout from '../layouts/LearnmoreLayout'
import MainLayout from '../layouts/MainLayout'
import RegisterLayout from '../layouts/RegisterLayout'
import ChangePassword from '../pages/ChangePassword'
import CreateGroups from '../pages/Creategroups'
import Dashboard from '../pages/Dashboard'
import ForgotPassword from '../pages/Forgot-password'
import GroupPage from '../pages/GroupPage'
import CoOwnershipPercentage from '../pages/GroupPage/pages/Co-ownershipPercentage/CoOwnershipPercentage'
import CreateContract from '../pages/GroupPage/pages/CreateContract'
import DashboardGP from '../pages/GroupPage/pages/DashboardGP'
import MemberGroup from '../pages/GroupPage/pages/MemberGroup'
import OwnershipRatio from '../pages/GroupPage/pages/OwnershipRatio'
import Home from '../pages/Home'
import IssueReport from '../pages/IssueReport'
import Learnmore from '../pages/Learnmore'
import Login from '../pages/Login'
import MyAccount from '../pages/MyAccount'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'
import OTPInput from '../pages/UI-OTP'
import UploadLicense from '../pages/UploadLicense'
import Viewgroups from '../pages/Viewgroups'
import ProtectedRoute from './PrivateRouters/ProtectedRoute'
import RejectedRoute from './PrivateRouters/RejectedRoute'
import ManagerLayout from '../layouts/ManagerLayout'
import AdminDashboard from '../pages/AdminDashboard'
import CheckContract from '../pages/AdminDashboard/pages/CheckContract'
import CheckGroup from '../pages/AdminDashboard/pages/CheckGroup'
import CheckLicense from '../pages/AdminDashboard/pages/CheckLicense'
import RoleCheck from './CheckRole/CheckRole'

function Routers() {
  const routers = createBrowserRouter([
    // --- PUBLIC ROUTE ---
    {
      path: '/',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <RegisterLayout />,
          children: [
            { index: true, element: <Home /> },
            { path: path.login, element: <Login /> },
            { path: path.register, element: <Register /> },
            { path: path.forgotPassword, element: <ForgotPassword /> },
            { path: path.resetPassword, element: <ResetPassword /> }
          ]
        }
      ]
    },

    {
      path: path.learnMore,
      element: <LearnmoreLayout />,
      children: [{ index: true, element: <Learnmore /> }]
    },

    // --- PROTECTED ROUTE ---
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        // --- CO_OWNER ---
        {
          element: <RoleCheck allowedRoles={['CO_OWNER']} />,
          children: [
            {
              path: path.dashBoard,
              element: <MainLayout />,
              children: [
                { index: true, element: <Dashboard /> },
                {
                  path: path.viewGroups,
                  element: <Viewgroups />
                },
                {
                  path: path.groupDetails,
                  element: <GroupPage />,
                  children: [
                    { path: path.groupDashboard, element: <DashboardGP /> },
                    { path: path.createContract, element: <CreateContract /> },
                    { path: path.viewMembers, element: <MemberGroup /> },
                    { path: path.ownershipPercentage, element: <CoOwnershipPercentage /> },
                    { path: path.ownershipRatio, element: <OwnershipRatio /> }
                  ]
                },
                { path: path.createGroups, element: <CreateGroups /> },
                { path: path.issueReport, element: <IssueReport /> },
                { path: path.profile, element: <MyAccount /> },
                { path: path.uploadLicense, element: <UploadLicense /> },
                { path: path.changePassword, element: <ChangePassword /> }
              ]
            }
          ]
        },

        // --- STAFF & ADMIN (Shared Routes) ---
        {
          element: <RoleCheck allowedRoles={['STAFF', 'ADMIN']} />,
          children: [
            {
              path: path.adminDashboard,
              element: <ManagerLayout />,
              children: [
                {
                  element: <AdminDashboard />,
                  children: [
                    { index: true, element: <CheckGroup /> },
                    { path: 'checkLicense', element: <CheckLicense /> }
                  ]
                }
              ]
            }
          ]
        },

        // --- ADMIN ONLY (Extra Routes) ---
        {
          element: <RoleCheck allowedRoles={['ADMIN']} />,
          children: [
            {
              path: path.adminDashboard,
              element: <ManagerLayout />,
              children: [
                {
                  element: <AdminDashboard />,
                  children: [{ path: 'checkContract', element: <CheckContract /> }]
                }
              ]
            }
          ]
        }
      ]
    },

    { path: '/demoOTP', element: <OTPInput /> },

    {
      path: '*',
      element: <RegisterLayout />,
      children: [{ path: '*', element: <NotFound /> }]
    }
  ])

  return <RouterProvider router={routers} />
}

export default Routers
