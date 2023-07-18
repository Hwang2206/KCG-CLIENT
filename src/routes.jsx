import { Suspense } from 'react'
import RouteLoader from './components/Loader/RouteLoader'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Profile from './views/Profile'
import CardMembership from './views/User/CardMembership'
import Login from './views/Auth/Login'
import Services from './views/User/Services'
import Equipment from './views/User/Equipment'
import CustomersManager from './views/Admin/CustomersManager'
import EquipmentManager from './views/Admin/EquipmentManager'
import ServicesPromotionManager from './views/Admin/ServicesPromotionManager'
import Register from './views/Auth/Register'

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<RouteLoader />}>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  </Suspense>
)

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/card-membership',
    element: <CardMembership />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/services',
    element: <Services />
  },
  {
    path: '/equipment',
    element: <Equipment />
  },
  {
    path: '/admin/customers',
    element: <CustomersManager />
  },
  {
    path: '/admin/equipments',
    element: <EquipmentManager />
  },
  {
    path: '/admin/services',
    element: <ServicesPromotionManager />
  }
]
