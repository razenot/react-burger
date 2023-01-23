import { AppDispatch, AppThunk } from '../store';
import { clearOrders } from './creator/orders';
import { wsConnectionStart } from './creator/ws';

const connect = async (dispatch: AppDispatch, url: string) => {
    dispatch(wsConnectionStart(url));
};

export const getWsOrders: AppThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearOrders());
    await connect(dispatch, `wss://norma.nomoreparties.space/orders/all`);
};

export const getWsUserOrders: AppThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearOrders());
    let token = localStorage.getItem('accessToken');
    if (token) {
        token = token.replace('Bearer ', '');
    }
    await connect(dispatch, `wss://norma.nomoreparties.space/orders?token=${token}`);
};
