import React, {useState} from 'react'
import SignUpForm from '../../../components/form/SignUpForm'
import {useNavigate} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../../firebase';
import { useDispatch } from 'react-redux';

const SignUp = () => {

    return (
        <SignUpForm
            title={"가입하기"}
        />
    )
}

export default SignUp