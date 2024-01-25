const jwt =require("jsonwebtoken");
const UserJWTToken = require('../Models/UserJWTToken');
const UserModel = require("../Models/UserModel");
async function validateToken(req, res, next) {
  const auhorizationHeader = req.headers.authorization;
  let result;

  if (!auhorizationHeader) {
    return res.status(401).json({
      status_code: 401,
      message: "Access token is missing",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  const uuid = req.headers._uuid || '';
  const options = {
    expiresIn: "24h",
  };
  
  try {
    result = jwt.verify(token, `${uuid}___${process.env.JWT_SECRET}`, options);

    if (!result) {
      result = {
        status_code: 401,
        message: "Invalid token",
      };

      return res.status(401).json(result);
    }

    req.decoded = result;
    const checkToken = await UserJWTToken.findOne({uuid:uuid, token:token});
    if(checkToken){
      const user = await UserModel.findOne({_id:checkToken.user_id});
      if(user){
        req.auth = true;
        req.user = user;
        return next();
      }
    }
    return res.status(401).json({
      status_code: 401,
      message: "Invalid token",
    });

  } catch (error) {
    console.error(error);

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        status_code: 403,
        message: "Token expired",
      });
    }

    return res.status(403).json({
      status_code: 403,
      message: "Authentication error",
    });
  }
}

module.exports = validateToken;