import {
    requestLogin,
    requestRegister,
    refreshToken,
    requestGetUser,
    requestSetUser,
} from '../../utils/burger-api';

export const AUTH_LOGIN_GET = 'AUTH_LOGIN_GET';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_REGISTER_GET = 'AUTH_REGISTER_GET';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_ERROR = 'AUTH_REGISTER_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
export const AUTH_USER_SET_SUCCESS = 'AUTH_USER_SET_SUCCESS';
export const AUTH_USER_ERROR = 'AUTH_USER_ERROR';
export const AUTH_FORGOT_PASSWORD_SUCCESS = 'AUTH_FORGOT_PASSWORD_SUCCESS';
export const AUTH_RESET_PASSWORD_SUCCESS = 'AUTH_RESET_PASSWORD_SUCCESS';

export const userLogin = (form) => (dispatch) => {
    dispatch({
        type: AUTH_LOGIN_GET,
    });
    const { email, password } = form;
    return requestLogin(email, password)
        .then((loginData) => {
            dispatch({
                type: AUTH_LOGIN_SUCCESS,
                payload: loginData,
            });
        })
        .catch((e) => {
            dispatch({
                type: AUTH_LOGIN_ERROR,
                payload: e.message,
            });
        });
};

export const userRegister = (form) => (dispatch) => {
    dispatch({
        type: AUTH_REGISTER_GET,
    });
    const { email, password, name } = form;
    return requestRegister(email, password, name)
        .then((registerData) => {
            dispatch({
                type: AUTH_REGISTER_SUCCESS,
                payload: registerData,
            });
        })
        .catch((e) => {
            dispatch({
                type: AUTH_REGISTER_ERROR,
                payload: e.message,
            });
        });
};

export const userLogout = () => (dispatch) => {
    return refreshToken()
        .then(() => {
            dispatch({
                type: AUTH_LOGOUT,
            });
        })
        .catch((e) => {
            alert(e.message);
        });
};

export const userGet = () => (dispatch) => {
    dispatch({
        type: AUTH_USER_REQUEST,
    });
    return requestGetUser()
        .then((userData) => {
            dispatch({
                type: AUTH_USER_SET_SUCCESS,
                payload: userData,
            });
        })
        .catch((e) => {
            dispatch({
                type: AUTH_USER_ERROR,
                payload: e.message,
            });
        });
};

export const userSet = (form) => (dispatch) => {
    dispatch({
        type: AUTH_USER_REQUEST,
    });
    const { email, password, name } = form;
    return requestSetUser(email, password, name)
        .then((userData) => {
            dispatch({
                type: AUTH_USER_SET_SUCCESS,
                payload: userData,
            });
        })
        .catch((e) => {
            dispatch({
                type: AUTH_USER_ERROR,
                payload: e.message,
            });
        });
};
