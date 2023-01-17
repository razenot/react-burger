import { TServerOrders } from '../../../utils/types';
import { GET_ORDERS, ADD_ORDERS, CLEAR_ORDERS } from '../../constants/orders';

interface IGetOrdersAction {
    readonly type: typeof GET_ORDERS;
}

interface IAddOrderAction {
    readonly type: typeof ADD_ORDERS;
    readonly payload: TServerOrders;
}

interface IClearOrdersAction {
    readonly type: typeof CLEAR_ORDERS;
}

export type TOrdersActions = IGetOrdersAction | IClearOrdersAction | IAddOrderAction;

export const getOrders = (): IGetOrdersAction => ({
    type: GET_ORDERS,
});

export const addOrders = (data: TServerOrders): IAddOrderAction => ({
    type: ADD_ORDERS,
    payload: data,
});

export const clearOrders = (): IClearOrdersAction => ({
    type: CLEAR_ORDERS,
});
