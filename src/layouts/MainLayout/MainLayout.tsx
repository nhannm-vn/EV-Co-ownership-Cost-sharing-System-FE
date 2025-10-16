import { Outlet } from 'react-router'

import Header from '../../components/Header'
import Footer from '../../components/Footer/Footer'

export default function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
