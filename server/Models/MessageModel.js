const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    from_id:{
        type: String, 
        required: true, 
    },  
    to_id: { 
        type: String, 
        required: true
    },
    messages: {
        type: Array,
        required: false
    },
    is_seen:{
        type:Number, 
        required:false
    },
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Messages = mongoose.model('messages', MessageSchema);


module.exports = Messages;