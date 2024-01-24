const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//  Routers
const UserRuter = require('./routers/user');




// Server Listener and port Set
const server = app.listen(process.env.PORT || 3000, async()=>{
    await mongoose.connect(process.env.DATABASE_CONNECTION_URL);
    console.log(`Server is Started: http://localhost:${process.env.PORT}`);
});
/***
 * App Use Dependinces
 ***/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) 

const io = socketIo(server);

io.on('connection', (socket)=>{
    console.log('New user Connected:', socket.id);
});

app.all('/', (req, res)=>{
    res.end('Opps!');
});

app.use('/api/v1/user', UserRuter);



