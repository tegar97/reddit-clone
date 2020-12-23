import { validate } from 'class-validator'
import {Request,Response, Router} from 'express'
import {User } from './../entities/User'
const register = async (req: Request,res : Response) =>{
    const {email,password,username} = req.body

    try {
        // TODO VALIDATE DATA

        // TODO CREATE THE USER
        const user = new User({email,password,username}) 

        const errors = await validate(user)
        
        if(errors.length > 0 ) return res.status(400).json({errors})

        await user.save()

        

        // TODO RETURN USER
        res.json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const router = Router()

router.post('/register',register)

export default router