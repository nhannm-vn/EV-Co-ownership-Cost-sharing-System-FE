import { Fragment } from 'react/jsx-runtime'
import HomeAnimation from './components/HomeAnimation'
import HomeSlide from './components/HomeSlide'
import HomeService from './components/HomeService'
import HomeLine from './components/HomeLine'
import HomeAbout from './components/HomeAbout'

function Home() {
  return (
    <Fragment>
      <HomeAnimation />
      <HomeService />
      <HomeAbout />
      <HomeLine />
      <HomeSlide />
    </Fragment>
  )
}

export default Home
