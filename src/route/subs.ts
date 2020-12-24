import { isEmpty } from 'class-validator';
import { create } from 'domain';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Sub from '../entities/subs';
import auth from '../middleware/auth';
import router from './auth';
const createSub = async(req: Request,res: Response) =>{
    const {title,description,name} = req.body
    const user = res.locals.user
    try {
        let errors: any = {}

        if(isEmpty(name)) errors.name = 'Name Must be emty'
        if(isEmpty(title)) errors.name = 'Name Must be emty'

        const sub = await getRepository(Sub).createQueryBuilder('sub').where('lower(sub.name) = :name',{name: name.toLowerCase()}).getOne()

        if(Object.keys(errors).length > 0) {
            throw errors
        }

        if(sub) errors.name = 'Sub exist Already'


    } catch (error) {
        return res.status(400).json(error)
    }

    try {
        const sub = new Sub({name,description,title,user})

        await sub.save()

        return res.json(sub)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})
        
    }
}

router.post('/',auth,createSub)

export default router