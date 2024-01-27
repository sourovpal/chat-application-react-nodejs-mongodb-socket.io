import { useEffect, useState } from "react";
import LeftSidebar from "../../components/LeftSidebar";
import connectSocketIo from '../../socket';
import { Outlet } from "react-router-dom";
const socket = connectSocketIo();
function Chat() {
  const [data, setData] = useState([]);
  
  const fetchAllUsers = ({users})=>{
    setData(users);
  }
  
  useEffect(()=>{
    socket.on('fetch_all_users', fetchAllUsers);
    return () => {
      socket.off('fetch_all_users', fetchAllUsers);
    };
  },[]);


  return (
    <>
      <div className="App dark">
          <div className="app-container">
            <LeftSidebar users={data} />
            <Outlet />
            <button className="expand-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            </button>
          </div>
      </div>
    </>
  );
}

export default Chat;