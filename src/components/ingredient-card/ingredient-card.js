import { useState } from 'react';
import IngredientDetails from './../ingredient-details/ingredient-details';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';

function IngredientCard({ingredient}) {

    const [visibleIngredintDetail, setVisibleIngredintDetail] = useState(false);

    const handleCloseIngredintDetail = () => {
        setVisibleIngredintDetail(false);
    }

    const handleOpenIngredintDetail = () => {
        setVisibleIngredintDetail(true);
    }


    return (
        <>
        <div className={styles.wrapper + ' mb-8'} onClick={handleOpenIngredintDetail} >
            <div className='pl-4 pr-4'>
                {ingredient.count > 0 && <Counter count={ingredient.count} size="default" />}
                <img src={ingredient.image} alt={ingredient.name} />
            </div>
            <div className={styles.price}>
                <span className='text text_type_digits-default mt-1 pr-1'>
                    {ingredient.price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.name + ' text text_type_main-default mt-1'}>{ingredient.name}</div>
        </div>
        {visibleIngredintDetail && <IngredientDetails handleClose={handleCloseIngredintDetail} data={ingredient} />}
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

IngredientCard.propTypes = {
    ingredient: ingredientData.isRequired
}; 

export default IngredientCard;
