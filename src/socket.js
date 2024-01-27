import { io } from 'socket.io-client';
import cookie from 'react-cookies';
import { useSelector } from 'react-redux';
import store from './redux/index';
const connectSocketIo =()=>{
    const {auth} = store.getState();
    const user = auth.user;
    const uid = auth.uuid;
    const URL = 'http://localhost:8080';
    var socket = io(URL, {
        extraHeaders:{
            _uuid:uid,
            Authorization:`Bearer ${cookie.load('chat_app_token')}` || ''
        }
    });
    socket.emit('join', {...user});

    socket.on("connect_error", (err) => {
        // console.log(err.message);
    });
    socket.on('connect_failed', function(){
        // console.log('Connection Failed');
    });
    return socket;
}



export default connectSocketIo;


