import { useState } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import {
    EmailInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { requestForgotPassword } from './../services/utils/burger-api';
import styles from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../ui/loader/loader';
import { AUTH_FORGOT_PASSWORD_SUCCESS } from '../services/redux/auth/action';

export function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const { isAuth, isCheckedUser } = useSelector((state) => state.authReducer);

    if (localStorage.getItem('accessToken')) {
        if (!isCheckedUser) {
            return <Loader size='large' />;
        }
    }

    if (isAuth) {
        return <Redirect to={location.state?.from || '/'} />;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        requestForgotPassword(email)
            .then(() => {
                dispatch({
                    type: AUTH_FORGOT_PASSWORD_SUCCESS,
                });
                history.push({ pathname: '/reset-password' });
            })
            .catch((e) => {
                alert(e.message);
            });
    };

    return (
        <div className={styles.authenticationPage}>
            <div className={styles.container}>
                <div className='text text_type_main-medium'>
                    Восстановление пароля
                </div>
                <form onSubmit={onSubmit}>
                    <div className='mt-6'>
                        <EmailInput
                            onChange={onChangeEmail}
                            value={email}
                            isIcon={false}
                            placeholder={'Укажите e-mail'}
                        />
                    </div>
                    <div className='mt-6'>
                        <Button
                            htmlType='submit'
                            type='primary'
                            size='medium'
                            disabled={!email}
                        >
                            Восстановить
                        </Button>
                    </div>
                </form>
                <div className='mt-20'>
                    <p className='text text_type_main-default text_color_inactive'>
                        <span>Вспомнили пароль? </span>
                        <Link to='/login' className={styles.link}>
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
