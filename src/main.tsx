import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import CreateTrip from './create-trip/index.tsx'
import Header from './components/custom/Header.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.tsx'
import Footer from './components/custom/Footer.tsx'
import MyTrips from './my-trips/index.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/create-trip',
    element: <CreateTrip/>
  },
  {
    path: '/view-trip/:tripId',
    element: <Viewtrip/>
  },
  {
    path: '/my-trips',
    element: <MyTrips/>
  }
])

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <GoogleOAuthProvider clientId="917575720008-fnlsofipqbcv8rj88thed9qsq95sm8uk.apps.googleusercontent.com">
    <Header/>
    <Toaster />
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
    <Footer />
  </StrictMode>,
)
