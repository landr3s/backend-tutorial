import { Router } from 'express'

const router = Router()

router.route('/').post((req, res) => res.json({ msg: 'subscription post' }))

export default router
