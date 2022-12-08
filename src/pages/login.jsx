import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className={styles.authenticationPage}>
            <div className={styles.container}>
                <div className='text text_type_main-medium'>Вход</div>
                <div className='mt-6'>
                    <EmailInput
                        onChange={onChangeEmail}
                        value={email}
                        name={'email'}
                        isIcon={false}
                    />
                </div>
                <div className='mt-6'>
                    <PasswordInput
                        onChange={onChangePassword}
                        value={password}
                        name={'password'}
                    />
                </div>
                <div className='mt-6'>
                    <Button htmlType='button' type='primary' size='medium'>
                        Войти
                    </Button>
                </div>
                <div className='mt-20'>
                    <p className='text text_type_main-default'>
                        <span>Вы — новый пользователь? </span>
                        <Link to='/register' className={styles.link}>
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className='text text_type_main-default mt-4'>
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
