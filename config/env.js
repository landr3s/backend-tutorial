import { config } from 'dotenv'

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })

export const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  EXPIRES_IN,
  ARJECT_ENV,
  ARJECT_KEY
} = process.env
