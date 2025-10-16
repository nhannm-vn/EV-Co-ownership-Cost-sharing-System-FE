import { Outlet } from 'react-router'
import Footer from '../../components/Footer'
import RegisterHeader from '../../components/RegisterHeader'

function RegisterLayout() {
  return (
    <div>
      <RegisterHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

export default RegisterLayout
