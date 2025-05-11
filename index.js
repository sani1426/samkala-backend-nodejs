import express from 'express'
import connectToDb from './config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/index.js'
import cookieParser from 'cookie-parser'
import productRouter from './routes/productRouter.js'

dotenv.config()

//  Middlewares .....
const app = express()
app.use(cors({
  origin : process.env.FRONTEND_URL ,
  credentials : true
}))
app.use(express.json())
app.use(cookieParser())


//  api Routes  //


app.use("/api/users" , userRouter)


app.use("/api/products" , productRouter )






//   wellcome response for checking ...
app.get('/', (req, res) => {
  res.send('wellcome to samKala')
})



//  Running The Server .... // Connecting To Mongo Db ..
const port = process.env.PORT || 3000
connectToDb().then(() => {
  app.listen(port, () =>
    console.log(`server is running on port  ${process.env.PORT}  ✔✔❤❤`)
  )
})
