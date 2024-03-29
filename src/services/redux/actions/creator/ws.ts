import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED,
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

type TWsConnectionCloseAction = {
    readonly type: typeof WS_CONNECTION_CLOSE;
};

type TWsConnectionClosedAction = {
    readonly type: typeof WS_CONNECTION_CLOSED;
};

export type TWebsocketActions =
    | TWsConnectionStartAction
    | TWsConnectionSuccessAction
    | TWsConnectionErrorAction
    | TWsConnectionCloseAction
    | TWsConnectionClosedAction;
// | TWsGetMessageAction;

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

export const wsConnectionClose = (): TWsConnectionCloseAction => {
    return {
        type: WS_CONNECTION_CLOSE,
    };
};

export const wsConnectionClosed = (): TWsConnectionClosedAction => {
    return {
        type: WS_CONNECTION_CLOSED,
    };
};
