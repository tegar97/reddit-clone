import { useRouter } from 'next/router'
import React from 'react'

function Slug({post}) {
    const router = useRouter()
    const { slug } = router.query
   return (
        <div className="pt-12">
            {post.body}
        </div>
    )
}


// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('http://localhost:5000/api/post')
    const posts = await res.json()
  
    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
      params: { id: post.identifier, slug: post.slug},
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }
export async function getStaticProps ({params}){
    const res = await fetch(`http://localhost:5000/api/post/${params.id}/${params.slug}`)
    const post = await res.json()
    return {
        props: { post },
        // Re-generate the post at most once per second
        // if a request comes in
      }
}

export default Slug
