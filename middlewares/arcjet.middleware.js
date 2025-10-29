import { aj } from '../config/arject.js'

export const arjectMiddleware = async (req, res, next) => {
  try {
    console.log('Client IP:', req.ip)

    const decision = await aj.protect(req, {
      requested: 1
    })

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        console.warn(`Rate limit exceeded for IP ${req.ip}`)
        return res.status(429).json({ message: 'Rate limit exceeded' })
      }
      if (decision.reason.isBot())
        return res.status(403).json({ message: 'Bot detected' })
      return res.status(403).json({ message: 'Access denied' })
    }

    next()
  } catch (error) {
    console.error(`Arject middleware error: ${error}`)
    next(error)
  }
}
