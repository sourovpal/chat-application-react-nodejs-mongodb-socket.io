const UserModel = require('../Models/UserModel');
const MessageModel = require('../Models/MessageModel');


class MessageController{
    
    constructor(){
    }

    sendMessage = async(data)=>{
        try{
            const fromUser = await UserModel.findOne({username:data.from});
            const toUser = await UserModel.findOne({username:data.to});
            if(fromUser && toUser){
                const message = {
                    from_id:fromUser._id,
                    to_id:toUser._id,
                    messages:[
                        {
                            text:data.message,
                            time:new Date().toTimeString(),
                            date:new Date().toDateString(),
                            files:[]
                        }
                    ],
                    is_seen:1,
                }
                const resMessage = await MessageModel.create(message);
                return {
                    status_code:200,
                    data:resMessage,
                    from_user:{
                        user_id:fromUser._id,
                        full_name:fromUser.name.first+" "+fromUser.name.last,
                        username:fromUser.username,
                        avatar:fromUser.avatar,
                        email:fromUser.email,
                    },
                    to_user:{
                        user_id:toUser._id,
                        full_name:toUser.name.first+" "+toUser.name.last,
                        username:toUser.username,
                        avatar:toUser.avatar,
                        email:toUser.email,
                    },
                }
            }
            return {
                status_code:400,
                message:'Invalid Username.'
            }
        }catch(error){
            return {
                status_code:500,
                message:error.message
            }
        }
    }
    fetchLastMessage = async(data)=>{
        try{
            const fromUser = await UserModel.findOne({username:data.from});
            const toUser = await UserModel.findOne({username:data.to});
            if(fromUser && toUser){

                const messages = await MessageModel.find({
                    $or: [
                      { from_id:fromUser._id, to_id:toUser._id },
                      { from_id:toUser._id, to_id:fromUser._id },
                    ]
                  }).limit(data.limit || 20).sort({_id:-1});

                //   const lastDelivery = await UserModel.findOne({}).and([{ is_seen:1 }, { is_seen:1 }]).sort({_id:-1});
                //   console.log(lastDelivery);
                return {
                    status_code:200,
                    data:messages,
                    from_user:{
                        user_id:fromUser._id,
                        full_name:fromUser.name.first+" "+fromUser.name.last,
                        username:fromUser.username,
                        avatar:fromUser.avatar,
                        email:fromUser.email,
                    },
                    to_user:{
                        user_id:toUser._id,
                        full_name:toUser.name.first+" "+toUser.name.last,
                        username:toUser.username,
                        avatar:toUser.avatar,
                        email:toUser.email,
                    },
                }
            }
            return {
                status_code:400,
                message:'Invalid Username.'
            }
        }catch(error){
            console.log(error);
            return {
                status_code:500,
                message:error.message
            }
        }
    }

    messageDeliverySuccess = async(data)=>{
        const message = {
            is_seen:2,
        }
        const resMessage = await MessageModel.findByIdAndUpdate({_id:data.message_id}, message);
    }


}

module.exports = MessageController;