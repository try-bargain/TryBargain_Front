import axios from "axios";

interface IData {
    user_id: string;
    password: string;
    user_nm: string;
    email: string;
    htel: string;
    birth: string;
    sex_cd: number;
    post: string;
    address1: string;
    address2: string;
}

interface ICheck {
    user_id: string;
    email: string;
}

export const userSignUp = async (data: IData) => {
    const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/join`,
        data,
        { withCredentials: true },
    );
    return response;
};

export const checkUserId = async (data: ICheck) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/api/auth/userIdCheck`,
            data,
            { withCredentials: true },
        );
        return response;
    } catch (error) {
        return error.response.data.message;
    }
};

