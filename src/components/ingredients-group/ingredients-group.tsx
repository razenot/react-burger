import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import IngredientCard from '../ingredient-card/ingredient-card';
import { TIngredient, TIngredientsGroup } from '../../services/utils/types';
import styles from './ingredients-group.module.css';

export type TConstructorItems = {
    string: number;
};

const IngredientsGroup = forwardRef<HTMLDivElement, TIngredientsGroup>(
    ({ groupType, groupName, ingredients }, ref) => {
        const constructorItems = useSelector(
            // @ts-ignore: Unreachable code error
            (state) => state.constructorReducer
        );

        const countIngredient = useMemo(() => {
            const count: { [name: string]: number } = {};
            if (groupType === 'buns') {
                if (constructorItems.bun) count[constructorItems.bun._id] = 2;
            } else {
                constructorItems.ingredients.forEach((item: TIngredient) => {
                    count[item._id] =
                        item._id in count ? count[item._id] + 1 : 1;
                });
            }
            return count;
        }, [constructorItems]);

        return (
            <>
                <div className='text text_type_main-medium'>{groupName}</div>
                <div
                    className={`${styles.container} mt-6 mb-10 pl-4 pr-4`}
                    ref={ref}
                >
                    {ingredients.length ? (
                        ingredients.map((item: TIngredient) => (
                            <IngredientCard
                                key={item._id}
                                ingredient={item}
                                count={countIngredient[item._id]}
                            />
                        ))
                    ) : (
                        <p className='text text_type_main-default'>Пусто</p>
                    )}
                </div>
            </>
        );
    }
);

export default IngredientsGroup;
