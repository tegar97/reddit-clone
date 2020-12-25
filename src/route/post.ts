import {Request,Response, Router} from 'express'
import Comment from '../entities/Comments'
import Post from '../entities/Post'
import Sub from '../entities/subs'
import auth from '../middleware/auth'

export const createPost = async(req: Request,res : Response) =>{
    const {title,body,sub} = req.body
    const user = res.locals.user
   
    try {
        //TODO FIND SUB
        const subRecord = await Sub.findOneOrFail({name: sub})


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
            relations: ['sub','comments']
        }
        )

        return res.json(post)
    } catch (error) {
        console.log(error)
        return res.json({error: error})
        
    }
}

export const createComment = async(req: Request,res: Response) =>{
    const {identifier, slug} = req.params
    const {body} = req.body 

    try {
        const post = await Post.findOneOrFail({identifier,slug})

        const comment = new Comment({
            body,
            user: res.locals.user,
            post
        })
        await comment.save()
        res.status(200).json(comment)

    } catch (error) {
        console.log(error)
        res.status(400).json({message: error})
    }
}
const router = Router()

router.post('/',auth,createPost)
router.get('/',getPosts)
router.get('/:identifier/:slug',getPost)    
router.post('/:identifier/:slug/comments',auth,createComment)


export default router