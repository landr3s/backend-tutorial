import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { EXPIRES_IN, JWT_SECRET } from '../config/env.js'
import User from '../models/user.model.js'

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const error = new Error('User already exists')
      error.statusCode = 409
      throw error
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUsers = await User.create([
      { name, email, password: hashedPassword }
    ])

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: EXPIRES_IN
    })

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: newUsers[0]
    })
  } catch (error) {
    next(error)
  }
}

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      const error = new Error('Password not valid')
      error.statusCode = 401
      throw error
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: EXPIRES_IN
    })

    res.status(200).json({
      message: 'Sign in successfully',
      success: true,
      data: {
        user,
        token
      }
    })
  } catch (error) {
    next(error)
  }
}
