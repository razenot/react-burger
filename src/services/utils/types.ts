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
    readonly id?: number | any;
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

export type TLoginForm = {
    email: string;
    password: string;
};

export type TUserFullForm = TLoginForm & {
    name: string;
};

export type TUserData = {
    email: string;
    name: string;
};

export type TLoginSuccess = {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    user: TUserData;
};

export type TUserRequest = {
    success: boolean;
    user: TUserData;
};

export type TForRebuildConstructor = {
    after: number;
    before: number;
};

export type TOwner = {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
};

export type TServerOrders = {
    orders: Array<TFeedOrder>;
    total: number;
    totalToday: number;
    status?: boolean;
};

export type TFeedOrder = {
    number: number;
    _id?: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    status: string;
    ingredients: ReadonlyArray<string>;
};

export type TOrderFormat = {
    id: string;
    image_mobile: string;
    name: string;
    price: number;
};
