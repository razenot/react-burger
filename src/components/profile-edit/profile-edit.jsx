import {
    PasswordInput,
    Input,
    EmailInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSet } from '../../services/redux/auth/action';
import styles from './profile-edit.module.css';

function ProfileEdit() {
    const nameRef = useRef();
    const [nameDisabled, setNameDisabled] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onNameEdit = () => {
        setNameDisabled(false);
        setTimeout(() => nameRef.current.focus(), 0);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const dispatch = useDispatch();

    const { authError, isAuth, user } = useSelector(
        (state) => state.authReducer
    );

    const isDisabledButton = () => {
        return user.name === name && user.email === email && !password;
    };

    useEffect(() => {
        if (isAuth) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user, isAuth]);

    const onSaveData = () => {
        dispatch(userSet(email, password, name));
    };

    const onClearData = () => {
        setName(user.name);
        setEmail(user.email);
        setPassword('');
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
                    <div className='mt-6'>
                        <Input
                            type={'text'}
                            value={name}
                            icon={'EditIcon'}
                            placeholder={'Имя'}
                            disabled={nameDisabled}
                            onIconClick={onNameEdit}
                            onBlur={() => setNameDisabled(true)}
                            onChange={onChangeName}
                            ref={nameRef}
                        />
                    </div>
                    <div className='mt-6'>
                        <EmailInput
                            onChange={onChangeEmail}
                            value={email}
                            isIcon={true}
                            placeholder={'Логин'}
                        />
                    </div>
                    <div className='mt-6'>
                        <PasswordInput
                            placeholder={'Пароль'}
                            icon={'EditIcon'}
                            onChange={onChangePassword}
                            value={password}
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
                            htmlType='button'
                            type='primary'
                            size='medium'
                            disabled={isDisabledButton()}
                            onClick={onSaveData}
                        >
                            Сохранить
                        </Button>
                    </div>
                </>
            )}
        </>
    );
}

export default ProfileEdit;
