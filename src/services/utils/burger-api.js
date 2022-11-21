const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
    return fetch(`${BURGER_API_URL}/ingredients`)
        .then(checkResponse)
        .then((resData) => {
            if (resData?.success) return resData.data;
            return Promise.reject(resData);
        });
};

export const sendOrder = (ingredients) => {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
    };
    return fetch(`${BURGER_API_URL}/orders`, data)
        .then(checkResponse)
        .then((resData) => {
            if (resData?.success) return resData;
            return Promise.reject(resData);
        });
};
