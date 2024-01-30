import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../socket";
import ReceiveMessage from "./ReceiveMessage";
const ChatBox = (props)=>{
  useEffect(()=>{
    socket.connect();
  }, []);
  
  const [scrollStatus, setScrollStatus] = useState(true);
  const [behavior, setBehavior] = useState('auto');
  const [message, setMessage] = useState('');
  const {username} = useParams();
  const user = useSelector((state)=>state.auth.user);
  const location = useLocation();
  const refChatArea = useRef(null);
  const [fromUser, setFromUser] = useState({});
  const [toUser, setToUser] = useState([]);
  const [htmlMessage, setHtmlMessage] = useState([]);


  const sendMessage = ()=>{
    socket.emit('send_message', {
      message,
      from:user.username,
      to:username,
    });
  }
  
  
  useEffect(()=>{
    setHtmlMessage([]);
    socket.on('receive_message', (payload)=>{
      if(payload.to_user.username === user.username){
        socket.emit('message_delivery_success',{
          message_id:payload.data._id,
        })
      }
      if(payload.from_user.username === username || payload.from_user.username === user.username){
        setHtmlMessage(v => [...v, payload]);
        setMessage('');
      }
    });
    socket.emit('fetch_last_message',{
      from:user.username,
      to:username,
      limit:20,
    });
    socket.on('fetch_last_message', (payload)=>{
      const {from_user, to_user, data} = payload;
      data.reverse().map((mes)=>{
        setHtmlMessage(v => [...v, {from_user:to_user, to_user:from_user, data:mes}]);
      });
      setToUser(to_user);
      setFromUser(from_user);
    });
    return ()=>{
      setHtmlMessage([]);
      socket.off('receive_message');
      socket.off('fetch_last_message');
      socket.off('send_message');
    }
  },[location]);
  

  useEffect(()=>{
    if(scrollStatus){
      refChatArea.current.scroll({
        top: refChatArea.current.scrollHeight,
        left: 0,
        behavior: behavior
      });
      setBehavior('smooth');
    }
    return ()=>{
      setBehavior('auto');
    }
  }, [htmlMessage]);

    
    return (
        <>
        <div className="right-side">
            <div className="chat-container">
              <div className="chat-header">
                <div className="message-wrapper py-2">
                  <div className="profile-picture">
                    <img src={`${toUser.avatar}`} alt="pp"/>
                  </div>
                  <div className="message-content">
                    <p className="name">{toUser.full_name}</p>
                    <p className="name d-flex justify-content-start align-items-center"><span className="online-badge offline- me-1"></span>Online</p>
                  </div>
                </div>
              </div>
              <div 
              className="chat-area"
              id={`chat_area_${username}`} 
              ref={refChatArea} 
              onMouseOver={()=>setScrollStatus(false)} 
              onMouseLeave={()=>setScrollStatus(true)}>
                {
                  htmlMessage.map((mes, index)=>(
                    <React.Fragment key={index}>
                      <ReceiveMessage 
                      to_user={mes.to_user}
                      from_user={mes.from_user} 
                      data={mes.data}
                      user={user}
                      />
                    </React.Fragment>
                  ))
                }
              </div>
              <div className="chat-typing-area-wrapper">
                <div className="chat-typing-area">
                  <input value={message} onChange={(e)=>setMessage(e.target.value)} type="text" placeholder="Type your meesage..." className="chat-input"  />
                  <button onClick={()=>sendMessage()} className="send-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send" viewBox="0 0 24 24">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}

export default ChatBox;