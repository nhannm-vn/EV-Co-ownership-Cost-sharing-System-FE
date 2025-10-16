import './App.css'
import Routers from './routers/configRouters'
import { ToastContainer } from 'react-toastify'

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
