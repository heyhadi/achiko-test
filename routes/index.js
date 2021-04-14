'use strict'

const router = require('express').Router()
const UserController = require('../controllers/userController')
const {authentication} = require('../middlewares/authUser')
// const authentication = require('../middlewares/authentication')


router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.use(authentication)
router.get('/profile', UserController.showProfile)




module.exports = router 