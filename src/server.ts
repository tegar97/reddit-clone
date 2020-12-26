import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express'
import morgan from 'morgan'
import authRoutes from './route/auth'
import postRoutes from './route/post'
import subsRoutes from './route/subs'
import trim from "./middleware/trim";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import ErrorHandler from "./util/ErrorHandler";


dotenv.config()

const app = express()

app.use(express.json())
app.use(trim)
app.use(cookieParser())
app.use(morgan("dev"))
app.use('/api/auth',authRoutes)
app.use('/api/post',postRoutes)
app.use('/api/subs',subsRoutes)


app.get('/',(req,res) => res.send('Hello World'))

const PORT = process.env.PORT || 5000

app.use(ErrorHandler)

app.listen(PORT,async() =>{
    console.log('Server running at http://localhost:5000')
    try {
        await createConnection()
        console.log('Database Connected')
    } catch (error) {
        console.log(error)
    }
})
