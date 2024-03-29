const bcrypt = require("bcrypt")
const UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const UserJWTToken = require("../Models/UserJWTToken");


class UserAuthController{
    
    constructor(){
    }
    /***
     * User Register Method @register
     * @return Object
    ***/
   register = async(req, res)=>{
       try{
           const uuid = req.headers._uuid || '';
           if(!uuid || uuid.length < 15){
               return res.status(422).json({
                   status_code:422,
                   message:'Unable to register with this device',
                });
            }
            var checkEmail = await UserModel.findOne({email:req.body.email});
            if(checkEmail){
                return res.status(422).json({
                    status_code:422,
                    message:'This email already registered.',
                });
            }
            const password = bcrypt.hashSync(req.body.password, Number(process.env.SALT_ROUNDS));
            var data = {
                name:{
                    first:req.body.first_name,
                    last:req.body.last_name,
                },
                email:req.body.email,
                username:req.body.email.split('@')[0],
                password:password,
                avatar:`https://ui-avatars.com/api/?name=${req.body.first_name}+${req.body.last_name}`,
            };
            const user = await UserModel.create(data);
            /*** Self Method @createAuth ***/
            const auth = await this.createAuth(user, uuid);
            return res.status(201).json({
                status_code:201,
                data:auth,
                message:'New User Created Successful.',
            });
        }catch(error){
            console.log(error);
            return res.status(error.status || 500).json({
                status_code:error.status || 500,
                message:error.message,
            });
        }
    }
    /***
     * User Login Method @login
     * @return Object
    ***/
   login = async(req, res)=>{
        try{
            const uuid = req.headers._uuid || '';
            if(!uuid || uuid.length < 15){
                return res.status(422).json({
                    status_code:422,
                    message:'Unable to login with this device',
                });
            }
            var user = await UserModel.findOne({email:req.body.email});
            if(!user){
                return res.status(404).json({
                    status_code:404,
                    message:'This email is not registered.',
                });
            }else{
                const isMatch = await bcrypt.compareSync(req.body.password, user.password);
                if(isMatch){
                    const auth = await this.createAuth(user, uuid);
                    return res.status(200).json({
                        status_code:200,
                        data:auth,
                        message:'Successfully logged in.',
                    });
                }
                return res.status(403).json({
                    status_code:403,
                    message:'This password not match.',
                });
            }
        }catch(error){
            return res.status(error.status || 500).json({
                status_code:error.status || 500,
                message:error.message,
            });
        }
    }

    forgotPassword = async(req, res)=>{
        return res.end('forgot');
    }

    resetPassword = async(req, res)=>{
        return res.end('reset');
    }
    logout = async (req, res)=>{
        try{
            const token = req.headers.authorization.split(" ")[1];
            const uuid = req.headers._uuid || '';
            const checkToken = await UserJWTToken.findOne({uuid:uuid, token:token});
            if(checkToken){
                await checkToken.deleteOne();
                return res.status(200).json({
                    status_code: 200,
                    message: "Successfully logged out.",
                });
            }
            return res.status(401).json({
                status_code: 401,
                message: "Invalid token",
            });
        }catch(error){
            return res.status(500).json({
                status_code: 500,
                message: error.message,
            });
        }
    }
    createAuth = async(user=null, uuid=null, expiresIn='24h')=>{
        try{
            
            const  data = {
                user_id: user._id,
                first_name: user.name.first,
                last_name: user.name.last,
                full_name: `${user.name.first} ${user.name.last}`,
                username:user.username,
                email:user.email,
                avatar:user.avatar,
                created_at:user.created_at,
                updated_at:user.updated_at,
            }
            const token = await jwt.sign({
                user_id:user._id, 
                guard:'user'
            }, 
            `${uuid}___${process.env.JWT_SECRET}`, 
            {
                expiresIn: expiresIn,
            });
            data['token_type'] = "Bearer";
            data['token'] = token;
            data['exact_token'] = `Bearer ${token}`;
            if(uuid){
                const jwtData = {
                    user_id:user._id,
                    ip_address:'1.2.23.65',
                    uuid,
                    token,
                    device_name:'Computer',
                    operating_system:'windows',
                    address:'Dhaka, Bangladesh',
                }
                const jwtToken = await UserJWTToken.create(jwtData);
            }
            return data;
        }catch(error){
            new Error(error.message);
        }
    }

}

module.exports = UserAuthController;