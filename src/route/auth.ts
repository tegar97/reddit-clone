import { Length } from 'class-validator';
import {validate } from 'class-validator'
import {NextFunction, Request,Response, Router} from 'express'
import User from './../entities/User'
import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import auth from './../middleware/auth'
import asyncHandler from '../util/asyncHandler';
import AppError from '../util/appError';

const mapErrors = (errors: Object[]) => {
    return errors.reduce((prev: any, err: any) => {
      prev[err.property] = Object.entries(err.constraints)[0][1]
      return prev
    }, {})
  }
const login = asyncHandler(async(req:Request,res : Response,next: NextFunction) =>{
    /*
    1.user send username and password and server receive data on req.body
    2.find username on USER TABLE(DATABASE),if username avaible , send to next step, if error send to errorHandler
    3.compare password on database and req.body.password 
    4.send cookies to http headers

    */
    const {username,password} = req.body
        let errors : any = {}
        const user = await User.findOne({username})
        
        if(!user) { 
            return next(new AppError('User not found',400))
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch) {
            return next(new AppError('wrong Password',400))
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
    })

const register = asyncHandler(async (req: Request,res : Response,next: NextFunction) =>{
    const {email,password,username} = req.body

        // TODO VALIDATE DATA
        let errors : any = {}
        const emailUser = await User.findOne({email})
        const userNameUser = await User.findOne({username})

        if(emailUser)errors.email = 'Email has been used'
        if(userNameUser) errors.password = 'Username has been taken'
        if (Object.keys(errors).length > 0) {

            return next(new AppError('Validate Error',400,errors))

        }
        const user = new User({email,password,username}) 

        errors = await validate(user)
        if(errors.length > 0) {
            return next(new AppError('Validate Error',400,mapErrors(errors)))
        }

        // TODO CREATE THE USER
    
        

        await user.save()

        

        // TODO RETURN USER
        res.json(user)

    
})

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