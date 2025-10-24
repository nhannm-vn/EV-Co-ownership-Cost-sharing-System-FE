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
        content='A smart platform that simplifies electric vehicle co-ownership — manage usage, share costs, and stay transparent together.'
      />
      <HomeService />
      <HomeImage
        image={BACKGROUNDFIXED_IMG_URL.second} //
        content='Own, share, and save — the smarter way to manage electric vehicles together.'
      />
      <HomeAbout />
      <HomeLine />
      <HomeSlide />
    </Fragment>
  )
}

export default Home
