import IngredientCard from './../ingredient-card/ingredient-card';
import styles from './ingredients-group.module.css';
import PropTypes from 'prop-types';

function IngredientsGroup({groupName, ingredients}) {

    return (
        <>
            <div className='text text_type_main-medium'>{groupName}</div>
            <div className={`${styles.container} mt-6 mb-10 pl-4 pr-4`}>
                {ingredients.length ? ingredients.map((item) => (
                    <IngredientCard key={item._id} ingredient={item} />
                )) : <p className='text text_type_main-default'>Пусто</p>}
            </div>
        </>
	);
}

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
    groupName: PropTypes.string,
    data: PropTypes.arrayOf(
        ingredientData.isRequired
    ),
}; 

export default IngredientsGroup;
