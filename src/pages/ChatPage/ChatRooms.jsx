import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import styles from "./ChatRooms.module.scss";

type Props = {
    item : any;
}

function ChatRooms({item} : Props) {
    const [roomId, setChatRooms] = useState(item.roomId);
    const [sellerId, setSellerId] = useState(item.sellerId);
    const [sellerName, setSellerName] = useState(item.sellerName);
    const [buyerId, setBuyerId] = useState(item.buyerId);
    const [buyerName, setBuyerName] = useState(item.buyerName);

    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/chatRoom/${roomId}`);
    };

    return (
        <li className={styles.card_item}>
            <div onClick={onClick}>
                <h5>{roomId}</h5>
                <p>{sellerId}</p>
                <p>{sellerName}</p>
                <p>{buyerId}</p>
                <p>{buyerName}</p>
            </div>

        </li>
    )
}

export default ChatRooms