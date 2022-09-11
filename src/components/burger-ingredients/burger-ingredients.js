import { useState, useEffect, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './../ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

function BurgerIngredients({data}) {

	const [current, setCurrent] = useState('bun');
	const [ingredients, setIngredients] = useState({
		buns: [],
		sauces: [],
		mains: []
	});
	const bunsRef = useRef();
	const saucesRef = useRef();
	const mainsRef = useRef();

	
	useEffect(() => {
		getStructIngredients();
	},[]);

	function getStructIngredients(){
		let result = {
			buns: [],
			sauces: [],
			mains: []
		};

		data.forEach(item => {
			item.count = Math.floor(Math.random() * 3); // temp for visual
			if(item.type === 'bun') result.buns.push(item);
			if(item.type === 'sauce') result.sauces.push(item);
			if(item.type === 'main') result.mains.push(item);
		});

		setIngredients(result);
	}

	return (
		<div className='mr-5'>
			<div style={{ display: 'flex' }}>
				<Tab value="bun" active={current === "bun"} onClick={(val) => setCurrent(val)}>
					Булки
				</Tab>
				<Tab value="sauce" active={current === "sauce"} onClick={(val) => setCurrent(val)}>
					Соусы
				</Tab>
				<Tab value="main" active={current === "main"} onClick={(val) => setCurrent(val)}>
					Начинки
				</Tab>
			</div>

			{ingredients.buns.length && ingredients.sauces.length && ingredients.mains.length ?
				<ul className={`${styles.groupList} custom-scroll mt-10`}> 
					<li className={styles.ingredientsGroup} ref={bunsRef}> 
						<IngredientsGroup  groupName="Булки" ingredients={ingredients.buns}/> 
					</li> 
					<li className={styles.ingredientsGroup} ref={saucesRef}> 
						<IngredientsGroup groupName="Соусы" ingredients={ingredients.sauces}/> 
					</li> 
					<li className={styles.ingredientsGroup} ref={mainsRef}> 
						<IngredientsGroup groupName="Начинка" ingredients={ingredients.mains}/> 
					</li> 
				</ul>
			:
				<p className='mt-10 text text_type_main-default'>Загрузка...</p>
			}
		</div>
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

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(
    ingredientData.isRequired
    ),
}; 

export default BurgerIngredients;
