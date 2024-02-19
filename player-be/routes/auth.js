const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/authController.js')
router.get('/', (req, res) => {
   res.status(200).json({ message: 'hloooo' })
})
router.post('/register', register)
router.post('/login', login)
module.exports = router