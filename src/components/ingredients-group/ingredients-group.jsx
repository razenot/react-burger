import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { propIngredientData } from './../../services/prop-types-pattern';
import IngredientCard from '../ingredient-card/ingredient-card';
import styles from './ingredients-group.module.css';

const IngredientsGroup = forwardRef(
    ({ groupType, groupName, ingredients }, ref) => {
        const constructorItems = useSelector(
            (state) => state.constructorReducer
        );
        const countIngredient = useMemo(() => {
            const count = {};
            if (groupType === 'buns') {
                if (constructorItems.bun) count[constructorItems.bun._id] = 2;
            } else {
                constructorItems.ingredients.forEach((item) => {
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
                        ingredients.map((item) => (
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

IngredientsGroup.propTypes = {
    groupType: PropTypes.string,
    groupName: PropTypes.string,
    ingredients: PropTypes.arrayOf(propIngredientData.isRequired),
};

export default IngredientsGroup;
