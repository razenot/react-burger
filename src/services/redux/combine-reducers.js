import { combineReducers } from 'redux';
import { constructorReducer } from './constructor/reducer';
import { ingredientsReducer } from './ingredients/reducer';
import { orderReducer } from './order/reducer';
import { ingredientDetailReducer } from './ingredient-detail/reducer';

export default combineReducers({
    constructorReducer: constructorReducer,
    ingredientsReducer: ingredientsReducer,
    orderReducer: orderReducer,
    ingredientDetailReducer: ingredientDetailReducer,
});
