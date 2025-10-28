import { Router } from 'express'
import {
  createUser,
  deleteuser,
  getUserById,
  getUsers,
  updateUser
} from '../controllers/user.controller.js'

const router = Router()

router.route('/').get(getUsers).post(createUser)

router.route('/:id').get(getUserById).put(updateUser).delete(deleteuser)

export default router
