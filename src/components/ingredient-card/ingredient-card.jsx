import { useDrag } from 'react-dnd';
import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { propIngredientData } from './../../services/prop-types-pattern';
import styles from './ingredient-card.module.css';
import { Link, useLocation } from 'react-router-dom';

function IngredientCard({ ingredient, count }) {
    const location = useLocation();

    const [{ opacity }, ref] = useDrag({
        type: ingredient.type === 'bun' ? 'bun' : 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.3 : 1,
        }),
    });

    return (
        <>
            <Link
                key={ingredient._id}
                to={{
                    pathname: `/ingredients/${ingredient._id}`,
                    state: { background: location },
                }}
                className={styles.noLink}
            >
                <div
                    ref={ref}
                    style={{ opacity }}
                    className={styles.wrapper + ' mb-8'}
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
            </Link>
        </>
    );
}

IngredientCard.propTypes = {
    ingredient: propIngredientData.isRequired,
    count: PropTypes.number,
};

export default IngredientCard;
