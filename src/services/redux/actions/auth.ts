import { AppDispatch, AppThunk } from '../store';
import { TLoginForm, TUserFullForm } from '../../utils/types';
import {
    requestLogin,
    requestRegister,
    refreshToken,
    requestGetUser,
    requestSetUser,
} from '../../utils/burger-api';
import {
    authLoginErrorCreator,
    authLoginGetCreator,
    authLoginSuccessCreator,
    authLogoutCreator,
    authRegisterErrorCreator,
    authRegisterGetCreator,
    authRegisterSuccessCreator,
    authUserErrorCreator,
    authUserRequestCreator,
    authUserSetSuccessCreator,
} from './creator/auth';

export const userLogin: AppThunk = (form: TLoginForm) => (dispatch: AppDispatch) => {
    dispatch(authLoginGetCreator());
    const { email, password } = form;
    return requestLogin(email, password)
        .then((loginData) => {
            dispatch(authLoginSuccessCreator(loginData));
        })
        .catch((e) => {
            dispatch(authLoginErrorCreator(e.message));
        });
};

export const userRegister: AppThunk = (form: TUserFullForm) => (dispatch: AppDispatch) => {
    dispatch(authRegisterGetCreator());
    const { email, password, name } = form;
    return requestRegister(email, password, name)
        .then((registerData) => {
            dispatch(authRegisterSuccessCreator(registerData));
        })
        .catch((e) => {
            dispatch(authRegisterErrorCreator(e.message));
        });
};

export const userLogout: AppThunk = () => (dispatch: AppDispatch) => {
    return refreshToken()
        .then(() => {
            dispatch(authLogoutCreator());
        })
        .catch((e) => {
            alert(e.message);
        });
};

export const userGet: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(authUserRequestCreator());
    return requestGetUser()
        .then((userData) => {
            dispatch(authUserSetSuccessCreator(userData));
        })
        .catch((e) => {
            dispatch(authUserErrorCreator(e.message));
        });
};

export const userSet: AppThunk = (form: TUserFullForm) => (dispatch: AppDispatch) => {
    dispatch(authUserRequestCreator());
    const { email, password, name } = form;
    return requestSetUser(email, password, name)
        .then((userData) => {
            dispatch(authUserSetSuccessCreator(userData));
        })
        .catch((e) => {
            dispatch(authUserErrorCreator(e.message));
        });
};
