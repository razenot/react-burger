import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { propIngredientData } from './../../services/prop-types-pattern';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {
    DETAIL_INGREDIENT_ADD,
    DETAIL_INGREDIENT_RESET,
} from './../../services/redux/ingredient-detail/action';
import styles from './ingredient-card.module.css';

function IngredientCard({ ingredient, count }) {
    const [visibleIngredintDetail, setVisibleIngredintDetail] = useState(false);

    const dispatch = useDispatch();

    const handleCloseIngredintDetail = () => {
        dispatch({
            type: DETAIL_INGREDIENT_RESET,
        });
        setVisibleIngredintDetail(false);
    };

    const handleOpenIngredintDetail = () => {
        dispatch({
            type: DETAIL_INGREDIENT_ADD,
            payload: ingredient,
        });
        setVisibleIngredintDetail(true);
    };

    const [{ opacity }, ref] = useDrag({
        type: ingredient.type === 'bun' ? 'bun' : 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.3 : 1,
        }),
    });

    return (
        <>
            <div
                ref={ref}
                style={{ opacity }}
                className={styles.wrapper + ' mb-8'}
                onClick={handleOpenIngredintDetail}
            >
                <div className='pl-4 pr-4'>
                    {count > 0 && <Counter count={count} size='default' />}
                    <img src={ingredient.image} alt={ingredient.name} />
                </div>
                <div className={styles.price}>
                    <span className='text text_type_digits-default mt-1 pr-1'>
                        {ingredient.price}
                    </span>
                    <CurrencyIcon type='primary' />
                </div>
                <div
                    className={`${styles.name} text text_type_main-default mt-1`}
                >
                    {ingredient.name}
                </div>
            </div>
            {visibleIngredintDetail && (
                <IngredientDetails handleClose={handleCloseIngredintDetail} />
            )}
        </>
    );
}

IngredientCard.propTypes = {
    ingredient: propIngredientData.isRequired,
    count: PropTypes.number,
};

export default IngredientCard;
