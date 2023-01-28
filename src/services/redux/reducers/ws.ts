import { TWebsocketActions } from '../actions/creator/ws';
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED } from '../constants/ws';

type TWSState = {
    wsConnected: boolean;
    error: Event | boolean;
};

export const initialState: TWSState = {
    wsConnected: false,
    error: false,
};

export const wsReducer = (state = initialState, action: TWebsocketActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: false,
                wsConnected: true,
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false,
            };
        case WS_CONNECTION_CLOSED:
            return initialState;
        default:
            return state;
    }
};
