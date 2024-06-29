import express from 'express'
import dotenv from 'dotenv'
import productRoutes from './routes/products.js'
import { connectDatabase } from './config/dbConnect.js'
import errorMiddleware from './middlewares/errors.js'

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shutting down due to uncaught exception`)
  process.exit(1)
})

const app = express() // For register routes and listen to ports

dotenv.config({path: 'backend/config/config.env'})

connectDatabase()

app.use(express.json()) // Use to parse json data

app.use("/api/v1", productRoutes)

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