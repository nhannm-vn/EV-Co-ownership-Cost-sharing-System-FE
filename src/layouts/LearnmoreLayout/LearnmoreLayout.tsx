import { Outlet } from 'react-router'
import Footer from '../../components/Footer'
import LearnmoreHeader from '../../components/LearnmoreHeader'

export default function LearnmoreLayout() {
  return (
    <div>
      <LearnmoreHeader />
      <Outlet />
      <Footer />
    </div>
  )
}
