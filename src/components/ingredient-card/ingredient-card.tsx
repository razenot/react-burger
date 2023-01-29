import { FC } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { IIngredientCard, TModalState } from '../../services/utils/types';
import styles from './ingredient-card.module.css';

const IngredientCard: FC<IIngredientCard> = ({ ingredient, count }) => {
    const location = useLocation();

    const [{ opacity }, ref] = useDrag({
        type: ingredient.type === 'bun' ? 'bun' : 'ingredient',
        item: ingredient,
        collect: (monitor: DragSourceMonitor) => ({
            opacity: monitor.isDragging() ? 0.3 : 1,
        }),
    });

    return (
        <>
            <Link<TModalState>
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
                    data-test-id='any_ingredient'
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
                        data-test-id='ingredient_name'
                    >
                        {ingredient.name}
                    </div>
                </div>
            </Link>
        </>
    );
};

export default IngredientCard;
