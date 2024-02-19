const jwt = require('jsonwebtoken')

function verifyTokens(token) {
   let reqUser = null
   if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized" })
   }
   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
         return res.status(401).json({ success: false, message: 'token is invalid' })
      }
      reqUser = user
   })
   return reqUser

}
const verifyAdmin = (req, res, next) => {

   // console.log(req.cookies.accessToken)
   const user = verifyTokens(req.cookies.accessToken)

   if (user.role === 'admin') {
      next()
   }
   else {
      return res.status(401).json({ success: false, message: "Not Authenticated" })
   }

}

module.exports = { verifyAdmin }