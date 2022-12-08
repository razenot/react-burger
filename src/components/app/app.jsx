import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Switch, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    ForgotPasswordPage,
    ProfilePage,
    IngredientsPage,
    NotFound404,
} from './../../pages';
import globalStyles from './../../global.module.css';

function App() {
    return (
        <div>
            <AppHeader />
            <main className={globalStyles.container}>
                <Switch>
                    <Route path='/' exact={true}>
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
                    </Route>
                    <Route path='/login' exact={true}>
                        <LoginPage />
                    </Route>
                    <Route path='/register' exact={true}>
                        <RegisterPage />
                    </Route>
                    <Route path='/forgot-password' exact={true}>
                        <ForgotPasswordPage />
                    </Route>
                    <Route path='/reset-password' exact={true}>
                        <ResetPasswordPage />
                    </Route>
                    <Route path='/profile' exact={true}>
                        <ProfilePage />
                    </Route>
                    {/* <Route path='/ingredients/:id' exact={true}>
                            <IngredientsPage />
                        </Route> */}
                    <Route>
                        <NotFound404 />
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default App;
