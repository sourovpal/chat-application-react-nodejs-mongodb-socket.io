const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        first:{ 
            type: String, 
            required: true 
        },
        last:{ 
            type: String, 
            required: true 
        },
    },  
    email: { 
        type: String, 
        required: true, 
        index: true,
        unique: true
    },
    username: {
        type: String, 
        required: true, 
        index: true, 
        unique: true
    },
    password:{
        type:String, 
        required:true
    },
    avatar:{
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
UserSchema.index({ username: 1, email: 1 }, { unique: true });
const Users = mongoose.model('Users', UserSchema);


module.exports = Users;