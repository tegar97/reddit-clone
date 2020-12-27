import { useRouter } from 'next/router'
import React from 'react'

function Slug() {
    const router = useRouter()
    const { slug } = router.query
    return (
        <div className="pt-12">
            slug : {slug}
        </div>
    )
}

export default Slug
