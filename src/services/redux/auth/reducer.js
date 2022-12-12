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
} from './action';

const initialState = {
    user: {},
    isAuth: false,
    authLoading: false,
    authError: false,
    isCheckedUser: false,
    isResetPassword: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REGISTER_GET:
        case AUTH_LOGIN_GET: {
            return {
                ...state,
                authLoading: true,
                authError: false,
                isCheckedUser: false,
            };
        }
        case AUTH_REGISTER_SUCCESS:
        case AUTH_LOGIN_SUCCESS: {
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            return {
                ...state,
                user: action.payload.user,
                isAuth: true,
                authLoading: false,
                authError: false,
                isCheckedUser: true,
            };
        }
        case AUTH_REGISTER_ERROR:
        case AUTH_LOGIN_ERROR: {
            return {
                ...state,
                authLoading: false,
                authError: action.payload,
            };
        }
        case AUTH_USER_SET_SUCCESS: {
            return {
                ...state,
                user: action.payload.user,
                isAuth: true,
                authLoading: false,
                authError: false,
                isCheckedUser: true,
            };
        }
        case AUTH_USER_REQUEST: {
            return {
                ...state,
                authLoading: true,
                isCheckedUser: false,
            };
        }
        case AUTH_USER_ERROR: {
            return {
                ...state,
                isCheckedUser: true,
                authLoading: false,
                authError: action.payload,
            };
        }
        case AUTH_LOGOUT: {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return initialState;
        }
        case AUTH_FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                isResetPassword: true,
            };
        }
        case AUTH_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                isResetPassword: false,
            };
        }

        default: {
            return state;
        }
    }
};
