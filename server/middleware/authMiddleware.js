const {verify} = require('jsonwebtoken')

const validateToken = (req, res, next) => {
  const accessToken = req.header("token")
  console.log(req.body.tokentest)
  console.log(req.header("test"));
  if(!accessToken) {
    return res.json({error: "User is not logged in"})
  }

  try {
    const validToken = verify(accessToken, "shhhhh its a secret")
    if(validToken){
      req.user = validToken
      req.body.test = "testing res body"
      return next()
    }
  } catch (err) {
    return res.json({error: err});
  }
} 

module.exports = {validateToken}
