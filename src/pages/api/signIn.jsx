import axios from "axios";

interface IData {
    userId: string;
    password: string;
}

export const loginFetcher = async (data: IData) => {
    try {
        return await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
            data,
            {
                withCredentials: true,
            },
        );
    } catch (error) {
        return error.response.data.message;
    }
};