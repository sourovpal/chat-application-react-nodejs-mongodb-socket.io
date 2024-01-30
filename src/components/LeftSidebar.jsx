import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authReducer";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";
import { Link } from "react-router-dom";
import socket from "../socket";

const LeftSidebar = ()=>{
    useEffect(()=>{socket.connect()}, []);
    const [users, setUsers] = useState([]);
    socket.on('fetch_all_users', ({users})=>{
        setUsers(users)
    });

    const auth = useSelector((state)=>state.auth.user);
    const dispatch = useDispatch();
    const accept = ()=>{
        socket.disconnect();
        dispatch(logout());
    }
    const [visible, setVisible] = useState(false);
    return (
        <>
            <div className="left-side">
                <button className="btn-close-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-x-circle" viewBox="0 0 24 24">
                        <defs></defs>
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M15 9l-6 6M9 9l6 6"></path>
                    </svg>
                </button>
                <div className="chat-container" style={{ width:'330px' }}>
                    <div className="chat-header">
                        <div className="message-wrapper py-2">
                        <div className="profile-picture">
                            <img src={`${auth.avatar}`} alt="pp"/>
                        </div>
                        <div className="message-content">
                            <p className="name">{auth.full_name}</p>
                            <p className="name d-flex justify-content-start align-items-center"><span className="online-badge offline- me-1"></span>Online</p>
                        </div>
                        </div>
                    </div>
                    <div className="chat-header p-0">
                        <div className="chat-typing-area-wrapper">
                            <div className="chat-typing-area">
                                <input type="text" placeholder="Type your meesage..." className="chat-input" />
                                <button className="send-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="search" className="feather feather-send" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path fill="none" d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="chat-area p-0">
                        {
                            users.length && users.map((user, index)=>(
                                <React.Fragment key={index}>
                                    {
                                        auth.username != user.username &&
                                        <Link className="message-wrapper px-3 user-wrapper" to={`/${user.username}`}>
                                            <div className="profile-picture">
                                                <img src={user.avatar} alt="pp"/>
                                            </div>
                                            <div className="message-content">
                                                <p className="name">{`${user.name.first} ${user.name.last}`.toUpperCase()}</p>
                                                <p className="name d-flex justify-content-start align-items-center"><span className={`online-badge me-1 ${user.online?'':'offline'}`}></span>{user.online?'Online':'offline'}</p>
                                            </div>
                                        </Link>
                                    }
                                
                                </React.Fragment>                            

                            ))
                        }
                    </div>
                    <div className="mt-auto">
                        <div className="p-3">
                            <div className="">
                                <button className="send-button ms-auto bg-danger" onClick={()=>setVisible(true)}>
                                    <span className="pi pi-sign-out"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Component  */}
            <div className="logout-confirm-dialog">
                <ConfirmDialog
                    className="logout-confirm-dialog"
                    group="declarative"  visible={visible} onHide={() => setVisible(false)} 
                    message="Are you sure you want to logout?" 
                    icon='pi pi-sign-out'
                    header="Confirm" accept={accept}
                />
            </div>


        </>
    );

}

export default React.memo(LeftSidebar);