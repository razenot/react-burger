import { initialState, authReducer as reducer } from './auth';
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
} from '../constants/auth';

describe('auth reducer', () => {
    it('Should no action', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('Should action AUTH_LOGIN_GET', () => {
        expect(
            reducer(initialState, {
                type: AUTH_LOGIN_GET,
            })
        ).toEqual({
            ...initialState,
            authLoading: true,
            authError: false,
            isCheckedUser: false,
        });
    });

    it('Should action AUTH_REGISTER_GET', () => {
        expect(
            reducer(initialState, {
                type: AUTH_REGISTER_GET,
            })
        ).toEqual({
            ...initialState,
            authLoading: true,
            authError: false,
            isCheckedUser: false,
        });
    });

    it('Should action AUTH_LOGIN_SUCCESS', () => {
        expect(
            reducer(
                { ...initialState, authLoading: true },
                {
                    type: AUTH_LOGIN_SUCCESS,
                    payload: { user: { email: 'example@email.com', name: 'user1' } },
                }
            )
        ).toEqual({
            ...initialState,
            user: { email: 'example@email.com', name: 'user1' },
            isAuth: true,
            authLoading: false,
            authError: false,
            isCheckedUser: true,
        });
    });

    it('Should action AUTH_REGISTER_SUCCESS', () => {
        expect(
            reducer(
                { ...initialState, authLoading: true },
                {
                    type: AUTH_REGISTER_SUCCESS,
                    payload: { user: { email: 'example@email.com', name: 'user1' } },
                }
            )
        ).toEqual({
            ...initialState,
            user: { email: 'example@email.com', name: 'user1' },
            isAuth: true,
            authLoading: false,
            authError: false,
            isCheckedUser: true,
        });
    });

    it('Should action AUTH_REGISTER_ERROR', () => {
        expect(
            reducer(
                { ...initialState, authLoading: true },
                {
                    type: AUTH_REGISTER_ERROR,
                    payload: 'error message',
                }
            )
        ).toEqual({
            ...initialState,
            authLoading: false,
            authError: 'error message',
        });
    });

    it('Should action AUTH_LOGIN_ERROR', () => {
        expect(
            reducer(
                { ...initialState, authLoading: true },
                {
                    type: AUTH_LOGIN_ERROR,
                    payload: 'error message',
                }
            )
        ).toEqual({
            ...initialState,
            authLoading: false,
            authError: 'error message',
        });
    });

    it('Should action AUTH_USER_SET_SUCCESS', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    authLoading: true,
                    user: { email: 'example@email.com', name: 'user1' },
                    isCheckedUser: false,
                },
                {
                    type: AUTH_USER_SET_SUCCESS,
                    payload: { user: { email: 'example2@email.com', name: 'user2' } },
                }
            )
        ).toEqual({
            ...initialState,
            user: { email: 'example2@email.com', name: 'user2' },
            isAuth: true,
            authLoading: false,
            authError: false,
            isCheckedUser: true,
        });
    });

    it('Should action AUTH_USER_REQUEST', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    authLoading: false,
                    isCheckedUser: false,
                },
                {
                    type: AUTH_USER_REQUEST,
                }
            )
        ).toEqual({
            ...initialState,
            authLoading: true,
            isCheckedUser: false,
        });
    });

    it('Should action AUTH_USER_REQUEST', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    authLoading: false,
                    isCheckedUser: false,
                },
                {
                    type: AUTH_USER_REQUEST,
                }
            )
        ).toEqual({
            ...initialState,
            authLoading: true,
            isCheckedUser: false,
        });
    });

    it('Should action AUTH_USER_ERROR', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    authLoading: true,
                    isCheckedUser: false,
                },
                {
                    type: AUTH_USER_ERROR,
                    payload: 'error message',
                }
            )
        ).toEqual({
            ...initialState,
            isCheckedUser: true,
            authLoading: false,
            authError: 'error message',
        });
    });

    it('Should action AUTH_LOGOUT', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    authLoading: true,
                    user: { email: 'example@email.com', name: 'user1' },
                    isCheckedUser: false,
                },
                {
                    type: AUTH_LOGOUT,
                }
            )
        ).toEqual({
            ...initialState,
        });
    });

    it('Should action AUTH_FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    isResetPassword: false,
                },
                {
                    type: AUTH_FORGOT_PASSWORD_SUCCESS,
                }
            )
        ).toEqual({
            ...initialState,
            isResetPassword: true,
        });
    });

    it('Should action AUTH_RESET_PASSWORD_SUCCESS', () => {
        expect(
            reducer(
                {
                    ...initialState,
                    isResetPassword: true,
                },
                {
                    type: AUTH_RESET_PASSWORD_SUCCESS,
                }
            )
        ).toEqual({
            ...initialState,
            isResetPassword: false,
        });
    });
});
