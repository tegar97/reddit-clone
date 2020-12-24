import {Request,Response, Router} from 'express'
import Post from '../entities/Post'
import auth from '../middleware/auth'

export const createPost = async(req: Request,res : Response) =>{
    const {title,body,sub} = req.body
    const user = res.locals.user
   
    try {
        //TODO FIND SUB
        const subRecord = await sub.findOneOrFail({name: sub})


        const post  = new Post({title,body,user,sub : subRecord})
        await post.save()

        return res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})

        
    }

    

}

export const getPosts = async(req: Request,res: Response) => {
    try {
        const post = await Post.find({
            order: {createAt: 'DESC'},
            relations: ['sub']
        })

        return res.json(post)
    } catch (error) {
        console.log(error)
        return res.json({error: error})
        
    }
}


export const getPost = async(req: Request,res: Response) => {
    const {identifier,slug} = req.params
    try {
        const post = await Post.findOneOrFail({
            identifier,slug
        },
        {
            relations: ['sub']
        }
        )

        return res.json(post)
    } catch (error) {
        console.log(error)
        return res.json({error: error})
        
    }
}
const router = Router()

router.post('/',auth,createPost)
router.get('/',getPosts)
router.get('/:identifier/:slug',getPost)


export default router