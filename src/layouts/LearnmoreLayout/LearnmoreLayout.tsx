import Footer from '../../components/Footer'
import LearnmoreHeader from '../../components/LearnmoreHeader'

interface Props {
  children?: React.ReactNode
}

export default function LearnmoreLayout({ children }: Props) {
  return (
    <div>
      <LearnmoreHeader />
      {children}
      <Footer />
    </div>
  )
}
