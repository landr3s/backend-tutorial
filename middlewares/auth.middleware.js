import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'
import User from '../models/user.model.js'

export const authorize = async (req, res, next) => {
  try {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.decode(token, JWT_SECRET)

      const user = await User.findVById(decoded.userId)

      if (!user) res.status(401).json({ message: 'Unauthorized' })

      req.user = user

      next()
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
