
// console.log(io.sockets.adapter.rooms)
// socket.broadcast.emit('test')
// console.log(io.sockets.adapter.rooms);
// socket.broadcast.to(data.to).emit("receive_message", data);

const MessageController = require("../controllers/MessageController");
const UsersModel = require('../Models/UserModel');




const SocketEventController = (socket, io)=>{

    const MessageControl = new MessageController;

    console.log("+++++++++", socket.user.username, "+++++++++");
    
    socket.on('join', async()=>{
        const data = socket.user;
        console.log('join', data.username)
        socket.join(data.username);
        var users = await UsersModel.find({});
        var onlineUsers = [];
        var onlineUsername = [];
        users.map((user)=>{
            var result = {
                name:user.name,
                username:user.username,
                avatar:user.avatar,
            }
            if(io.sockets.adapter.rooms.get(user.username)){
                // io.emit('connect_new_user', {});
                onlineUsername.push(user.username);
                result['online'] = true;
            }else{
                result['online'] = false;
            }
            onlineUsers.push(result);
        });
        socket.emit('fetch_all_users', {
            users:onlineUsers
        });
        
        socket.broadcast.in(onlineUsername).emit("fetch_all_users", {
            users:onlineUsers
        });
            
    });
    
    socket.on('send_message', async(data)=>{
        const res = await MessageControl.sendMessage(data);
        if(res.status_code === 200){
            socket.emit('receive_message', res);
            socket.broadcast.to(data.to).emit('receive_message', res);
        }else{
            socket.emit('error', res);
        }
    });
    
    socket.on('fetch_last_message', async(data)=>{
        const res = await MessageControl.fetchLastMessage(data);
        if(res.status_code === 200){
            socket.emit('fetch_last_message', res);
        }else{
            socket.emit('error', res);
        }
    });
    
    socket.on('message_delivery_success', async(data)=>{
        console.log(data);
        const res = await MessageControl.messageDeliverySuccess(data);
        // if(res.status_code === 200){
        //     socket.emit('fetch_last_message', res);
        // }else{
        //     socket.emit('error', res);
        // }
    });


    
    
    
    
    
    
    
    
    
    
    
    
    socket.on('disconnect', async()=>{
        console.log("--------",socket.user.username, "---------");

        
        var users = await UsersModel.find({});
        var onlineUsers = [];
        var onlineUsername = [];
        users.map((user)=>{
            var result = {
                name:user.name,
                username:user.username,
                avatar:user.avatar,
            }
            if(io.sockets.adapter.rooms.get(user.username)){
                onlineUsername.push(user.username);
                result['online'] = true;
            }else{
                result['online'] = false;
            }
            onlineUsers.push(result);
        });
        socket.emit('fetch_all_users', {
            users:onlineUsers
        });

        socket.broadcast.emit("fetch_all_users", {
            users:onlineUsers
        });
    });
}


module.exports = SocketEventController;