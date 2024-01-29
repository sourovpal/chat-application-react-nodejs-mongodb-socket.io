const jwt =require("jsonwebtoken");
const UserJWTToken = require('../Models/UserJWTToken');
const UserModel = require("../Models/UserModel");

async function SocketJWTTokenValidation(req, next) {
    
    try {

        const auhorizationHeader = req.request.headers.authorization;
        let result;
        if (typeof auhorizationHeader === "undefined" && auhorizationHeader === '') {
            next(new Error("Access token is missing"));
        }
    
        const token = req.request.headers.authorization.split(" ")[1];
        const uuid = req.request.headers._uuid || '';
        const options = {
            expiresIn: "24h",
        };


        result = jwt.verify(token, `${uuid}___${process.env.JWT_SECRET}`, options);
        if (!result) {
        next(new Error('Invalid token'));
        }
        const checkToken = await UserJWTToken.findOne({uuid:uuid, token:token});
        if(checkToken){
        const user = await UserModel.findOne({_id:checkToken.user_id});
        if(user){
            req.auth = true;
            req.user = {
                user_id:user._id, 
                username:user.username, 
                name:user.name, 
                email:user.email
            };
            return next();
        }
        }
        next(new Error("Invalid token"));
    
} catch (error) {
    if (error.name === "TokenExpiredError") {
        next(new Error("Token Expired"));
    }
    next(new Error("Authentication Error"));
  }
}

module.exports = SocketJWTTokenValidation;