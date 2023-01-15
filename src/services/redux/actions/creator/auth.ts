import { TLoginSuccess, TUserRequest } from '../../../utils/types';
import {
    AUTH_LOGIN_GET,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_REGISTER_GET,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_ERROR,
    AUTH_LOGOUT,
    AUTH_USER_REQUEST,
    AUTH_USER_SET_SUCCESS,
    AUTH_USER_ERROR,
    AUTH_FORGOT_PASSWORD_SUCCESS,
    AUTH_RESET_PASSWORD_SUCCESS,
} from '../../constants/auth';

interface IAuthLoginGetAction {
    readonly type: typeof AUTH_LOGIN_GET;
}

interface IAuthLoginSuccessAction {
    readonly type: typeof AUTH_LOGIN_SUCCESS;
    readonly payload: TLoginSuccess;
}

interface IAuthLoginErrorAction {
    readonly type: typeof AUTH_LOGIN_ERROR;
    readonly payload: string;
}

interface IAuthRegisterGetAction {
    readonly type: typeof AUTH_REGISTER_GET;
}

interface IAuthRegisterSuccessAction {
    readonly type: typeof AUTH_REGISTER_SUCCESS;
    readonly payload: TLoginSuccess;
}

interface IAuthRegisterErrorAction {
    readonly type: typeof AUTH_REGISTER_ERROR;
    readonly payload: string;
}

interface IAuthLogoutAction {
    readonly type: typeof AUTH_LOGOUT;
}

interface IAuthUserRequestAction {
    readonly type: typeof AUTH_USER_REQUEST;
}

interface IAuthUserSetSuccessAction {
    readonly type: typeof AUTH_USER_SET_SUCCESS;
    readonly payload: TUserRequest;
}

interface IAuthUserErrorAction {
    readonly type: typeof AUTH_USER_ERROR;
    readonly payload: string;
}

interface IAuthForgotPasswordSuccessAction {
    readonly type: typeof AUTH_FORGOT_PASSWORD_SUCCESS;
}

interface IAuthResetPasswordSuccessAction {
    readonly type: typeof AUTH_RESET_PASSWORD_SUCCESS;
}

export type TAuthActions =
    | IAuthLoginGetAction
    | IAuthLoginSuccessAction
    | IAuthLoginErrorAction
    | IAuthRegisterGetAction
    | IAuthRegisterSuccessAction
    | IAuthRegisterErrorAction
    | IAuthLogoutAction
    | IAuthUserRequestAction
    | IAuthUserSetSuccessAction
    | IAuthUserErrorAction
    | IAuthForgotPasswordSuccessAction
    | IAuthResetPasswordSuccessAction;

export const authLoginGetCreator = (): IAuthLoginGetAction => ({
    type: AUTH_LOGIN_GET,
});

export const authLoginSuccessCreator = (
    data: TLoginSuccess
): IAuthLoginSuccessAction => ({
    type: AUTH_LOGIN_SUCCESS,
    payload: data,
});

export const authLoginErrorCreator = (
    error: string
): IAuthLoginErrorAction => ({
    type: AUTH_LOGIN_ERROR,
    payload: error,
});

export const authRegisterGetCreator = (): IAuthRegisterGetAction => ({
    type: AUTH_REGISTER_GET,
});

export const authRegisterSuccessCreator = (
    data: TLoginSuccess
): IAuthRegisterSuccessAction => ({
    type: AUTH_REGISTER_SUCCESS,
    payload: data,
});

export const authRegisterErrorCreator = (
    error: string
): IAuthRegisterErrorAction => ({
    type: AUTH_REGISTER_ERROR,
    payload: error,
});

export const authLogoutCreator = (): IAuthLogoutAction => ({
    type: AUTH_LOGOUT,
});

export const authUserRequestCreator = (): IAuthUserRequestAction => ({
    type: AUTH_USER_REQUEST,
});

export const authUserSetSuccessCreator = (
    data: TUserRequest
): IAuthUserSetSuccessAction => ({
    type: AUTH_USER_SET_SUCCESS,
    payload: data,
});

export const authUserErrorCreator = (error: string): IAuthUserErrorAction => ({
    type: AUTH_USER_ERROR,
    payload: error,
});

export const forgotPasswordCreator = (): IAuthForgotPasswordSuccessAction => ({
    type: AUTH_FORGOT_PASSWORD_SUCCESS,
});

export const resetPasswordCreator = (): IAuthResetPasswordSuccessAction => ({
    type: AUTH_RESET_PASSWORD_SUCCESS,
});
