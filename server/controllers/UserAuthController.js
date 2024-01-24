const bcrypt = require("bcrypt")
const UserModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');

class UserAuthController{

    constructor(){
    }

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
            const auth = await this.createAuth(user, uuid);
            return res.status(200).json({
                status_code:200,
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

    login = async(req, res)=>{
        res.end('Hello');
    }

    forgotPassword = async(req, res)=>{
        return res.end('forgot');
    }

    resetPassword = async(req, res)=>{
        return res.end('reset');
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
            `${uuid}.${process.env.JWT_SECRET}`, 
            {
                expiresIn: expiresIn,
            });
            data['token_type'] = "Bearer";
            data['token'] = token;
            data['exact_token'] = `Bearer ${token}`;
            return data;
        }catch(error){
            new Error(error.message);
        }
    }

}

module.exports = UserAuthController;