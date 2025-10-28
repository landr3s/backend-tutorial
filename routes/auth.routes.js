import { Router } from 'express'
import { signUp } from '../controllers/auth.controller.js'

const router = Router()

router.route('/sign-up').post(signUp)
// router.route('/sign-in').post(signIn)
// router.route('/sign-out').post(signOut)

export default router
