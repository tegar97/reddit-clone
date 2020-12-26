export default class AppError extends Error {
    statusCode : number
    status: string
    isOperational : boolean
    additional?: any
    constructor(message,statusCode,additional?) {
        super(message)
        this.statusCode = statusCode;
        this.status = ''
        this.additional = additional
        this.isOperational = true
        Error.captureStackTrace(this,this.constructor)
    }
}
