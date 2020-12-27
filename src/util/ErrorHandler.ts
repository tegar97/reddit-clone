import { Console } from 'console';
import { NextFunction, Request, Response } from 'express';
const sendErrorDev = (err,req,res) =>{
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err.additional,
        reason: err

    })
}

const sendErrorProd = (err,req,res) =>{
    console.log(err.isOperational)
    if(err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            error: err.additional
        })
    }

    res.status(500).json({
        status : 'ERROR',
        message : 'SOMETHING WENT ERROR , SOORY WE Will fix later '
    })

}

/* Error Handler   */

export default (err,req : Request,res : Response,next : NextFunction) =>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    console.log(err.statusCode)

    /*
     if development mode send error to sendErrorDev function  or when production send error to sendErroProd
     

    */

    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(err,req,res)

    }else{
        let error = {...err}
        error.message = err.message

        sendErrorProd(error,req,res)


    }
}