import { Fragment } from 'react/jsx-runtime'
import HomeAnimation from './components/HomeAnimation'
import HomeSlide from './components/HomeSlide'
import HomeService from './components/HomeService'
import HomeLine from './components/HomeLine'

function Home() {
  return (
    <Fragment>
      <HomeAnimation />
      <HomeService />
      <HomeLine />
      <HomeSlide />
    </Fragment>
  )
}

export default Home
