import { createBrowserRouter, RouterProvider } from 'react-router'
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

function Routers() {
  const routers = createBrowserRouter([
    // RegisterLayout routes
    {
      path: path.home,
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
    },

    // LearnmoreLayout routes
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

    // MainLayout - Dashboard routes
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

    // GroupPageLayout routes
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
    },

    // Standalone routes
    {
      path: '/demoOTP',
      element: <OTPInput />
    },

    // 404 Not Found/ còn phải xử lý thêm trường hợp
    //đã đăng nhạp và chưa đăng nhập
    {
      path: '*',
      element: <RegisterLayout />,
      children: [
        {
          path: '*', // Không dùng index: true
          element: <NotFound />
        }
      ]
    }
  ])

  return <RouterProvider router={routers} />
}

export default Routers
