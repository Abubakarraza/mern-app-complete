const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const authenticate = async (req, res, next) => {
  console.log('hello this is middleware');
  try {
    const token = await req.cookies.woken;
    //  if (token) {
    // console.log(token)
    const verifyToken = await jwt.verify(token, process.env.PRIVATE_KEY);
    // console.log(verifyToken);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      'tokens.token': token,
    });

    if (!rootUser) {
      res.status(404).json({ error: 'user is not Found' });
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    req.user = verifyToken;
    // } else {
    //   res.status(411).json({ error: 'User is unAuthorized' });
    // }
    next();
  } catch (error) {
    // res.status(401).json({ error: "User is not  Authorized",status:401 })
    console.log(error);
  }
};
module.exports = authenticate;
