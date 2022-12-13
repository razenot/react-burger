import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import {
    PasswordInput,
    Input,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { requestResetPassword } from './../services/utils/burger-api';
import styles from './style.module.css';
import { Loader } from '../ui/loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_RESET_PASSWORD_SUCCESS } from '../services/redux/auth/action';
import { useForm } from '../services/hooks/useForm';

export function ResetPasswordPage() {
    const { values, handleChange } = useForm({
        password: '',
        code: '',
    });

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const { isAuth, isCheckedUser, isResetPassword } = useSelector(
        (state) => state.authReducer
    );

    if (localStorage.getItem('accessToken')) {
        if (!isCheckedUser) {
            return <Loader size='large' />;
        }
    } else {
        if (!isResetPassword)
            return <Redirect to={location.state?.from || '/login'} />;
    }

    if (isAuth) {
        return <Redirect to={location.state?.from || '/'} />;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        requestResetPassword(values.password, values.code)
            .then(() => {
                dispatch({
                    type: AUTH_RESET_PASSWORD_SUCCESS,
                });
                history.push({ pathname: '/login' });
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
                        <PasswordInput
                            placeholder={'Введите новый пароль'}
                            onChange={handleChange}
                            value={values.password}
                            name={'password'}
                        />
                    </div>
                    <div className='mt-6'>
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            onChange={handleChange}
                            value={values.code}
                            size={'default'}
                            name={'code'}
                        />
                    </div>
                    <div className='mt-6'>
                        <Button
                            htmlType='submit'
                            type='primary'
                            size='medium'
                            disabled={!values.password || !values.code}
                        >
                            Сохранить
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
