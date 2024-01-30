import React from "react";



const ReceiveMessage = (props)=>{
    const {from_user, to_user, data, user} = props;
    return (
        <>
        {
            (data.from_id === user.user_id)?
            <div className="message-wrapper reverse">
                {
                    (data.is_seen === 2) && 
                    <div className="profile-picture" style={{ width:'12px', height:'12px', marginTop:'auto', marginBottom:'25px' }}>
                        <img style={{ width:'auto', height:'auto' }} src={to_user.avatar} alt="pp"/>
                    </div>
                }
                <div className="message-content">
                    {data.messages.map((mes, index)=>(
                        <React.Fragment key={index}>
                            <div className="message">{mes.text}</div>
                            <div className="message-time">{mes.date}</div>  
                        </React.Fragment>
                    ))}                
                </div>
            </div>:
            <div className="message-wrapper">
                <div className="profile-picture">
                    <img src={from_user.avatar} alt="pp"/>
                </div>
                <div className="message-content">
                    <p className="name">{from_user.full_name}</p>
                    {
                    data.messages.map((mes, index)=>(
                        <React.Fragment key={index}>
                            <div className="message">{mes.text}</div>
                            <div className="message-time">{mes.date}</div>  
                        </React.Fragment>
                    ))
                    } 
                </div>
            </div>
        }
        </>
    );
}

export default ReceiveMessage;