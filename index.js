process.on('uncaughtException',(err)=> {
    console.log(err)
  })

import express from 'express'
import { DBconnection } from './dbConnection/dbConnection.js';
import { userRouter } from './src/moduels/user/user.router.js';
import { companyRouter } from './src/moduels/company/company.router.js';
import { globalError } from './src/middelwar/globalError.js';
import { jobRouter } from './src/moduels/job/job.router.js';
import 'dotenv/config'


const app = express()
const port = 3000;


app.use(express.json())
DBconnection()
app.use(userRouter)
app.use(companyRouter)
app.use(jobRouter)
app.use(globalError)

process.on('unhandledRejection',(err)=>{
    console.log(err)
  })
  
app.listen(process.env.PORT||port,()=>{
    console.log(`server is runing on port 3000...`)
})

