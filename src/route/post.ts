import {Request,Response, Router} from 'express'
import Post from '../entities/Post'
import auth from '../middleware/auth'

export const createPost = async(req: Request,res : Response) =>{
    const {title,body,sub} = req.body
    const user = res.locals.user
   
    try {
        //TODO FIND SUB
        const post  = new Post({title,body,user,subName: sub})
        await post.save()

        return res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})

        
    }

    

}

const router = Router()

router.post('/',auth,createPost)


export default router