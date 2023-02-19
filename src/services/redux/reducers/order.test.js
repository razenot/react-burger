import { initialState, orderReducer as reducer } from './order';
import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    ORDER_RESET,
} from '../constants/order';

describe('order reducer', () => {
    it('Should no action', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('Should action SEND_ORDER_REQUEST', () => {
        expect(
            reducer(initialState, {
                type: SEND_ORDER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            loading: true,
            error: false,
        });
    });

    it('Should action SEND_ORDER_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: SEND_ORDER_SUCCESS,
                payload: 123456,
            })
        ).toEqual({
            ...initialState,
            orderNumber: 123456,
            loading: false,
            error: false,
        });
    });

    it('Should action SEND_ORDER_FAILED', () => {
        expect(
            reducer(
                { ...initialState, loading: true },
                {
                    type: SEND_ORDER_FAILED,
                    payload: 'error message',
                }
            )
        ).toEqual({
            ...initialState,
            loading: false,
            error: 'error message',
        });
    });

    it('Should action ORDER_RESET', () => {
        expect(
            reducer(
                { ...initialState, ingredients: 123456 },
                {
                    type: ORDER_RESET,
                    payload: 'error message',
                }
            )
        ).toEqual({
            ...initialState,
        });
    });
});
