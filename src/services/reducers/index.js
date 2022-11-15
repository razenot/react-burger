import { combineReducers } from 'redux';
import { constructorReducer } from './constructors';
import { ingredientsReducer } from './ingredients';

export default combineReducers({
    constructorReducer: constructorReducer,
    ingredientsReducer: ingredientsReducer,
});
