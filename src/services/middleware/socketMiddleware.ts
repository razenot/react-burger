import { Middleware, MiddlewareAPI } from 'redux';
import { TWebsocketActions } from '../redux/actions/creator/ws';
import { AppDispatch, RootState, TWsActions } from '../redux/store';

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: null | WebSocket = null;

        return (next) => async (action: TWebsocketActions) => {
            const { dispatch } = store;
            const { wsInit, wsSuccess, onOpen, onMessage, onError, onClosed, onClose } = wsActions;

            if (action.type === wsInit) {
                socket = new WebSocket(action.payload);

                if (socket) {
                    socket.onopen = () => {
                        dispatch({ type: onOpen });
                        dispatch({ type: wsSuccess });
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
            } else if (action.type === onClose) {
                if (socket) {
                    socket.close();
                }
            }

            next(action);
        };
    };
};
