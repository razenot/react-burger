import IngredientCard from './../ingredient-card/ingredient-card';
import styles from './ingredients-group.module.css';

function IngredientsGroup({groupName, ingredients}) {

    return (
        <>
            <div className='text text_type_main-medium'>{groupName}</div>
            <div className={`${styles.container} mt-6 mb-10 pl-4 pr-4`}>
                {ingredients.length ? ingredients.map((item, index) => (
                    <IngredientCard key={index} ingredient={item} />
                )) : <p className='text text_type_main-default'>Пусто</p>}
            </div>
        </>
	);
}

export default IngredientsGroup;
