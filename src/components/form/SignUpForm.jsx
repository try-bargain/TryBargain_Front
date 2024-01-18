import React, { FC } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './Form.module.scss';

type FormProps = {
    title: string;
    getDataForm: (id: string, email: string, password: string) => void;
    firebaseError: string;
}

type Inputs = {
    id: String;
    password: string;
    email: string;
}

const SignUpForm: FC<FormProps> = ({ title, getDataForm, firebaseError }) => {

    // form 구현
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<FieldValues> = ({id, password, email}) => {
        getDataForm(id, password, email);
        reset();
    }

    const userId = {
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

    // 유효성 검사 메시지
    const userEmail = {
        // 안썼을 경우 출력
        required: "필수 필드입니다.",
        // 조건에 안맞는 경우 출력
        pattern: {
            value: /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm,
            message: "입력하신 이메일 주소가 올바르지 않습니다."
        }
    }

    // 유효성 검사 메시지
    const userPassword = {
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
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,13}$/gm,
            message: "최소 4자, 영문 1자, 숫자 1자"
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", userPassword)}
                />
                {errors?.password &&
                    <div>
                        <span className={styles.form_error}>
                            {errors.password.message}
                        </span>
                    </div>
                }
            </div>

            <div>
                <input
                    type="email"
                    placeholder="E-mail"
                    {...register("email", userEmail)}
                />
                {errors?.email &&
                    <div>
                        <span className={styles.form_error}>
                            {errors.email.message}
                        </span>
                    </div>
                }
            </div>
            <button type='submit'>{title}</button>
            {firebaseError && (
                <span className={styles.form_error}>{firebaseError}</span>
            )}
        </form>
    )
}

export default SignUpForm