import { Fragment } from 'react/jsx-runtime'
import HomeAnimation from './components/HomeAnimation'
import HomeSlide from './components/HomeSlide'
import HomeService from './components/HomeService'
import HomeLine from './components/HomeLine'
import HomeAbout from './components/HomeAbout'
import HomeImage from './components/HomeImage'
import { BACKGROUNDFIXED_IMG_URL } from '../../constants/images'

function Home() {
  return (
    <Fragment>
      <HomeAnimation />
      <HomeImage
        image={BACKGROUNDFIXED_IMG_URL.first} //
        content='EV Share'
      />
      <HomeService />
      <HomeImage
        image={BACKGROUNDFIXED_IMG_URL.second} //
        content='Share the Ride – Connect the Benefits'
      />
      <HomeAbout />
      <HomeLine />
      <HomeSlide />
    </Fragment>
  )
}

export default Home
