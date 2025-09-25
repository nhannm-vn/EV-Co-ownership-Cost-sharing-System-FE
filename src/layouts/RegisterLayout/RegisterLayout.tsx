import Footer from '../../components/Footer'
import RegisterHeader from '../../components/RegisterHeader'

interface Props {
  children?: React.ReactNode
}

function RegisterLayout({ children }: Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}

export default RegisterLayout
