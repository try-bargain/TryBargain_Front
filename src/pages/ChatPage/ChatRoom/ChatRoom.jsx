import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getChatHistory, getChatRoom} from "../../api/Chat";
import {getCookie} from "../../../store/cookie";
import {Client, IMessage} from "@stomp/stompjs";
import jwtDecode from "jwt-decode";

interface ChatMessageReqeust {
    roomId: number;
    from: string;
    message: string;
    userId: number;
}
interface ChatMessageResponse{
    id: number;
    userId: string;
    message: string;
    userName: string;
}

function  ChatRoomPage () {

    const {id : roomId}  = useParams();
    const [chatRoomState, setChatRoomState] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const accessToken = getCookie("Authorization");
    const [userId, setUserId] = useState(jwtDecode(accessToken).sub);

    // const client = useRef<CompatClient | null>(null);
    const [stompClient, setStompClient] = useState(new Client());

    useEffect(() => {
        const getRoom = async () => {
            const response = await getChatRoom(roomId);
            if (response?.status === 200) {
                // toast.success("로그인 성공🐟");
                // setChatRoomState(response.data);
                setChatRoomState(response.data);
            } else {
                // toast.error("로그인 실패🔥");
                console.log("실패");
            }
        };
        getRoom();

        const loadChatHistory = async () => {
            const response = await getChatHistory(roomId);

            if (response?.status === 200) {
                // console.log(response.data.userId);
                const messages = response.data;
                setMessages(messages);
            } else {
                console.error("채팅 내역 로드 실패");
            }
        };

        loadChatHistory();

        // SockJS 클라이언트 객체를 생성하고, 웹 소켓을 연결한다.
        // ws-stomp는 서버의 Endpoint 경로로, 웹 소켓 통신을 위한 특정 경로를 의미한다.
        // const socket = new SockJS(`${process.env.REACT_APP_SERVER_URL}/chat`);

        const client = new Client({
            brokerURL: `${process.env.REACT_APP_BROKER_URL}/chat/websocket`, // 프록시를 통한 접속
            debug: str => {
                console.log(str);
            },
            reconnectDelay: 5000, // 자동 재 연결
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,

            onConnect: () => {
                client.subscribe(
                    `/topic/chatroom/${roomId}`,
                    (message: IMessage) => {
                        console.log(message.body)
                        const msg: ChatMessageResponse = JSON.parse(message.body);
                        setMessages((prevMessages) => [...prevMessages, msg]);
                    },
                );
            },
            onStompError: frame => {
                console.error(frame);
            },
        });

        client.activate();
        setStompClient(client);
        return () => {
            client.deactivate();
        };
    }, [roomId]);

    const onClick = () => {
        if (stompClient && newMessage) {
            const chatMessage: ChatMessageReqeust = {
                roomId: parseInt(roomId || ""),
                message: newMessage,
                userId: userId,
            };
            stompClient.publish({
                destination: `/app/sendMessage`,
                body: JSON.stringify(chatMessage)
            });
            setNewMessage("");
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.nativeEvent.isComposing) return;
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onClick();
        }
    }

    return (
        <div className='page'>
            <div className='form_container'>
                <h1>Chatting Room</h1>

                <div className="chat-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx}>
                            {msg.userId} - {msg.userName} : {msg.message}
                        </div>
                    ))}
                </div>

                <div>
                    <textarea
                         className="bg-gray-100 w-full resize-none"
                         rows={1}
                         value={newMessage}
                         onChange={(e) => setNewMessage(e.target.value)}
                         onKeyDown={handleKeyPress}
                         placeholder='내용을 입력하세요'
                    />
                 <button onClick={onClick} >전송</button>
             </div>
            </div>
        </div>
    );
}

export default ChatRoomPage;