import { initialState, wsReducer as reducer } from './ws';
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED } from '../constants/ws';

describe('ws reducer', () => {
    it('Should no action', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('Should action WS_CONNECTION_SUCCESS', () => {
        expect(
            reducer(initialState, {
                type: WS_CONNECTION_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            error: false,
            wsConnected: true,
        });
    });

    it('Should action WS_CONNECTION_ERROR', () => {
        expect(
            reducer(initialState, {
                type: WS_CONNECTION_ERROR,
                payload: 'error message',
            })
        ).toEqual({
            ...initialState,
            error: 'error message',
            wsConnected: false,
        });
    });

    it('Should action WS_CONNECTION_CLOSED', () => {
        expect(
            reducer(
                { error: 'error message', wsConnected: false },
                {
                    type: WS_CONNECTION_CLOSED,
                }
            )
        ).toEqual({
            ...initialState,
        });
    });
});
