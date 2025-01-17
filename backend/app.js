import express from 'express'
import dotenv from 'dotenv'
import productRoutes from './routes/products.js'
import authRoutes from './routes/auth.js'
import orderRoutes from './routes/order.js'
import paymentRoutes from './routes/payment.js'
import { connectDatabase } from './config/dbConnect.js'
import errorMiddleware from './middlewares/errors.js'
import cookieParser from 'cookie-parser'

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shutting down due to uncaught exception`)
  process.exit(1)
})

const app = express() // For register routes and listen to ports

dotenv.config({path: 'backend/config/config.env'})

connectDatabase()

app.use(express.json({ 
  limit: '10mb', 
  verify: (req, res, buf) => {
    req.rawBody = buf.toString()
  }
})) // Use to parse json data with the limit of 10mb (file)
app.use(cookieParser()) // For handling cookies

app.use("/api/v1", productRoutes)
app.use("/api/v1", authRoutes)
app.use("/api/v1", orderRoutes)
app.use("/api/v1", paymentRoutes)


app.use(errorMiddleware)

const server = app.listen((process.env.PORT), ()=> {
  console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err}`)
  console.log(`Shutting down server due to unhandled promise rejection`)
  server.close(() => {
    process.exit(1)
  })
})