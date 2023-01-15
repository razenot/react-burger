import {
    PasswordInput,
    Input,
    EmailInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from '../../services/hooks/redux-hook';
import { useForm } from '../../services/hooks/useForm';
import { userSet } from '../../services/redux/actions/auth';
import styles from './profile-edit.module.css';

const ProfileEdit: FC = () => {
    const nameRef = useRef<HTMLInputElement>(null!);
    const [nameDisabled, setNameDisabled] = useState<boolean>(true);

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

    const isDisabledButton: () => boolean = () => {
        return (
            user?.name === values.name &&
            user?.email === values.email &&
            !values.password
        );
    };

    useEffect(() => {
        if (isAuth) {
            onClearData();
        }
    }, [user, isAuth]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userSet(values));
    };

    const onClearData = () => {
        setValues({ name: user?.name, email: user?.email, password: '' });
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
};

export default ProfileEdit;
