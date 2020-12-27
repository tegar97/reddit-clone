import '../styles/globals.css'
import axios from 'axios'
import { Fragment } from 'react'
import Navbar from './../components/Navbar'
import { useRouter } from 'next/router'
axios.defaults.baseURL ='http://localhost:5000/api'
axios.defaults.withCredentials = true
function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter()
  const authRoutes = ['/register','/login']
  const authRoute = authRoutes.includes(pathname)
  return (
    <Fragment>
      {!authRoute && <Navbar/>}
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
