import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import path from '../constants/path'
import LearnmoreLayout from '../layouts/LearnmoreLayout'
import MainLayout from '../layouts/MainLayout'
import ManagerLayout from '../layouts/ManagerLayout'
import RegisterLayout from '../layouts/RegisterLayout'
import AdminDashboard from '../pages/AdminDashboard'
import CheckContract from '../pages/AdminDashboard/pages/CheckContract'
import CheckGroup from '../pages/AdminDashboard/pages/CheckGroup'
import CheckLicense from '../pages/AdminDashboard/pages/CheckLicense'
import ChangePassword from '../pages/ChangePassword'
import CreateGroups from '../pages/Creategroups'
import Dashboard from '../pages/Dashboard'
import ForgotPassword from '../pages/Forgot-password'
import GroupPage from '../pages/GroupPage'
import BookingCar from '../pages/GroupPage/pages/BookingCar'
import CoOwnershipPercentage from '../pages/GroupPage/pages/Co-ownershipPercentage/CoOwnershipPercentage'
import CreateContract from '../pages/GroupPage/pages/CreateContract'
import DashboardGP from '../pages/GroupPage/pages/DashboardGP'
import MemberGroup from '../pages/GroupPage/pages/MemberGroup'
import OwnershipRatio from '../pages/GroupPage/pages/OwnershipRatio'
import PaymentDeposit from '../pages/GroupPage/pages/PaymentDeposit'
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
import RoleCheck from './CheckRole/CheckRole'
import RejectedRoute from './PrivateRouters/RejectedRoute'
import ProtectedRoute from './PrivateRouters/ProtectedRoute'
import PaymentStatus from '../pages/GroupPage/pages/PaymentStatus'
import MyBooking from '../pages/GroupPage/pages/MyBooking'
import CheckIn from '../pages/GroupPage/pages/CheckIn'
import CheckBooking from '../pages/AdminDashboard/pages/CheckBooking'
import BookingQr from '../pages/AdminDashboard/pages/BookingQr'
import CheckInResult from '../pages/GroupPage/pages/CheckInResult'
import CheckVehicleReport from '../pages/AdminDashboard/pages/CheckVehicleReport'
import CheckOut from '../pages/GroupPage/pages/CheckOut'
import Voting from '../pages/GroupPage/pages/Voting'
import PendingCheckout from '../pages/GroupPage/pages/PendingCheckout'
import FundOwnership from '../pages/GroupPage/pages/FundOwnership'
import EditContract from '../pages/AdminDashboard/pages/EditContract'
import FeedbackCoOwner from '../pages/AdminDashboard/pages/EditContract/FeedbackCo-Owner'
import ModalEditContract from '../pages/AdminDashboard/pages/EditContract/ModalEditContract/ModalEditContract'
import PaymentHistory from '../pages/PaymentHistory'
import GroupExpense from '../pages/GroupPage/pages/GroupExpense'
import MaintenanceList from '../pages/AdminDashboard/pages/Maintenance'

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
                    { path: path.ownershipRatio, element: <OwnershipRatio /> },
                    { path: path.paymentDeposit, element: <PaymentDeposit /> },
                    { path: path.depositHistory, element: <PaymentStatus /> },
                    { path: path.booking, element: <BookingCar /> },
                    { path: path.mybooking, element: <MyBooking /> },
                    { path: path.checkIn, element: <CheckIn /> },
                    { path: path.checkInResult, element: <CheckInResult /> },
                    { path: path.checkInResultFail, element: <CheckInResult /> },
                    { path: path.checkOutResultFail, element: <CheckOut /> },
                    { path: path.checkOutResult, element: <CheckOut /> },
                    { path: path.voting, element: <Voting /> },
                    { path: path.pendingCheckout, element: <PendingCheckout /> },
                    { path: path.fundOwnership, element: <FundOwnership /> },
                    { path: path.groupExpense, element: <GroupExpense /> }
                  ]
                },
                { path: path.createGroups, element: <CreateGroups /> },
                { path: path.issueReport, element: <IssueReport /> },
                { path: path.profile, element: <MyAccount /> },
                { path: path.uploadLicense, element: <UploadLicense /> },
                { path: path.paymentHistory, element: <PaymentHistory /> },
                { path: path.changePassword, element: <ChangePassword /> }
              ]
            }
          ]
        },

        {
          element: <RoleCheck allowedRoles={['TECHNICIAN']} />,
          children: [
            {
              path: path.adminDashboard,
              element: <ManagerLayout />,
              children: [
                {
                  element: <AdminDashboard />,
                  children: [
                    { path: 'checkVehicleReport', element: <CheckVehicleReport /> },
                    {
                      path: 'maintenance',
                      element: <MaintenanceList />
                    }
                  ]
                }
              ]
            }
          ]
        },

        // --- STAFF & ADMIN & TECHNICIAN (Shared Routes) ---
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
                    { path: path.checkLicense, element: <CheckLicense /> },
                    { path: path.checkBooking, element: <CheckBooking /> },
                    { path: path.bookingQr, element: <BookingQr /> }
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
                  children: [
                    { path: 'checkContract', element: <CheckContract /> },
                    { path: 'editContract', element: <EditContract /> },
                    { path: 'feedbackCo-Owner/:contractId/:groupId/:groupName', element: <FeedbackCoOwner /> },
                    { path: 'editContractDetail/:contractId/:groupId', element: <ModalEditContract /> }
                  ]
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
