import {
    PasswordInput,
    Input,
    EmailInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../services/hooks/useForm';
import { userSet } from '../../services/redux/auth/action';
import styles from './profile-edit.module.css';

function ProfileEdit() {
    const nameRef = useRef();
    const [nameDisabled, setNameDisabled] = useState(true);

    const { values, handleChange, setValues } = useForm({
        name: '',
        email: '',
        password: '',
    });
    const onNameEdit = () => {
        setNameDisabled(false);
        setTimeout(() => nameRef.current.focus(), 0);
    };

    const dispatch = useDispatch();

    const { authError, isAuth, user } = useSelector(
        (state) => state.authReducer
    );

    const isDisabledButton = () => {
        return (
            user.name === values.name &&
            user.email === values.email &&
            !values.password
        );
    };

    useEffect(() => {
        if (isAuth) {
            onClearData();
        }
    }, [user, isAuth]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(userSet(values));
    };

    const onClearData = () => {
        setValues({ name: user.name, email: user.email, password: '' });
    };

    return (
        <>
            {authError ? (
                <div
                    className={`${styles.error} mt-6 text text_type_main-default`}
                >
                    {authError}
                </div>
            ) : (
                <>
                    <form onSubmit={onSubmit}>
                        <div className='mt-6'>
                            <Input
                                type={'text'}
                                value={values.name}
                                name={'name'}
                                icon={'EditIcon'}
                                placeholder={'Имя'}
                                disabled={nameDisabled}
                                onIconClick={onNameEdit}
                                onBlur={() => setNameDisabled(true)}
                                onChange={handleChange}
                                ref={nameRef}
                            />
                        </div>
                        <div className='mt-6'>
                            <EmailInput
                                onChange={handleChange}
                                value={values.email}
                                name={'email'}
                                isIcon={true}
                                placeholder={'Логин'}
                            />
                        </div>
                        <div className='mt-6'>
                            <PasswordInput
                                placeholder={'Пароль'}
                                icon={'EditIcon'}
                                onChange={handleChange}
                                value={values.password}
                                name={'password'}
                            />
                        </div>
                        <div className={`${styles.buttonGroup} mt-6`}>
                            <Button
                                htmlType='button'
                                type='secondary'
                                size='medium'
                                disabled={isDisabledButton()}
                                onClick={onClearData}
                            >
                                Отмена
                            </Button>
                            <Button
                                htmlType='submit'
                                type='primary'
                                size='medium'
                                disabled={isDisabledButton()}
                            >
                                Сохранить
                            </Button>
                        </div>
                    </form>
                </>
            )}
        </>
    );
}

export default ProfileEdit;
