import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { authReducer } from './auth';
import { wsReducer } from './ws';
import { ordersReducer } from './orders';

export default combineReducers({
    constructorReducer: constructorReducer,
    ingredientsReducer: ingredientsReducer,
    orderReducer: orderReducer,
    authReducer: authReducer,
    wsReducer: wsReducer,
    ordersReducer: ordersReducer,
});
