import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {loginFetcher} from "../../api/signIn";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from "../../../components/form/Form.module.scss";
import cookie from "react-cookies";
import {toast} from "react-toastify";

type Inputs = {
    userId: string;
    password: string;
}

function SignIn () {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onChange'
    })

    const [userId, setUserId] = useState("");
    const [password, setUserPassword] = useState("");

    const navigate = useNavigate();

    const CheckUserId = {
        required: "필수 필드입니다.",
        minLength: {
            value: 4,
            message: "최소 4자입니다."
        },
        maxLength: {
            value: 13,
            message: "최대 13자입니다."
        },
        pattern: {
            value: /^[A-Z|a-z|0-9]{4,13}$/gm,
            message: "영문 숫자 4~13자"
        }
    }

    const onIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.currentTarget.value);
    };
    // 유효성 검사 메시지
    const CheckPassword = {
        required: "필수 필드입니다.",
        minLength: {
            value: 4,
            message: "최소 4자입니다."
        },
        maxLength: {
            value: 13,
            message: "최대 13자입니다."
        },
        pattern: {
            value: /^[A-Za-z\d]{4,13}$/gm,
            // value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,13}$/gm,
            message: "최소 4자, 영문 1자, 숫자 1자"
        }
    }
    const onPwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPassword(event.currentTarget.value);
    };
    const onSubmit: SubmitHandler<FieldValues> = async (event: React.FormEvent<HTMLFormElement>) => {
    // const onSubmit = async (userId, password) => {
        console.log(userId + " : " + password);
        event.preventDefault();

        const response = await loginFetcher({ userId, password });

        if (response?.status === 200) {
            toast("로그인 성공🐟");
            setUserId("");
            setUserPassword("");
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
                        /* id 객체 넣어주기*/
                        //{...register("userId", CheckUserId)}
                    />
                    {errors?.userId &&
                        <div>
                            <span className={styles.form_error}>
                                {errors.userId.message}
                            </span>
                        </div>
                    }
                </div>

                <div>
                    <input
                        type="password"
                        value={password}
                        placeholder="비밀번호"
                        onChange={onPwChange}
                        //{...register("password", CheckPassword)}
                    />
                    {errors?.password &&
                        <div>
                            <span className={styles.form_error}>
                                {errors.password.message}
                            </span>
                        </div>
                    }
                </div>

                <button type='submit'>로그인</button>
                {/*<div>*/}
                {/*    <input type="submit" value={"로그인"}/>*/}
                {/*</div>*/}
            </form>
        </div>
    )
}

export default SignIn