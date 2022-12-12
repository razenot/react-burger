import { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {
    Input,
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../services/redux/auth/action';
import { Loader } from '../ui/loader/loader';

export function RegisterPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
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
    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onRegister = () => {
        dispatch(userRegister(email, password, name));
    };

    return (
        <div className={styles.authenticationPage}>
            <div className={styles.container}>
                <div className='text text_type_main-medium'>Регистрация</div>
                <div className='mt-6'>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChangeName}
                        value={name}
                        size={'default'}
                    />
                </div>
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
                        disabled={!email || !password || !name}
                        onClick={onRegister}
                    >
                        Зарегистрироваться
                    </Button>
                </div>
                <div className='mt-20'>
                    <p className='text text_type_main-default text_color_inactive'>
                        <span>Уже зарегистрированы? </span>
                        <Link to='/login' className={styles.link}>
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
