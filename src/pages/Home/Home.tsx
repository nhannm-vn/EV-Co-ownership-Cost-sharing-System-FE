import { Fragment } from 'react/jsx-runtime'
import HomeAnimation from './components/HomeAnimation'
import HomeSlide from './components/HomeSlide'
import HomeService from './components/HomeService'
import HomeLine from './components/HomeLine'
import HomeAbout from './components/HomeAbout'
import HomeImage from './components/HomeImage'

function Home() {
  return (
    <Fragment>
      <HomeAnimation />
      <HomeImage
        image='src/assets/slide/red-dot-iy8h-Cl8MLc-unsplash.jpg' //
        content='EV Share'
      />
      <HomeService />
      <HomeImage
        image='src/assets/slide/precious-madubuike-N2Td7KpIvYc-unsplash.jpg'
        content='Share the Ride – Connect the Benefits'
      />
      <HomeAbout />
      <HomeLine />
      <HomeSlide />
    </Fragment>
  )
}

export default Home
