import {
    CONSTRUCTOR_ADD,
    CONSTRUCTOR_REMOVE,
    CONSTRUCTOR_REORDER,
    CONSTRUCTOR_RESET,
} from './../actions/constructor';

const initialState = {
    ingredients: [],
    bun: null,
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTRUCTOR_ADD: {
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    bun: action.payload,
                };
            } else {
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.payload],
                };
            }
        }
        case CONSTRUCTOR_REMOVE: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.filter(
                        (item) => item.id != action.payload
                    ),
                ],
            };
        }
        case CONSTRUCTOR_REORDER: {
            const ingredients = [...state.ingredients];
            ingredients.splice(
                action.payload.to,
                0,
                ingredients.splice(action.payload.from, 1)[0]
            );
            return {
                ...state,
                ingredients,
            };
        }
        case CONSTRUCTOR_RESET: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};
