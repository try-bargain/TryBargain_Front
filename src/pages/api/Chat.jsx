import axios from "axios";

interface IData {
    roomId: number;
    UserId: number;
    sellerId: String;
    sellerName: String;
    buyerId: String;
    buyerName: String;
    senderId: string;
    receiverId: string;
    message: string;
}

export const createChatRoom = async (data: IData) => {
    try {
        return await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/chatRoom`,
            data,
            {
                withCredentials: true,
            },
        );
    } catch (error) {
        return error.response.data.message;
    }
};

export const getChatRooms = async () => {
    try {
        return await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/chatRooms`,
            {
                withCredentials: true,
            },
        );
    } catch (error) {
        return error.response.data.message;
    }
};

export const getChatRoom = async (roomId : number) => {
    try {
        return await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/chatRoom/${roomId}`,
            {
                withCredentials: true,
            },
        );
    } catch (error) {
        return error.response.data.message;
    }
};

export const getChatHistory = async (roomId : number) => {
    try {
        return await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/chatMessageList/${roomId}`,
            {
                withCredentials: true,
            },
        );
    } catch (error) {
        return error.response.data.message;
    }
};