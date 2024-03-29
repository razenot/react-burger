import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    ORDER_RESET,
} from './../../constants/order';

interface IOrderRequestAction {
    readonly type: typeof SEND_ORDER_REQUEST;
}

interface IOrderSuccessAction {
    readonly type: typeof SEND_ORDER_SUCCESS;
    readonly payload: number | null;
}

interface IOrderFailAction {
    readonly type: typeof SEND_ORDER_FAILED;
    readonly payload: string;
}

interface IOrderResetAction {
    readonly type: typeof ORDER_RESET;
}

export type TOrderActions =
    | IOrderRequestAction
    | IOrderSuccessAction
    | IOrderFailAction
    | IOrderResetAction;

export const orderRequestCreator = (): IOrderRequestAction => ({
    type: SEND_ORDER_REQUEST,
});

export const orderSuccessCreator = (number: number | null): IOrderSuccessAction => ({
    type: SEND_ORDER_SUCCESS,
    payload: number,
});

export const orderFailCreator = (error: string): IOrderFailAction => ({
    type: SEND_ORDER_FAILED,
    payload: error,
});

export const orderResetCreator = (): IOrderResetAction => ({
    type: ORDER_RESET,
});
