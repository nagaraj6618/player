
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')
function passwordEncryption(password) {

   return password
}
const register = async (req, res) => {

   const fetchData = async () => {

      try {

         const salt = bcrypt.genSaltSync(10)
         let encrypt = passwordEncryption(req.body.password)
         const hash = bcrypt.hashSync(encrypt, salt)

         const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
         })
         console.log(newUser)
         await newUser.save()
         res.status(200).json({ success: true, message: "Successfully created" })
      }
      catch (err) {
         res.status(500).json({ success: false, message: "Failed to create" })
         console.log(err)
      }

   }
   fetchData()
}
const login = async (req, res) => {
   const email = req.body.email
   try {
      const user = await User.findOne({ email })
      if (!user) {
         return res.status(404).json({ success: false, message: "User not found" })
      }
      let encrypt = passwordEncryption(req.body.password)
      const checkCorrectPassword = await bcrypt.compare(encrypt, user.password)
      if (!checkCorrectPassword) {
         return res.status(401).json({ success: false, message: "Incorrect email or password" })
      }
      const { password, role, ...rest } = user._doc;

      const token = jwt.sign(
         {
            id: user._id, role: user.role
         },
         process.env.JWT_SECRET_KEY,
         {
            expiresIn: "1d"
         }
      );


      res.cookie('accessToken', token, {
         httpOnly: true,
         expires: token.expiresIn
      }).status(200).json({ token, success: true, message: "successfully login", data: { ...rest }, role })
   } catch (err) {
      res.status(500).json({ success: false, message: "Failed to login." })
   }
}

module.exports = { register, login }