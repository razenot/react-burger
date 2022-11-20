import { useState, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import globalStyles from './../../global.module.css';

function App() {
    return (
        <div>
            <AppHeader />
            <main className={globalStyles.container}>
                <h1 className='mt-10 mb-5 text text_type_main-large'>
                    Соберите бургер
                </h1>
                <DndProvider backend={HTML5Backend}>
                    <div className={globalStyles.row}>
                        <section className={globalStyles.column6}>
                            <BurgerIngredients />
                        </section>
                        <section className={globalStyles.column6}>
                            <BurgerConstructor />
                        </section>
                    </div>
                </DndProvider>
            </main>
        </div>
    );
}

export default App;
