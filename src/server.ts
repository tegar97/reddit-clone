import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express'
import morgan from 'morgan'
import authRoutes from './route/auth'
import trim from "./middleware/trim";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(trim)
app.use(cookieParser())
app.use(morgan("dev"))
app.use('/api/auth',authRoutes)


app.get('/',(req,res) => res.send('Hello World'))

app.listen(5000,async() =>{
    console.log('Server running at http://localhost:5000')
    try {
        await createConnection()
        console.log('Database Connected')
    } catch (error) {
        console.log(error)
    }
})
