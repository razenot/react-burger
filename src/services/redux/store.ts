import rootReducer from './reducers/combine-reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TAuthActions } from './actions/creator/auth';
import { TOrderActions } from './actions/creator/order';
import { TIngredientsActions } from './actions/creator/ingredients';
import { TConstructorActions } from './actions/creator/constructor';

// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }

const enhancer = composeWithDevTools(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer);

type TApplicationActions =
    | TAuthActions
    | TOrderActions
    | TIngredientsActions
    | TConstructorActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
