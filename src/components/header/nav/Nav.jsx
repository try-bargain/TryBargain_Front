import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FiLogIn, FiUser } from 'react-icons/fi';
import styles from './Nav.module.scss';
import {GrLogout} from "react-icons/gr";
import {eraseCookie, getCookie} from "../../../store/cookie";

const Nav = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [accesstoken, setAccesstoken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setAccesstoken(getCookie("Authorization"));
        setIsAuth(!!accesstoken);
    }, [accesstoken]);

    const handleSignOut = () => {
        eraseCookie("Authorization");
        setIsAuth(false);
        navigate('/');
    }

    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <div className={styles.counter}>
                        <Link to={"/chat"}>
                            {" "}
                            <FiUser title="내정보" />
                        </Link>
                    </div>
                </li>
                <li>
                    {isAuth ?
                        <GrLogout
                            className={styles.nav_sign_out}
                            onClick={handleSignOut}
                            title={"로그아웃"}
                        />
                        :
                        <Link to={"/login"}>
                            <FiLogIn title="로그인" />
                        </Link>
                    }
                </li>
            </ul>
        </nav>
    )
}

export default Nav