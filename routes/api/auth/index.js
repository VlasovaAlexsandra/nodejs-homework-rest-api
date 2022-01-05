import { Router } from 'express'
import { registration, login, logout } from '../../../controlers/auth'

const router = new Router()

router.post('/registration', registration)
router.post('/login', login)
router.post('/logout', logout)

export default router
