import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
} from '../../constants/ws';

type TWsConnectionStartAction = {
    readonly type: typeof WS_CONNECTION_START;
    payload: string;
};

type TWsConnectionSuccessAction = {
    readonly type: typeof WS_CONNECTION_SUCCESS;
};

type TWsConnectionErrorAction = {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload: Event;
};

type TWsConnectionClosedAction = {
    readonly type: typeof WS_CONNECTION_CLOSED;
};

type TWsGetMessageAction = {
    readonly type: typeof WS_GET_MESSAGE;
    payload: string;
};

export type TWebsocketActions =
    | TWsConnectionStartAction
    | TWsConnectionSuccessAction
    | TWsConnectionErrorAction
    | TWsConnectionClosedAction
    | TWsGetMessageAction;

export const wsConnectionStart = (url: string): TWsConnectionStartAction => {
    return {
        type: WS_CONNECTION_START,
        payload: url,
    };
};

export const wsConnectionSuccess = (): TWsConnectionSuccessAction => {
    return {
        type: WS_CONNECTION_SUCCESS,
    };
};

export const wsConnectionError = (event: Event): TWsConnectionErrorAction => {
    return {
        type: WS_CONNECTION_ERROR,
        payload: event,
    };
};

export const wsConnectionClosed = (): TWsConnectionClosedAction => {
    return {
        type: WS_CONNECTION_CLOSED,
    };
};

export const wsGetMessage = (message: string): TWsGetMessageAction => {
    return {
        type: WS_GET_MESSAGE,
        payload: message,
    };
};
