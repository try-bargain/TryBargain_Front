import axios from "axios";

interface IData {
    userId: string;
    password: string;
}

export const loginFetcher = async (data: IData) => {
    try {
        return await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
            data,
            {
                withCredentials: true,
            },
        );
    } catch (error) {
        return error.response.data.message;
    }
};