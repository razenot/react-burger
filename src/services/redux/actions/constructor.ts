import { v4 as uuidv4 } from 'uuid-ts';
import { TIngredient } from '../../utils/types';
import { constructorAddCreator } from './creator/constructor';

export const constructorAdd = (ingredient: TIngredient) => {
    let data = {
        ...ingredient,
        id: uuidv4(),
    };
    return constructorAddCreator(data);
};
