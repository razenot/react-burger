import IngredientCard from '../ingredient-card/ingredient-card';
import styles from './ingredients-group.module.css';
import PropTypes from 'prop-types';
import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';

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

const ingredientData = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
});

IngredientsGroup.propTypes = {
    groupType: PropTypes.string,
    groupName: PropTypes.string,
    data: PropTypes.arrayOf(ingredientData.isRequired),
};

export default IngredientsGroup;
