import { getIngredients as fetchIngredients } from '../../utils/burger-api';
import { AppDispatch } from '../store';
import {
    ingredientsFailedCreator,
    ingredientsRequestCreator,
    ingredientsSuccessCreator,
} from './creator/ingredients';

export const getIngredients = () => (dispatch: AppDispatch) => {
    dispatch(ingredientsRequestCreator());
    return fetchIngredients()
        .then((ingredients) => {
            dispatch(ingredientsSuccessCreator(ingredients.data));
        })
        .catch((e) => {
            dispatch(ingredientsFailedCreator(e.message));
        });
};
