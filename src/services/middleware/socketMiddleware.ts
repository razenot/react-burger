import { Middleware, MiddlewareAPI } from 'redux';
import { TWebsocketActions } from '../redux/actions/creator/ws';
import { AppDispatch, RootState, TWsActions } from '../redux/store';

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: null | WebSocket = null;

        return (next) => async (action: TWebsocketActions) => {
            const { dispatch } = store;
            const { wsInit, onOpen, onMessage, onError, onClosed } = wsActions;

            if (action.type === wsInit) {
                socket = new WebSocket(action.payload);

                if (socket) {
                    socket.onopen = () => {
                        dispatch({ type: onOpen });
                    };

                    socket.onerror = (event) => {
                        dispatch({ type: onError, payload: event });
                    };

                    socket.onmessage = (event) => {
                        const { data } = event;
                        const parsedData = JSON.parse(data);
                        dispatch({ type: onMessage, payload: parsedData });
                    };

                    socket.onclose = (event) => {
                        dispatch({ type: onClosed, payload: event });
                    };
                }
            }

            next(action);
        };
    };
};
