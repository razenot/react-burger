import { TFeedOrder } from '../../utils/types';
import { TOrdersActions } from '../actions/creator/orders';
import { GET_ORDERS, ADD_ORDERS, CLEAR_ORDERS } from '../constants/orders';

export type TOrdersState = {
    loading: boolean;
    total: number;
    todayTotal: number;
    orders: Array<TFeedOrder>;
};

const initialState: TOrdersState = {
    loading: false,
    total: 0,
    todayTotal: 0,
    orders: [],
};

export const ordersReducer = (state = initialState, action: TOrdersActions): TOrdersState => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                loading: true,
            };
        case ADD_ORDERS:
            return {
                ...state,
                orders: action.payload.orders
                    ? action.payload.orders.slice(0, 30).sort((a, b) => b.number - a.number)
                    : [],
                total: action.payload.total,
                todayTotal: action.payload.totalToday,
                loading: false,
            };
        case CLEAR_ORDERS:
            return {
                ...state,
                orders: [],
                total: 0,
                todayTotal: 0,
                loading: false,
            };
        default:
            return state;
    }
};
