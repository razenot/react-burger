import * as H from 'history';
import { ReactNode } from 'react';

export type TModalState = {
    background: H.Location;
    from?: {
        pathname: string;
    };
};

export type TIngredient = {
    readonly calories: number;
    readonly carbohydrates: number;
    readonly fat: number;
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    readonly name: string;
    readonly price: number;
    readonly proteins: number;
    readonly type: string;
    readonly __v: number;
    readonly _id: string;
    readonly id?: number;
};

export type TIngredientsGroup = {
    readonly groupType: string;
    readonly groupName: string;
    readonly ingredients: Array<TIngredient>;
};

export type TConstructorIngredient = {
    index: number;
    readonly ingredient: TIngredient;
};

export type IIngredientCard = {
    readonly count: number;
    readonly ingredient: TIngredient;
};

export type TModal = {
    readonly handleClose: () => void;
    readonly title?: string;
    readonly children: ReactNode;
};

export type TOrderDetails = {
    readonly handleClose: () => void;
    readonly orderId: number;
};
