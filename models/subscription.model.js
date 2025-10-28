import mongoose from 'mongoose'

const subscriptionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name must be required'],
      trim: true,
      minLength: 2,
      maxLength: 1000
    },
    price: {
      type: Number,
      required: [true, 'Price must be required'],
      min: [0, 'Price must be greater than 0']
    },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'GBP'],
      default: 'USD'
    },
    frecuency: {
      type: String,
      enum: ['daily', 'weakly', 'monthly', 'yearly']
    },
    category: {
      type: String,
      enum: [
        'sports',
        'news',
        'entertainment',
        'lifestyle',
        'technology',
        'finance',
        'politics',
        'other'
      ],
      required: true
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: 'Start date must be in the past'
      }
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: (value) => value > this.startDate,
        message: 'Renewal date must be after than start date'
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    }
  },
  { timestamps: true }
)

subscriptionSchema.pre('save', (next) => {
  if (!this.renewalDate) {
    const period = {
      daily: 1,
      weakly: 7,
      monthly: 30,
      yearly: 365
    }
    this.renewalDate = new Date(this.startDate)
    this.renewalDate.setDate(
      this.renewalDate.getDate() + period[this.frecuency]
    )

    if (this.renewalDate < new Date()) {
      this.status = 'expired'
    }
    next()
  }
})

const Suscription = mongoose.model('Subscription', subscriptionSchema)

export default Suscription
