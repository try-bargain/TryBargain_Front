import React from 'react';
import ChatList from "./ChatList";

const ChatListPage = () => {

    return (
        <div className='page'>
                <div className='form_container'>
                    <h1>Chatting</h1>
                    <ChatList/>
                </div>
        </div>
    );
};

export default ChatListPage;