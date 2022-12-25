import { FC, FormEvent } from 'react';

import { Link, Redirect, useLocation } from 'react-router-dom';
import {
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../services/redux/auth/action';
import { Loader } from '../ui/loader/loader';
import { useForm } from '../services/hooks/useForm';
import { TModalState } from '../services/utils/types';

export const LoginPage: FC = () => {
    const { values, handleChange } = useForm({
        email: '',
        password: '',
    });

    const dispatch = useDispatch<any>();
    const location = useLocation<TModalState>();

    const { authError, authLoading, isAuth, isCheckedUser } = useSelector(
        // @ts-ignore: Unreachable code error
        (state) => state.authReducer
    );

    if (localStorage.getItem('accessToken')) {
        if (!isCheckedUser) {
            return <Loader size='large' />;
        }
    }

    if (isAuth) {
        return <Redirect to={location.state?.from || '/'} />;
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userLogin(values));
    };

    return (
        <div className={styles.authenticationPage}>
            <div className={styles.container}>
                <div className='text text_type_main-medium'>Вход</div>
                <form onSubmit={onSubmit}>
                    <div className='mt-6'>
                        <EmailInput
                            onChange={handleChange}
                            value={values.email}
                            isIcon={false}
                            name={'email'}
                        />
                    </div>
                    <div className='mt-6'>
                        <PasswordInput
                            onChange={handleChange}
                            value={values.password}
                            name={'password'}
                        />
                    </div>
                    {authLoading && (
                        <div className='mt-6'>
                            <Loader size='medium' minHeight />
                        </div>
                    )}
                    {authError && (
                        <div
                            className={`${styles.error} mt-6 text text_type_main-default`}
                        >
                            {authError}
                        </div>
                    )}
                    <div className='mt-6'>
                        <Button
                            htmlType='submit'
                            type='primary'
                            size='medium'
                            disabled={!values.email || !values.password}
                        >
                            Войти
                        </Button>
                    </div>
                </form>
                <div className='mt-20'>
                    <p className='text text_type_main-default text_color_inactive'>
                        <span>Вы — новый пользователь? </span>
                        <Link<TModalState>
                            to='/register'
                            className={styles.link}
                        >
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className='text text_type_main-default text_color_inactive mt-4'>
                        <span>Забыли пароль? </span>
                        <Link<TModalState>
                            to='/forgot-password'
                            className={styles.link}
                        >
                            Восстановить пароль
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
