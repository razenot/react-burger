import IngredientDetails from '../components/ingredient-details/ingredient-details';
import styles from './style.module.css';
export function IngredientsPage() {
    return (
        <div className={styles.ingredientPage}>
            <p className='text text_type_main-large'>Детали ингредиента</p>
            <IngredientDetails />
        </div>
    );
}
