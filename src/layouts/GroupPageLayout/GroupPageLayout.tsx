import { Outlet } from 'react-router-dom'

import HeaderGroup from '../../components/HeaderGroup'
import Footer from '../../components/Footer/Footer'
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
