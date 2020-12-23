import { NextFunction, Request, Response } from 'express';


export default (req: Request,res: Response,next: NextFunction) => {
    const exciption = ["password"]

    Object.keys(req.body).forEach(key => {
        if(!exciption.includes(key) && typeof req.body[key] === 'string') {
            req.body[key] = req.body[key].trim()

            console.log(req.body[key])
        }
    })

    next()
}