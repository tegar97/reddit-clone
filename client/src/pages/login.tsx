import {FormEvent, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {useRouter} from 'next/router'
import InputGroup from '../components/inputGroup'
export default function Home() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [errors, setErrors] = useState<any>({})

  const router = useRouter()

  const onSubmit = async(e: FormEvent) => {
    e.preventDefault()

    try {
        const res = await axios.post('/auth/login',{
          password,
          username
        })
        router.push('/login')
      
    } catch (error) {
      console.log(error)
      setErrors(error.response.data)
    }
  
  }
  return (
   <div className="flex"> 
       <Head>
         <title>Login</title>
       </Head>

       <div className="h-screen bg-center bg-cover w-36" style={{backgroundImage: "url('/images/bricks.jpg')"}}/>
  
       <div className="flex flex-col justify-center pl-6">
         <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Login</h1>
          <p className="mb-10 text-xs">By Continuing,you agree to our User Agreement and Privacy  Policy</p>
          <form onSubmit={onSubmit}>
          
           <InputGroup type="text" className="mb-2" value={username} setValue={setUsername} placeholder="Username" error={errors.error?.username}/>
           <InputGroup type="password" className="mb-2" value={password} setValue={setPassword} placeholder="Password" error={errors.error?.password}/>
           
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">Login</button>
          </form>
          <small>New to readit ? <Link href="/register"><a className="ml-1 text-blue-500 uppercase">Sign Up</a></Link></small>
         </div>
       </div>
   </div>
  )
}
