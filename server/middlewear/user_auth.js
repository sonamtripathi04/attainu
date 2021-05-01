const jwt = require("jsonwebtoken");
const User = require('../model/User')


module.exports = async function(req, res, next) {
    const newToken = req.header("token");
    try {
      const user= await User.findOne({blacklist:newToken})
    if(user!==null){
    return res.status(401).json({ message: "Auth Error" })
    }else{
      const decoded = jwt.verify(newToken, "secret");
      req.user = decoded.user;
      req.token=newToken
      next();
    }
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Invalid Token" });
    }
  };