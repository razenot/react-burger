import rootReducer from './reducers/combine-reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TAuthActions } from './actions/creator/auth';
import { TOrderActions } from './actions/creator/order';
import { TIngredientsActions } from './actions/creator/ingredients';
import { TConstructorActions } from './actions/creator/constructor';
import { socketMiddleware } from '../middleware/socketMiddleware';
import { TWebsocketActions } from './actions/creator/ws';
import { TOrdersActions } from './actions/creator/orders';
import { GET_ORDERS, ADD_ORDERS } from './constants/orders';
import {
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_CLOSED,
} from './../redux/constants/ws';

export type TWsActions = {
    readonly wsInit: typeof WS_CONNECTION_START;
    readonly onOpen: typeof GET_ORDERS;
    readonly onMessage: typeof ADD_ORDERS;
    readonly onError: typeof WS_CONNECTION_ERROR;
    readonly onClosed: typeof WS_CONNECTION_CLOSED;
};

const wsActions: TWsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: GET_ORDERS,
    onMessage: ADD_ORDERS,
    onError: WS_CONNECTION_ERROR,
    onClosed: WS_CONNECTION_CLOSED,
};

const enhancer = composeWithDevTools(
    applyMiddleware(thunk),
    applyMiddleware(socketMiddleware(wsActions))
);
export const store = createStore(rootReducer, enhancer);

export type TApplicationActions =
    | TAuthActions
    | TOrderActions
    | TIngredientsActions
    | TConstructorActions
    | TOrdersActions
    | TWebsocketActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
