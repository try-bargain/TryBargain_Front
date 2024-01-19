import React from 'react';
import { BsGithub } from 'react-icons/bs';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className='container'>
                <div className={styles.contacts}>
                    <a href="https://github.com">
                        {" "}
                        <BsGithub />
                    </a>
                </div>
                <div className={styles.contacts}>(주)피싱로드 대표이사 김붕어</div>
                <div className={styles.contacts}>경기도 안산시 원선1로 10 1502호</div>
                <div className={styles.contacts}>전화번호 : 010-0000-0000</div>
                <br />
                <div className={styles.contacts}>사업자 등록번호 : 000-00-000000</div>
                <div className={styles.contacts}>통신판매신고번호 : 000-00-00000</div>
                <div className={styles.contacts}>개인정보관리책임자 : 김잉어</div>
            </div>
        </footer>
    );
};

export default Footer;