import { TIngredient } from '../../utils/types';
import { TConstructorActions } from '../actions/creator/constructor';
import {
    CONSTRUCTOR_ADD,
    CONSTRUCTOR_REMOVE,
    CONSTRUCTOR_REBUILD,
    CONSTRUCTOR_RESET,
} from '../constants/constructor';

type TConstructorState = {
    readonly ingredients: ReadonlyArray<TIngredient>;
    readonly bun: TIngredient | null;
};

export const initialState: TConstructorState = {
    ingredients: [],
    bun: null,
};

export const constructorReducer = (
    state = initialState,
    action: TConstructorActions
): TConstructorState => {
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
                ingredients: [...state.ingredients.filter((item) => item.id !== action.payload)],
            };
        }
        case CONSTRUCTOR_REBUILD: {
            const ingredients = [...state.ingredients];
            ingredients.splice(
                action.payload.before,
                0,
                ingredients.splice(action.payload.after, 1)[0]
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
