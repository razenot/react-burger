import { DETAIL_INGREDIENT_ADD, DETAIL_INGREDIENT_RESET } from './action';

const initialState = {
    ingredientData: {},
};

export const ingredientDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case DETAIL_INGREDIENT_ADD: {
            return {
                ...state,
                ingredientData: action.payload,
            };
        }
        case DETAIL_INGREDIENT_RESET: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};
