import React from 'react';
import type { AppProps } from "next/app";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toast({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Component {...pageProps}/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default Toast;