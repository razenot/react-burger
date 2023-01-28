import { initialState, ingredientsReducer as reducer } from './ingredients';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from '../constants/ingredients';

describe('ingredients reducer', () => {
    const testIngredients = [
        {
            calories: 643,
            carbohydrates: 85,
            fat: 26,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            name: 'Филе Люминесцентного тетраодонтимформа',
            price: 988,
            proteins: 44,
            type: 'main',
            __v: 0,
            _id: '60d3b41abdacab0026a733c8',
        },
        {
            calories: 420,
            carbohydrates: 53,
            fat: 24,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            name: 'Краторная булка N-200i',
            price: 1255,
            proteins: 80,
            type: 'bun',
            __v: 0,
            _id: '60d3b41abdacab0026a733c6',
        },
    ];

    it('Should no action', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('Should action GET_INGREDIENTS_REQUEST', () => {
        expect(
            reducer(initialState, {
                type: GET_INGREDIENTS_REQUEST,
            })
        ).toEqual({
            ...initialState,
            loading: true,
            error: false,
        });
    });

    it('Should action GET_INGREDIENTS_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: GET_INGREDIENTS_SUCCESS,
                payload: testIngredients,
            })
        ).toEqual({
            ...initialState,
            ingredients: testIngredients,
            loading: false,
            error: false,
        });
    });

    it('Should action GET_INGREDIENTS_FAILED', () => {
        expect(
            reducer(
                { ...initialState, loading: true },
                {
                    type: GET_INGREDIENTS_FAILED,
                    payload: 'error message',
                }
            )
        ).toEqual({
            ...initialState,
            loading: false,
            error: 'error message',
        });
    });
});
