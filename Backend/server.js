import express from 'express'
import router from "./Router/router.js"

import cors from 'cors'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
  }));
  
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/bugtracker.com',router)


app.listen(3000,() =>{
    console.log("PORT 3000 is Running")
})