const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
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

const io = socketIo(server);

io.on('connection', (socket)=>{
    console.log('New user Connected:', socket.id);
});

app.all('/', (req, res)=>{
    res.end('Opps!');
});

app.use('/api/v1/user', UserRuter);



