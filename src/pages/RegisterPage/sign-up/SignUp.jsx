import React, {useState} from 'react'
import styles from "../../../components/form/Form.module.scss";
import {loginFetcher} from "../../api/signIn";
import {toast} from "react-toastify";
import {userSignUp} from "../../api/signup";
import {useNavigate} from "react-router-dom";
import {isValidEmail, isValidNickname, isValidPassword, isValidUserId} from "../../api/validation";

const SignUp = () => {
    const [userId, setUserId] = useState("");
    const [password, setUserPassword] = useState("");
    const [verifyPassword, setUserVerifyPassword] = useState("");
    const [nickName, setUserNickName] = useState("");
    const [email, setUserEmail] = useState("");
    const [htel, setUserHtel] = useState("");
    const [birth, setUserBirth] = useState("");
    const [sexCode, setUserSexCode] = useState(0);
    const [post, setUserPost] = useState("");
    const [address1, setUserAddress1] = useState("");
    const [address2, setUserAddress2] = useState("");
    const [userIdError, setUserIdError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const navigate = useNavigate();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.currentTarget;
        if (name === "userId") {
            setUserId(event.currentTarget.value);
            validateUserId(userId);
        }
        if (name === "password") {
            setUserPassword(event.currentTarget.value);
            validatePassword(password);
        }
        if (name === "verifyPassword") {
            setUserVerifyPassword(event.currentTarget.value);
        }
        if (name === "nickName") {
            setUserNickName(event.currentTarget.value);
            validateNickname(nickName);
        }
        if (name === "email") {
            setUserEmail(event.currentTarget.value);
            validateEmail(email);
        }
        if (name === "htel") {
            setUserHtel(event.currentTarget.value);
        }
        if (name === "birth") {
            setUserBirth(event.currentTarget.value);
        }
        if (name === "sexCode") {
            setUserSexCode(event.currentTarget.value);
        }
        if (name === "post") {
            setUserPost(event.currentTarget.value);
        }
        if (name === "address1") {
            setUserAddress1(event.currentTarget.value);
        }
        if (name === "address2") {
            setUserAddress2(event.currentTarget.value);
        }
    };

    const validateUserId = (userId: string) => {
        if (!isValidUserId(userId)) {
            setUserIdError("4-15자리, 대소문자와 숫자만 허용됩니다.");
        } else {
            setUserIdError("");
        }
    };
    const validatePassword = (password: string) => {
        if (!isValidPassword(password)) {
            setPasswordError(
                "8-20자리, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
            );
        } else {
            setPasswordError("");
        }
    };

    const validateNickname = (nickname: string) => {
        if (!isValidNickname(nickname)) {
            setNicknameError("2-10자리, 특수문자는 사용할 수 없습니다.");
        } else {
            setNicknameError("");
        }
    };

    const validateEmail = (email: string) => {
        if (!isValidEmail(email)) {
            setEmailError("이메일 형식을 확인하세요");
        } else {
            setEmailError("");
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        validateUserId(userId);
        validatePassword(password);
        validateNickname(nickName);
        validateEmail(email);

        if (userIdError || passwordError || nicknameError || emailError) {
            toast.error("입력값을 다시 확인하세요.");
            return;
        }
        if (password !== verifyPassword) {
            toast.error("비밀번호를 확인하세요.");
            return;
        }
        const response = await userSignUp({
            user_id: userId,
            password,
            user_nm: nickName,
            email,
            htel,
            birth,
            sex_cd: sexCode,
            post,
            address1,
            address2});

        if (response?.status === 200) {
            toast.success("회원가입 성공!🐟");
            navigate('/login');
        } else {
            toast.error("회원가입 실패, 다시 시도해주세요.🔥");
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit} className={styles.form}>
                <div>
                    <input
                        type="text"
                        name="userId"
                        value={userId}
                        placeholder="아이디"
                        onChange={onChange}
                    />
                    <span className="text-[10px] text-red-500 font-semibold">
                          {userIdError}
                    </span>
                </div>

                <div>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="비밀번호"
                        onChange={onChange}
                    />
                    <span className="text-[10px] text-red-500 font-semibold">
                          {passwordError}
                    </span>
                </div>
                <div>
                    <input
                        type="password"
                        name="verifyPassword"
                        value={verifyPassword}
                        placeholder="비밀번호 확인"
                        onChange={onChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="nickName"
                        value={nickName}
                        placeholder="닉네임"
                        onChange={onChange}
                    />
                    <span className="text-[10px] text-red-500 font-semibold">
                          {nicknameError}
                    </span>
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="이메일"
                        onChange={onChange}
                    />
                    <span className="text-[10px] text-red-500 font-semibold">
                          {emailError}
                    </span>
                </div>

                <div>
                    <input
                        type="tel"
                        name="htel"
                        value={htel}
                        placeholder="휴대폰번호"
                        onChange={onChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="birth"
                        value={birth}
                        placeholder="생년월일"
                        onChange={onChange}
                    />
                </div>
                
                <div>
                    <label>
                        <input
                            type="radio"
                            name="sexCode"
                            value="0"
                            defaultChecked="0"
                            onChange={onChange}
                        />남
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="sexCode"
                            value="1"
                            onChange={onChange}
                        />여
                    </label>
                </div>

                <div>
                    <input
                        type="text"
                        name="post"
                        value={post}
                        placeholder="우편번호"
                        onChange={onChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="address1"
                        value={address1}
                        placeholder="주소1"
                        onChange={onChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="address2"
                        value={address2}
                        placeholder="주소2"
                        onChange={onChange}
                    />
                </div>

                <button type='submit'>가입하기</button>
            </form>
        </div>
    )
}

export default SignUp