import { initialState, feedReducer as reducer } from './orders';
import { GET_ORDERS, ADD_ORDERS, CLEAR_ORDERS } from '../constants/orders';

describe('feed reducer', () => {
    const feedTestList = [
        {
            createdAt: '2023-01-28T18:17:48.945Z',
            ingredients: [
                '60d3b41abdacab0026a733c7',
                '60d3b41abdacab0026a733cb',
                '60d3b41abdacab0026a733c9',
                '60d3b41abdacab0026a733c7',
            ],
            name: 'Био-марсианский бессмертный флюоресцентный бургер',
            number: 1,
            status: 'done',
            updatedAt: '2023-01-28T18:17:49.439Z',
            _id: '63d566cc936b17001be54c7c',
        },
        {
            createdAt: '2023-01-28T18:17:48.945Z',
            ingredients: [
                '60d3b41abdacab0026a733c7',
                '60d3b41abdacab0026a733cb',
                '60d3b41abdacab0026a733c9',
                '60d3b41abdacab0026a733c7',
            ],
            name: 'Био-марсианский бессмертный флюоресцентный бургер',
            number: 2,
            status: 'done',
            updatedAt: '2023-01-28T18:17:49.439Z',
            _id: '63d566cc936b17001be54c7d',
        },
    ];

    const feedTestListRevers = [
        {
            createdAt: '2023-01-28T18:17:48.945Z',
            ingredients: [
                '60d3b41abdacab0026a733c7',
                '60d3b41abdacab0026a733cb',
                '60d3b41abdacab0026a733c9',
                '60d3b41abdacab0026a733c7',
            ],
            name: 'Био-марсианский бессмертный флюоресцентный бургер',
            number: 2,
            status: 'done',
            updatedAt: '2023-01-28T18:17:49.439Z',
            _id: '63d566cc936b17001be54c7d',
        },
        {
            createdAt: '2023-01-28T18:17:48.945Z',
            ingredients: [
                '60d3b41abdacab0026a733c7',
                '60d3b41abdacab0026a733cb',
                '60d3b41abdacab0026a733c9',
                '60d3b41abdacab0026a733c7',
            ],
            name: 'Био-марсианский бессмертный флюоресцентный бургер',
            number: 1,
            status: 'done',
            updatedAt: '2023-01-28T18:17:49.439Z',
            _id: '63d566cc936b17001be54c7c',
        },
    ];

    it('Should no action', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('Should action GET_ORDERS', () => {
        expect(
            reducer(initialState, {
                type: GET_ORDERS,
            })
        ).toEqual({
            ...initialState,
            loading: true,
        });
    });

    it('Should action ADD_ORDERS', () => {
        expect(
            reducer(initialState, {
                type: ADD_ORDERS,
                payload: { orders: feedTestList, total: 999, totalToday: 11 },
            })
        ).toEqual({
            ...initialState,
            total: 999,
            todayTotal: 11,
            loading: false,
            orders: feedTestListRevers,
        });
    });

    it('Should action CLEAR_ORDERS', () => {
        expect(
            reducer(
                { ...initialState, orders: feedTestListRevers, total: 999, todayTotal: 11 },
                {
                    type: CLEAR_ORDERS,
                }
            )
        ).toEqual({
            ...initialState,
            orders: [],
            total: 0,
            todayTotal: 0,
            loading: false,
        });
    });
});
