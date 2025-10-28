import mongoose from 'mongoose'

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    
  } catch (error) {
    session.abortTransaction
    session.endSession()
    next(error)
  }
}
