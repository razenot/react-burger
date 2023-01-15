import { TIngredient } from '../../../utils/types';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from './../../constants/ingredients';

interface IIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: Array<TIngredient>;
}

interface IIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
    readonly payload: string;
}

export type TIngredientsActions =
    | IIngredientsRequestAction
    | IIngredientsSuccessAction
    | IIngredientsFailedAction;

export const ingredientsRequestCreator = (): IIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST,
});

export const ingredientsSuccessCreator = (
    data: Array<TIngredient>
): IIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    payload: data,
});

export const ingredientsFailedCreator = (
    error: string
): IIngredientsFailedAction => ({
    type: GET_INGREDIENTS_FAILED,
    payload: error,
});
