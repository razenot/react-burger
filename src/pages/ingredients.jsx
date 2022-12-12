import IngredientDetails from '../components/ingredient-details/ingredient-details';
import styles from './style.module.css';
export function IngredientsPage() {
    return (
        <div className={styles.ingredientPage}>
            <IngredientDetails />
        </div>
    );
}
