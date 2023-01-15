import { TOrderResponse } from '../../utils/types';
import { TOrderActions } from '../actions/creator/order';
import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    ORDER_RESET,
} from '../constants/order';

type TOrderState = {
    orderFields: TOrderResponse | null;
    loading: boolean;
    error: string | boolean;
};

const initialState: TOrderState = {
    orderFields: null,
    loading: false,
    error: false,
};

export const orderReducer = (
    state = initialState,
    action: TOrderActions
): TOrderState => {
    switch (action.type) {
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
            };
        }
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                orderFields: action.payload,
                loading: false,
                error: false,
            };
        }
        case SEND_ORDER_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case ORDER_RESET: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};
