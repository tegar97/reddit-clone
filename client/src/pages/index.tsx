import {useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import Link from 'next/link'
export default function Home({posts}) {

  
  return (
    <div className="pt-12">
    <Head>
      <title>Readit The Front Of  Internet</title>
    </Head>
    <div className="container flex pr-4">
      <div className="w-160">
        {
          posts.map(data =>(
            <ul>
              <Link href={`/post/${data.identifier}/${data.slug}`}>{data.title}</Link>

            </ul>
          ))
        }
     
      </div>
    </div>
    
    </div>
  )
}

export  const  getStaticProps : GetStaticProps = async (context) => {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:5000/api/post')
  const posts = await res.json()
  return {
    props:{
      posts
    },
    revalidate: 10,
  }
}
