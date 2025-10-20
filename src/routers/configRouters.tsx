import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import path from '../constants/path'
import GroupPageLayout from '../layouts/GroupPageLayout'
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
import AdminDashboard from '../pages/AdminDashboard'
import Demo1 from '../pages/AdminDashboard/pages/Demo1'
import Demo2 from '../pages/AdminDashboard/pages/CheckLicense'
import Demo3 from '../pages/AdminDashboard/pages/Demo3'

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
            },
            {
              path: path.resetPassword,
              element: <ResetPassword />
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
    },

    // dashboard quản lý của admin và staff sẽ được thêm ở đây sau
    {
      path: path.adminDashboard,
      element: <AdminDashboard />,
      children: [
        {
          index: true,
          element: <Demo1 />
        },
        {
          path: 'demo2',
          element: <Demo2 />
        },
        {
          path: 'demo3',
          element: <Demo3 />
        }
      ]
    }
  ])

  return <RouterProvider router={routers} />
}

export default Routers
