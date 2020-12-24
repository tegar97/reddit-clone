import { isEmpty, IsEmpty, validate } from 'class-validator'
import {Request,Response, Router} from 'express'
import User from './../entities/User'
import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import auth from './../middleware/auth'
const login = async(req:Request,res : Response) =>{
    const {username,password} = req.body

    try {
        let errors : any = {}

        // if(isEmpty(username)) errors.username = 'username must not be empty'
        // if(IsEmpty(password)) errors.password = 'Password must not be empty'
        // if(Object.keys(errors).length > 0) {
        //     return res.status(400).json(errors)
        // }
        const user = await User.findOne({username})
        if(!user) { 
            return res.status(400).json({
                message: 'User Not Found'
            })
        }

        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch) {
            return res.status(400).json({
                message: 'Password incorect'
            })

        }

        const token = jwt.sign({username},process.env.JWT_SECRET)

        res.set('Set-Cookie',cookie.serialize('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true: false,
            sameSite: 'strict',
            maxAge: 3600,
            path: '/'

        }))


        return res.json(user)
    } catch (error) {
        
    }
}
const register = async (req: Request,res : Response) =>{
    const {email,password,username} = req.body

    try {
        // TODO VALIDATE DATA
        let errors : any = {}
        const emailUser = await User.findOne({email})
        const userNameUser = await User.findOne({username})

        if(emailUser) errors.email  = 'Email is taken'
        if(userNameUser) errors.password  = 'username is taken'
        const user = new User({email,password,username}) 

        errors = await validate(user)
        if(Object.keys(errors).length > 0) {
            res.status(400).json(errors)
        }

        // TODO CREATE THE USER
    
        

        await user.save()

        

        // TODO RETURN USER
        res.json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
const me = async (req: Request,res: Response) =>{
    return res.json(res.locals.user)
}

const logout = async (req: Request,res: Response) =>{
    res.set('Set-Cookie',cookie.serialize('token','',{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true: false,
        sameSite: 'strict',
        maxAge: 3600,
        path: '/'
    }))

    return res.status(200).json({success: true})
}
const router = Router()

router.post('/register',register)
router.post('/login',login)
router.get('/me',auth,me)
router.get('/logout',auth,logout)

export default router