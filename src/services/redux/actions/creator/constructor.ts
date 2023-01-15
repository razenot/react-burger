import { TIngredient } from '../../../utils/types';
import {
    CONSTRUCTOR_ADD,
    CONSTRUCTOR_REMOVE,
    CONSTRUCTOR_REBUILD,
    CONSTRUCTOR_RESET,
} from '../../constants/constructor';

interface IConstructorAddAction {
    readonly type: typeof CONSTRUCTOR_ADD;
    readonly payload: TIngredient;
}

interface IConstructorRemoveAction {
    readonly type: typeof CONSTRUCTOR_REMOVE;
    readonly payload: number;
}

interface IConstructorRebuildAction {
    readonly type: typeof CONSTRUCTOR_REBUILD;
    readonly payload: { after: number; before: number };
}

interface IConstructorResetAction {
    readonly type: typeof CONSTRUCTOR_RESET;
}

export type TConstructorActions =
    | IConstructorAddAction
    | IConstructorRemoveAction
    | IConstructorRebuildAction
    | IConstructorResetAction;

export const constructorAddCreator = (
    data: TIngredient
): IConstructorAddAction => ({
    type: CONSTRUCTOR_ADD,
    payload: data,
});

export const constructorRemoveCreator = (
    id: number
): IConstructorRemoveAction => ({
    type: CONSTRUCTOR_REMOVE,
    payload: id,
});

export const constructorRebuildCreator = (
    id: number,
    index: number
): IConstructorRebuildAction => ({
    type: CONSTRUCTOR_REBUILD,
    payload: {
        after: id,
        before: index,
    },
});

export const constructorResetCreator = (): IConstructorResetAction => ({
    type: CONSTRUCTOR_RESET,
});
