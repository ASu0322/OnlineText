import express from 'express'
import login from './login.route'
import register from './register.route'
import mainPage from './mainPage.route'
import verification from './verification.route'
import file from './file.route'

const router = express.Router()

router.use('/login', login)
router.use('/register', register)
router.use('/mainPage', mainPage)
router.use('/verification', verification)
router.use('/file', file)

export default router 