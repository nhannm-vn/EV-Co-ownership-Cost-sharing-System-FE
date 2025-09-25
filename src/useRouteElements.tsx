import { createBrowserRouter } from 'react-router'
import RegisterHeader from './components/RegisterHeader'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RegisterHeader />
  }
])
