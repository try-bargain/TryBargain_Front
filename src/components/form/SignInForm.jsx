import React, { FC } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './Form.module.scss';

// 전달 받는 매개변수
type FormProps = {
    title: string;
    getDataForm: (userId: string, password: string) => void;
}

type Inputs = {
    userId: String;
    password: string;
}

const SignInForm: FC<FormProps> = ({ title, getDataForm }) => {

    // form 구현
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<FieldValues> = ({userId, password }) => {
        getDataForm(userId, password);
        // 입력값 리셋
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
                    type="userId"
                    placeholder="UserId"
                    /* id 객체 넣어주기*/
                    {...register("userId", userId)}
                />
                {errors?.id &&
                    <div>
                        <span className={styles.form_error}>
                            {errors.id.message}
                        </span>
                    </div>
                }
            </div>

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

            <button type='submit'>{title}</button>
        </form>
    )
}

export default SignInForm