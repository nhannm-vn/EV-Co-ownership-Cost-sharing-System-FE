import { Outlet } from 'react-router'

import LearnmoreHeader from '../../components/LearnmoreHeader'
import Footer from '../../components/Footer/Footer'

export default function LearnmoreLayout() {
  return (
    <div>
      <LearnmoreHeader />
      <Outlet />
      <Footer />
    </div>
  )
}
