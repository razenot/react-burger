import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient-card.module.css';

function IngredientCard({ingredient}) {

    return (
        <div className={styles.wrapper + ' mb-8'}>
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
	);
}

export default IngredientCard;
