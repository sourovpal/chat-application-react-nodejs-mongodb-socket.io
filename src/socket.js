import { Manager } from 'socket.io-client';
import cookie from 'react-cookies';
import { userDeviceId } from './hooks/userDeviceId';

var token = cookie.load('chat_app_token');
const uid = userDeviceId();
const URL = 'http://localhost:8080';
const manager = new Manager(URL, {
    autoConnect: false,
    reconnectionAttempts:'infinite',
    extraHeaders:{
        _uuid:uid,
        Authorization:`Bearer ${token}` || ''
    },
});



var socket = manager.socket('/');
socket.on('connect', ()=>{
    socket.emit('join');
});
socket.on("connect_error", (err) => {
    console.log(err);
});

    
export default socket;


