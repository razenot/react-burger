import { getIngredients as fetchIngredients } from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredients = () => (dispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST,
    });
    return fetchIngredients()
        .then((ingredients) => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                payload: ingredients.data,
            });
        })
        .catch((e) => {
            dispatch({
                type: GET_INGREDIENTS_FAILED,
                payload: e,
            });
        });
};
