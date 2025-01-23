import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { AppLayout } from './layouts/AppLayout'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { Auth } from './pages/Auth'
import { Link } from './pages/Link'
import { RedirectLink } from './pages/RedirectLink'
import { UserProvider } from './context'
import { ProtectedRoute } from './components/ProtectedRoute'
import { User } from './pages/User'

const router = createBrowserRouter([{
  element: <AppLayout/>,
  children: [
    {
      path:"/",
      element: <LandingPage/>
    },
    {
      path:"/user",
      element: <ProtectedRoute><User/></ProtectedRoute>
    },
    {
      path:"/dashboard",
      element: <ProtectedRoute><Dashboard/></ProtectedRoute>
    },
    {
      path:"/auth",
      element: <Auth/>
    },
    {
      path:"/link/:id",
      element: <ProtectedRoute><Link/></ProtectedRoute>
    },
    {
      path: "/:id",
      element: <RedirectLink/>
    }
  ]
}])

function App() {
  return <UserProvider><RouterProvider router={router}/></UserProvider>
}

export default App
