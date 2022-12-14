import { sendOrder as fetchOrder } from '../../utils/burger-api';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const ORDER_RESET = 'ORDER_RESET';

export const sendOrder = (ingredients) => (dispatch) => {
    dispatch({
        type: SEND_ORDER_REQUEST,
    });
    return fetchOrder(ingredients)
        .then((orderFields) => {
            dispatch({
                type: SEND_ORDER_SUCCESS,
                payload: orderFields,
            });
        })
        .catch((e) => {
            dispatch({
                type: SEND_ORDER_FAILED,
                payload: e,
            });
        });
};
