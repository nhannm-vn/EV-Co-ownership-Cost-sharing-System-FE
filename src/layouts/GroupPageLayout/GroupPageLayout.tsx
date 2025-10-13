import React from 'react'
import Footer from '../../components/Footer'
import HeaderGroup from '../../components/HeaderGroup'
import { Outlet } from 'react-router-dom'
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
