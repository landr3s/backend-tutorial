import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'
import User from '../models/user.model.js'

export const authorize = async (req, res, next) => {
  let token

  try {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1]
    }
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const decoded = jwt.verify(token, JWT_SECRET)

    const user = await User.findById(decoded.userId)

    req.user = user

    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message })
  }
}
