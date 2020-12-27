import '../styles/globals.css'
import axios from 'axios'

axios.defaults.baseURL ='http://localhost:5000/api'
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
