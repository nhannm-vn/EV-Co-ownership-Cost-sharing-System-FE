import { ToastContainer } from 'react-toastify'
import './App.css'
import Routers from './routers/configRouters'

function App() {
  return (
    <div>
      <Routers />
      <ToastContainer />
    </div>
  )
}

export default App
