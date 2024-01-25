

const ChatBox = ()=>{
    return (
        <>
        <div className="right-side">
            <div className="chat-container">
              <div className="chat-header">
                <div className="message-wrapper py-2">
                  <div className="profile-picture">
                    <img src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80" alt="pp"/>
                  </div>
                  <div className="message-content">
                    <p className="name">Ryan Patrick</p>
                    <p className="name d-flex justify-content-start align-items-center"><span className="online-badge offline- me-1"></span>Online</p>
                  </div>
                </div>
              </div>
              <div className="chat-area">
                <div className="message-wrapper">
                  <div className="profile-picture">
                    <img src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80" alt="pp"/>
                  </div>
                  <div className="message-content">
                    <p className="name">Ryan Patrick</p>
                    <div className="message">Helloo team!😍</div>
                  </div>
                </div>
                <div className="message-wrapper">
                  <div className="profile-picture">
                    <img src="https://images.unsplash.com/photo-1566821582776-92b13ab46bb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="pp"/>
                  </div>
                  <div className="message-content">
                    <p className="name">Andy Will</p>
                    <div className="message">Hello! Can you hear me?🤯 <a className="mention">@ryanpatrick</a></div>
                  </div>
                </div>
                <div className="message-wrapper">
                  <div className="profile-picture">
                    <img src="https://images.unsplash.com/photo-1600207438283-a5de6d9df13e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80" alt="pp"/>
                  </div>
                  <div className="message-content">
                    <p className="name">Jessica Bell</p>
                    <div className="message">Hi team! Let's get started it.</div>
                  </div>
                </div>
                <div className="message-wrapper reverse">
                  <div className="profile-picture">
                    <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="pp"/>
                  </div>
                  <div className="message-content">
                    <p className="name">Emmy Lou</p>
                    <div className="message">Good morning!🌈</div>
                  </div>
                </div>
                <div className="message-wrapper">
                  <div className="profile-picture">
                    <img src="https://images.unsplash.com/photo-1576110397661-64a019d88a98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80" alt="pp"/>
                  </div>
                  <div className="message-content">
                    <p className="name">Tim Russel</p>
                    <div className="message">New design document⬇️</div>
                    <div className="message-file">
                      <div className="icon sketch">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="#ffd54f" d="M96 191.02v-144l160-30.04 160 30.04v144z" />
                          <path fill="#ffecb3" d="M96 191.02L256 16.98l160 174.04z" />
                          <path fill="#ffa000" d="M0 191.02l256 304 256-304z" />
                          <path fill="#ffca28" d="M96 191.02l160 304 160-304z" />
                          <g fill="#ffc107">
                            <path d="M0 191.02l96-144v144zM416 47.02v144h96z" />
                          </g>
                        </svg>
                      </div>
                      <div className="file-info">
                        <div className="file-name">NewYear.sketch</div>
                        <div className="file-size">120 MB</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="message-wrapper">
                  <div className="profile-picture">
                    <img src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80" alt="pp"/>
                  </div>
                  <div className="message-content">
                    <p className="name">Ryan Patrick</p>
                    <div className="message">Hi team!❤️</div>
                    <div className="message">I downloaded the file <a className="mention">@timrussel</a></div>
                  </div>
                </div>
                <div className="message-wrapper reverse">
                  <div className="profile-picture">
                    <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="pp"/>
                  </div>
                  <div className="message-content">
                    <p className="name">Emmy Lou</p>
                    <div className="message">Woooww! Awesome❤️</div>
                  </div>
                </div>
              </div>
              <div className="chat-typing-area-wrapper">
                <div className="chat-typing-area">
                  <input type="text" placeholder="Type your meesage..." className="chat-input" />
                  <button className="send-button">
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