import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import globalStyles from './../../global.module.css';

function App() {
    const [data, setData] = useState([]);
    const [errorData, setErrorData] = useState(false);
    const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

    useEffect(() => {
        getIngredients();
    }, []);

    const checkReponse = (res) => {
        return res.ok
            ? res.json()
            : res.json().then((err) => Promise.reject(err));
    };

    function getIngredients() {
        fetch(`${BURGER_API_URL}/ingredients`)
            .then(checkReponse)
            .then((resData) => setData(resData.data))
            .catch((e) => {
                setErrorData(true);
                alert(`Ошибка загрузки данных (${e}). Перезагрузите страницу.`);
            });
    }

    return (
        <div>
            <AppHeader />
            <main className={globalStyles.container}>
                <h1 className='mt-10 mb-5 text text_type_main-large'>
                    Соберите бургер
                </h1>
                {data.length > 0 ? (
                    <div className={globalStyles.row}>
                        <section className={globalStyles.column6}>
                            <BurgerIngredients data={data} />
                        </section>
                        <section className={globalStyles.column6}>
                            <BurgerConstructor data={data} />
                        </section>
                    </div>
                ) : (
                    <p className='mt-10 text text_type_main-default'>
                        {errorData ? 'Ошибка загрузки данных.' : 'Пусто.'}
                    </p>
                )}
            </main>
        </div>
    );
}

export default App;
