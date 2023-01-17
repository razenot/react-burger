import { sendOrder as fetchOrder } from '../../utils/burger-api';
import { AppDispatch, AppThunk } from '../store';
import { orderFailCreator, orderRequestCreator, orderSuccessCreator } from './creator/order';

export const sendOrder: AppThunk = (ingredients: Array<string>) => (dispatch: AppDispatch) => {
    dispatch(orderRequestCreator());
    return fetchOrder(ingredients)
        .then((orderFields) => {
            dispatch(orderSuccessCreator(orderFields.order));
        })
        .catch((e) => {
            dispatch(orderFailCreator(e.message));
        });
};
