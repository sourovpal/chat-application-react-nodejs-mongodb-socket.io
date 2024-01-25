const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserJWTTokenSchema = new Schema({
    user_id:{
    },  
    ip_address:{
        type: String, 
        required: true, 
    },
    uuid: {
        type: String, 
        required: true, 
    },
    token: { 
        type: String, 
        required: true, 
    },
    device_name:{
        type:String, 
        required:true
    },
    operating_system:{
        type:String, 
        required:true
    },
    address:{
        type:String, 
        required:true
    },
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});
const UserJWTToken = mongoose.model('jwt_tokens', UserJWTTokenSchema);


module.exports = UserJWTToken;