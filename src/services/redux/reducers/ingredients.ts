import { TIngredient } from '../../utils/types';
import { TIngredientsActions } from '../actions/creator/ingredients';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from '../constants/ingredients';

type TIngredientsState = {
    ingredients: ReadonlyArray<TIngredient>;
    loading: boolean;
    error: string | boolean;
};

const initialState: TIngredientsState = {
    ingredients: [],
    loading: false,
    error: false,
};

export const ingredientsReducer = (
    state = initialState,
    action: TIngredientsActions
): TIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.payload,
                loading: false,
                error: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
