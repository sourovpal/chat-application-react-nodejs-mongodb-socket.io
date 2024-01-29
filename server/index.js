require('dotenv').config();
const express = require('express');
const app = express();
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const UsersModel = require('./Models/UserModel');
//  Routers
const UserRuter = require('./routers/user');
const SocketJWTTokenValidation = require('./functions/SocketJWTTokenValidation');




// Server Listener and port Set
const server = app.listen(process.env.PORT || 3000, async()=>{
    await mongoose.connect(process.env.DATABASE_CONNECTION_URL);
    console.log(`Server is Started: http://localhost:${process.env.PORT}`);
});
/***
 * App Use Dependinces
 ***/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.use(SocketJWTTokenValidation);
io.on('connection', (socket)=>{
    console.log("+++++++++", socket.user.username, "+++++++++");


    
    
    socket.on('join', async()=>{
        const data = socket.user;
        console.log('join', data.username)
        socket.join(data.username);
            // console.log(io.sockets.adapter.rooms)
            // socket.broadcast.emit('test')
            // console.log(io.sockets.adapter.rooms);
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
    
    
    
    
    socket.on('send_message', (data)=>{
        console.log(data)
        console.log(io.sockets.adapter.rooms)
        socket.broadcast.to(data.to).emit('receive_message', data);
        // socket.broadcast.to(data.to).emit("receive_message", data);
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
});



app.use('/api/v1/user', UserRuter);


app.all('*', (req, res)=>{
    res.status(404).json({
        status_code:404,
        message:'Not Found!',
    });
});

