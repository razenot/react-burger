const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const request = (url: string, options: any = null) => {
    return fetch(url, options)
        .then(checkResponse)
        .then((resData) => {
            if (resData?.success) return resData;
            return Promise.reject(resData);
        });
};

export const requestWithRefresh = async (url: string, options: any) => {
    try {
        return await request(url, options);
    } catch (err: any) {
        console.log('refresh err catch', err);
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            console.log('update token');
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            return await request(url, options);
        } else {
            return Promise.reject(err);
        }
    }
};

export const getIngredients = () => {
    return request(`${BURGER_API_URL}/ingredients`);
};

export const sendOrder = (ingredients: Array<string>) => {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({ ingredients }),
    };

    return request(`${BURGER_API_URL}/orders`, data);
};

export const requestForgotPassword = (email: string) => {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    };

    return request(`${BURGER_API_URL}/password-reset`, data);
};

export const requestResetPassword = (password: string, code: string) => {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password, token: code }),
    };

    return request(`${BURGER_API_URL}/password-reset/reset`, data);
};

export const requestLogin = (email: string, password: string) => {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    };

    return request(`${BURGER_API_URL}/auth/login`, data);
};

export const requestRegister = (
    email: string,
    password: string,
    name: string
) => {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password, name: name }),
    };

    return request(`${BURGER_API_URL}/auth/register`, data);
};

export const refreshToken = () => {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    };

    return request(`${BURGER_API_URL}/auth/token`, data);
};

export const requestGetUser = () => {
    const data = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem('accessToken'),
        },
    };

    return requestWithRefresh(`${BURGER_API_URL}/auth/user`, data);
};

export const requestSetUser = (
    email: string,
    password: string,
    name: string
) => {
    const data = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({ email: email, password: password, name: name }),
    };

    return requestWithRefresh(`${BURGER_API_URL}/auth/user`, data);
};
