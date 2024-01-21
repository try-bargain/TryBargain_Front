import cookie from "react-cookies";
import {useEffect, useState} from "react";

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accesstoken, setAccesstoken] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        setAccesstoken(cookie.load("Authorization"));
        setIsLoggedIn(!!accesstoken);
        console.log(!!accesstoken);
    }, [accesstoken]);

    console.log(isLoggedIn);
    // const { id, token } = useAppSelector((state) => state.userSlice);
    return {
        isLoggedIn,
        userId,
        accesstoken
    }
}