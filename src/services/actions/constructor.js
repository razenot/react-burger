import { v4 as uuidv4 } from 'uuid';

export const CONSTRUCTOR_ADD = 'CONSTRUCTOR_ADD';
export const CONSTRUCTOR_REMOVE = 'CONSTRUCTOR_REMOVE';
export const CONSTRUCTOR_REORDER = 'CONSTRUCTOR_REORDER';
export const CONSTRUCTOR_RESET = 'CONSTRUCTOR_RESET';

export const constructorAdd = (ingredient) => {
    return {
        type: CONSTRUCTOR_ADD,
        payload: {
            ...ingredient,
            id: uuidv4(),
        },
    };
};
