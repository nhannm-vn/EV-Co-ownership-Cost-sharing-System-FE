import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { useContext } from 'react'
import path from '../constants/path'
import RegisterLayout from '../layouts/RegisterLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MainLayout from '../layouts/MainLayout'
import Dashboard from '../pages/Dashboard'
import ForgotPassword from '../pages/Forgot-password'
import Viewgroups from '../pages/Viewgroups'
import LearnmoreLayout from '../layouts/LearnmoreLayout'
import Learnmore from '../pages/Learnmore'
import MyAccount from '../pages/MyAccount'
import ChangePassword from '../pages/ChangePassword'
import UploadLicense from '../pages/UploadLicense'
import NotFound from '../pages/NotFound'
import OTPInput from '../pages/UI-OTP'
import IssueReport from '../pages/IssueReport'
import CreateGroups from '../pages/Creategroups'
import GroupPageLayout from '../layouts/GroupPageLayout'
import DashboardGP from '../pages/GroupPage/pages/DashboardGP'
import CreateContract from '../pages/GroupPage/pages/CreateContract'
import MemberGroup from '../pages/GroupPage/pages/MemberGroup'
import CoOwnershipPercentage from '../pages/GroupPage/pages/Co-ownershipPercentage/CoOwnershipPercentage'
import OwnershipRatio from '../pages/GroupPage/pages/OwnershipRatio'
import GroupPage from '../pages/GroupPage'
import { AppContext } from '../contexts/app.context'

// Protected Route: Đã login mới vào được
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} replace />
}

// Rejected Route: Đã login rồi thì không cho vào login/register nữa
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.dashBoard} replace />
}

function Routers() {
  const routers = createBrowserRouter([
    // RejectedRoute - Routes cho người chưa đăng nhập (home, login, register, forgot password)
    {
      path: '/',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <RegisterLayout />,
          children: [
            {
              index: true,
              element: <Home />
            },
            {
              path: path.login,
              element: <Login />
            },
            {
              path: path.register,
              element: <Register />
            },
            {
              path: path.forgotPassword,
              element: <ForgotPassword />
            }
          ]
        }
      ]
    },

    // LearnmoreLayout - Public route (ai cũng vào được)
    {
      path: path.learnMore,
      element: <LearnmoreLayout />,
      children: [
        {
          index: true,
          element: <Learnmore />
        }
      ]
    },

    // ProtectedRoute - MainLayout (phải login mới vào được)
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.dashBoard,
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Dashboard />
            },
            {
              path: path.viewGroups,
              element: <Viewgroups />
            },
            {
              path: path.createGroups,
              element: <CreateGroups />
            },
            {
              path: path.issueReport,
              element: <IssueReport />
            },
            {
              path: path.profile,
              element: <MyAccount />
            },
            {
              path: path.uploadLicense,
              element: <UploadLicense />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            }
          ]
        },

        // GroupPageLayout - cũng phải login
        {
          path: path.group,
          element: <GroupPageLayout />,
          children: [
            {
              element: <GroupPage />,
              children: [
                {
                  index: true,
                  element: <DashboardGP />
                },
                {
                  path: path.createContract,
                  element: <CreateContract />
                },
                {
                  path: path.viewMembers,
                  element: <MemberGroup />
                },
                {
                  path: path.ownershipPercentage,
                  element: <CoOwnershipPercentage />
                },
                {
                  path: path.ownershipRatio,
                  element: <OwnershipRatio />
                }
              ]
            }
          ]
        }
      ]
    },

    // Standalone routes - Demo OTP (public)
    {
      path: '/demoOTP',
      element: <OTPInput />
    },

    // 404 Not Found
    {
      path: '*',
      element: <RegisterLayout />,
      children: [
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ])

  return <RouterProvider router={routers} />
}

export default Routers
