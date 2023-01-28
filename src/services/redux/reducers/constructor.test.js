import { initialState, constructorReducer as reducer } from './constructor';
import {
    CONSTRUCTOR_ADD,
    CONSTRUCTOR_REMOVE,
    CONSTRUCTOR_REBUILD,
    CONSTRUCTOR_RESET,
} from '../constants/constructor';

describe('constructor reducer', () => {
    const ingredient = {
        id: 'qwerty1',
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
    };

    const ingredient2 = {
        id: 'qwerty2',
        calories: 986,
        carbohydrates: 609,
        fat: 689,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        name: 'Хрустящие минеральные кольца',
        price: 300,
        proteins: 808,
        type: 'main',
        __v: 0,
        _id: '60d3b41abdacab0026a733d0',
    };

    const bun = {
        id: 'qwerty3',
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
    };

    it('Should no action', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('Should action (ingredient) CONSTRUCTOR_ADD', () => {
        expect(
            reducer(initialState, {
                type: CONSTRUCTOR_ADD,
                payload: ingredient,
            })
        ).toEqual({
            ...initialState,
            ingredients: [ingredient],
        });
    });

    it('Should action (ingredient2) CONSTRUCTOR_ADD', () => {
        expect(
            reducer(
                { ...initialState, ingredients: [ingredient] },
                {
                    type: CONSTRUCTOR_ADD,
                    payload: ingredient2,
                }
            )
        ).toEqual({
            ...initialState,
            ingredients: [ingredient, ingredient2],
        });
    });

    it('Should action (bun) CONSTRUCTOR_ADD', () => {
        expect(
            reducer(initialState, {
                type: CONSTRUCTOR_ADD,
                payload: bun,
            })
        ).toEqual({
            ...initialState,
            bun: bun,
        });
    });

    it('Should action CONSTRUCTOR_REBUILD', () => {
        expect(
            reducer(
                { ...initialState, ingredients: [ingredient, ingredient2] },
                {
                    type: CONSTRUCTOR_REBUILD,
                    payload: { before: 1, after: 0 },
                }
            )
        ).toEqual({
            ...initialState,
            ingredients: [ingredient2, ingredient],
        });
    });

    it('Should action CONSTRUCTOR_REMOVE', () => {
        expect(
            reducer(
                { ...initialState, ingredients: [ingredient, ingredient2] },
                {
                    type: CONSTRUCTOR_REMOVE,
                    payload: 'qwerty1',
                }
            )
        ).toEqual({
            ...initialState,
            ingredients: [ingredient2],
        });
    });

    it('Should action CONSTRUCTOR_RESET', () => {
        expect(
            reducer(
                { ingredients: [ingredient, ingredient2], bun: bun },
                {
                    type: CONSTRUCTOR_RESET,
                }
            )
        ).toEqual({
            ...initialState,
        });
    });
});
