import { FC, FormEvent } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {
    Input,
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import { userRegister } from '../services/redux/actions/auth';
import { Loader } from '../ui/loader/loader';
import { useForm } from '../services/hooks/useForm';
import { TModalState } from '../services/utils/types';
import { useDispatch, useSelector } from '../services/hooks/redux-hook';

export const RegisterPage: FC = () => {
    const { values, handleChange } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const location = useLocation<TModalState>();

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

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userRegister(values));
    };

    return (
        <div className={styles.authenticationPage}>
            <div className={styles.container}>
                <div className='text text_type_main-medium'>Регистрация</div>
                <form onSubmit={onSubmit}>
                    <div className='mt-6'>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={handleChange}
                            value={values.name}
                            size={'default'}
                            name={'name'}
                        />
                    </div>
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
                        <div className={`${styles.error} mt-6 text text_type_main-default`}>
                            {authError}
                        </div>
                    )}
                    <div className='mt-6'>
                        <Button
                            htmlType='submit'
                            type='primary'
                            size='medium'
                            disabled={!values.email || !values.password || !values.name}
                        >
                            Зарегистрироваться
                        </Button>
                    </div>
                </form>
                <div className='mt-20'>
                    <p className='text text_type_main-default text_color_inactive'>
                        <span>Уже зарегистрированы? </span>
                        <Link<TModalState> to='/login' className={styles.link}>
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
