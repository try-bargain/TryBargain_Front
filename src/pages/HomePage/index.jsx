import React from 'react';
import CardList from "./card-list/CardList";
import CountProducts from "./count-products/CountProducts";
import FiltersCategory from "./filter-category/FiltersCategory";
import styles from "../../components/form/Form.module.scss";
import {loginFetcher} from "../api/signIn";
import {toast} from "react-toastify";
import ChatRoom from "../../components/chat/ChatRoom";

const HomePage = () => {



    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // const response = await loginFetcher({ userId, password });

        // if (response?.status === 200) {
        //     toast.success("로그인 성공🐟");
        // } else {
        //     toast.error("로그인 실패🔥");
        // }
    };

    return (
        <div className='page'>
            <div className='container'>
                <h1>Products</h1>
                {/*<FiltersCategory />*/}
                {/*<CountProducts />*/}
                {/*<CardList />*/}
            </div>
        </div>
    );
};

export default HomePage;