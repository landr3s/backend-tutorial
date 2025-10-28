import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const error = new Error('User already exists')
      error.statusCode = 400
      throw error
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUsers = await User.create([
      { name, email, password: hashedPassword }
    ])
    res.status(201).json({
      message: 'User created successfully',
      status: 'success',
      data: {
        user: newUsers[0]
      }
    })

    await session.commitTransaction()
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select('-password')
    res.status(200).json({ success: true, data: { user } })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select('-password')
    if (!user) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }

    const { name, email, password } = req.body

    user.name = name || user.name
    user.email = email || user.email
    if (password) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
    }

    await user.save()

    res.status(200).json({
      message: 'User updated successfully',
      status: 'success',
      data: { user }
    })
  } catch (error) {
    next(error)
  }
}

export const deleteuser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select('-password')
    if (!user) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    await User.findByIdAndDelete(id)
    res.status(200).json({
      message: 'User deleted successfully',
      status: 'success'
    })
  } catch (error) {
    next(error)
  }
}
