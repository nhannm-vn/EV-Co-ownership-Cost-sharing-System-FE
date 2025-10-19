import { ToastContainer } from 'react-toastify'
import './App.css'
import Routers from './routers/configRouters'

function App() {
  const routers = Routers()

  return (
    <div>
      {routers}
      <ToastContainer />
    </div>
  )
}

export default App
