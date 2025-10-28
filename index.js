import express from 'express'
import connectDB from './database/connectDB.js'

import userRouter from './routes/user.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import authRouter from './routes/auth.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import { PORT } from './config/env.js'
import cookieParser from 'cookie-parser'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cookieParser())

server.use('/api/v1/users', userRouter)
server.use('/api/v1/subscriptions', subscriptionRouter)
server.use('/api/v1/auth', authRouter)

server.use(errorMiddleware)

const start = async () => {
  try {
    await connectDB()
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server', error)
    process.exit(1)
  }
}

start()
