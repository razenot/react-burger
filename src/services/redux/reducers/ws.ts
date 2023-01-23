import { TWebsocketActions } from '../actions/creator/ws';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
} from '../constants/ws';

type TWSState = {
    wsConnected: boolean;
    messages: Array<string>;
    error: Event | boolean;
};

const initialState: TWSState = {
    wsConnected: false,
    messages: [],
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
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: false,
                messages: [...state.messages, action.payload],
            };
        case WS_CONNECTION_CLOSED:
            return initialState;
        default:
            return state;
    }
};
