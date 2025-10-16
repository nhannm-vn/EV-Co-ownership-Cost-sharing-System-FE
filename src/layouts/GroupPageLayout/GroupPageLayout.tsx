import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import HeaderGroup from '../../components/HeaderGroup'
// interface Props {
//   children?: React.ReactNode
// }

export default function GroupPageLayout() {
  return (
    <>
      <HeaderGroup />
      <Outlet />
      <Footer />
    </>
  )
}
