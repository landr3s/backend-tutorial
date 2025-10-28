import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, ['Name must be required']],
      trim: true,
      minLength: 2,
      maxLength: 50
    },
    email: {
      type: String,
      required: [true, 'Email must be required'],
      trim: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+.\S+/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password must be required'],
      trim: true,
      minLength: 6
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
