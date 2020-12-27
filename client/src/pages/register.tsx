import {FormEvent, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {useRouter} from 'next/router'
import InputGroup from '../components/inputGroup'
export default function Home() {
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [aggrement,setAggrement] = useState(false)
  const [errors, setErrors] = useState<any>({})

  const router = useRouter()

  const onSubmit = async(e: FormEvent) => {
    e.preventDefault()

    try {
      if(!aggrement){
        setErrors({...errors,aggrement: 'You Must Aggre to Tos'})
      }else{

        const res = await axios.post('/auth/register',{
          email,
          password,
          username
        })
        router.push('/login')
      }
    } catch (error) {
      console.log(error)
      setErrors(error.response.data)
    }
  
  }
  return (
   <div className="flex"> 
       <Head>
         <title>Register</title>
         <link rel="icon" href="favicon.ico"/>
       </Head>

       <div className="h-screen bg-center bg-cover w-36" style={{backgroundImage: "url('/images/bricks.jpg')"}}/>
  
       <div className="flex flex-col justify-center pl-6">
         <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
          <p className="mb-10 text-xs">By Continuing,you agree to our User Agreement and Privacy  Policy</p>
          <form onSubmit={onSubmit}>
            <div className="mb-4 mb">
              <input type="checkbox" className="mr=1 cursor-pointer" checked={aggrement}  onChange={e => setAggrement(e.target.checked)} id="aggrement"/>
              <label htmlFor="aggrement" className="m-2 text-xs" >I agree to get emails about cool stuf on readit</label>
            <small  className="block font-medium text-red-600">{errors.aggrement}</small>
            </div>
           <InputGroup type="email" className="mb-2" value={email} setValue={setEmail} placeholder="Email" error={errors.error?.email}/>
           <InputGroup type="text" className="mb-2" value={username} setValue={setUsername} placeholder="Username" error={errors.error?.username}/>
           <InputGroup type="password" className="mb-2" value={password} setValue={setPassword} placeholder="Email" error={errors.error?.password}/>
           
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">Sign Up</button>
          </form>
          <small>Already Readit Account ? <Link href="/login"><a className="ml-1 text-blue-500 uppercase"> Login Now</a></Link></small>
         </div>
       </div>
   </div>
  )
}
