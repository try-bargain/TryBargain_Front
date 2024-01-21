import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {loginFetcher} from "../../api/signIn";
import styles from "../../../components/form/Form.module.scss";
import { toast } from "react-toastify";

function SignIn () {

    const [userId, setUserId] = useState("");
    const [password, setUserPassword] = useState("");

    const navigate = useNavigate();

    const onIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.currentTarget.value);
    };
    const onPwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword(event.currentTarget.value);
    };
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await loginFetcher({ userId, password });

        if (response?.status === 200) {
            toast.success("로그인 성공🐟");
            navigate('/');
        } else {
            toast.error("로그인 실패🔥");
            setUserId("");
            setUserPassword("");
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit} className={styles.form}>
                <div>
                    <input
                        type="userId"
                        value={userId}
                        placeholder="아이디"
                        onChange={onIdChange}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        value={password}
                        placeholder="비밀번호"
                        onChange={onPwChange}
                    />
                </div>

                <button type='submit'>로그인</button>
            </form>
        </div>
    )
}

export default SignIn