import { useState } from 'react';
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

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const location = useLocation();

    const { authError, authLoading, isAuth, isCheckedUser } = useSelector(
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

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onLogin = () => {
        dispatch(userLogin(email, password));
    };

    return (
        <div className={styles.authenticationPage}>
            <div className={styles.container}>
                <div className='text text_type_main-medium'>Вход</div>
                <div className='mt-6'>
                    <EmailInput
                        onChange={onChangeEmail}
                        value={email}
                        isIcon={false}
                    />
                </div>
                <div className='mt-6'>
                    <PasswordInput
                        onChange={onChangePassword}
                        value={password}
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
                        htmlType='button'
                        type='primary'
                        size='medium'
                        disabled={!email || !password}
                        onClick={onLogin}
                    >
                        Войти
                    </Button>
                </div>
                <div className='mt-20'>
                    <p className='text text_type_main-default text_color_inactive'>
                        <span>Вы — новый пользователь? </span>
                        <Link to='/register' className={styles.link}>
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className='text text_type_main-default text_color_inactive mt-4'>
                        <span>Забыли пароль? </span>
                        <Link to='/forgot-password' className={styles.link}>
                            Восстановить пароль
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
