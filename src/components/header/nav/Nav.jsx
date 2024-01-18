import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogIn, FiUser } from 'react-icons/fi';
import styles from './Nav.module.scss';
import {GrLogout} from "react-icons/gr";

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <div className={styles.counter}>
                        <Link to={"/myinfo"}>
                            {" "}
                            <FiUser title="내정보" />
                        </Link>
                    </div>
                </li>
                <li>
                    <GrLogout
                        className={styles.nav_sign_out}
                        title={"로그아웃"}
                    />
                    <Link to={"/login"}>
                        <FiLogIn title="로그인" />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav