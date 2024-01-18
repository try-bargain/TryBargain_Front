import axios from "axios";

interface IData {
    userId: string;
    password: string;
}

export const loginFetcher = async (data: IData) => {
    try {
        console.log("1")
        console.log(data.userId + " : " + data.password);
        return await axios.post(
            `http://localhost:8080/api/auth/login`,
            data,
            {
                withCredentials: true,
            },
        );
    } catch (error) {
        // return error.response.data.message;
        console.log(error)
    }
};