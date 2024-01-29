import React, {useEffect, useState} from 'react'
import {createChatRoom, getChatRooms} from "../api/Chat";
import styles from "./ChatList.module.scss";
import {toast} from "react-toastify";
import ChatRooms from "./ChatRooms";

function ChatList() {
    const [chatRooms, setChatRooms] = useState([]);
    const [userId, setUserId] = useState("test");

    useEffect(() => {
        const getRooms = async () => {
            const response = await getChatRooms();
            setChatRooms(response.data);
            return response;
        }
        getRooms();
    }, [])

    const onSubmit = async () => {

        const response = await createChatRoom({ userId });

        if (response?.status === 200) {
            toast.success("채팅방 생성 성공");
        } else {
            toast.error("채팅방 생성 실패");
        }
    };

    return (
        <div>
            <ul className={styles.card_list}>
                {chatRooms?.map((chatRoom) => (
                    <ChatRooms key={chatRoom.roomId} item={chatRoom}/>
                ))}
            </ul>
            <form onSubmit={onSubmit} className={styles.form}>
                <button type='submit'>방 생성</button>
            </form>
        </div>
    )
}

export default ChatList